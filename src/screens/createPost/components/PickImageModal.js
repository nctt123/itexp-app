import colors from '@assets/colors';

import { Block, Text, Button, Body } from '@components/index';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { preUploadFile } from '@modules/uploadFile/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@common/customHook';
import RNFetchBlob from 'rn-fetch-blob';
import { tokenSelector } from '@modules/auth/selectors';

const PickImageModal = ({ isVisible, onClose, setImage, setLoading }) => {
  const { t } = useTranslation('room');
  const [modal, contextHolder] = useModal();
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);
  const showImage = () => {
    launchImageLibrary(null, resImage => {
      if (resImage?.uri) {
        setLoading(true);
        dispatch(
          preUploadFile({
            data: {
              type: 'COVER',
              name: resImage.fileName,
            },
            onSuccess: responseS3 => {
              RNFetchBlob.fetch(
                'PUT',
                responseS3.data.url,
                {
                  'Content-Type': 'octet-stream',
                },
                RNFetchBlob.wrap(resImage.uri.replace('file://', '')),
              )
                .then(() => {
                  const s3Url = responseS3.data.url.split('?');
                  setImage(s3Url[0]);
                  setLoading(false);
                  onClose();
                })
                .catch(err => {
                  console.log(err);
                  setLoading(false);
                });
            },
            onError: error => {
              setLoading(false);
              modal.error({
                title: t('title_error'),
                content: error.errorMessage,
              });
            },
          }),
        );
      }
      console.log('cancel picker image');
    });
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.6}>
      <Block bg={colors.blackPrimary} ph={16}>
        <Button
          height={40}
          mv={18}
          gradient
          borderRadius={3}
          bg={colors.orange}
          onPress={showImage}>
          <Text medium c1 color={colors.white}>
            {t('txt_add_image')}
          </Text>
        </Button>
      </Block>
      {contextHolder}
    </Modal>
  );
};
PickImageModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});

export default PickImageModal;
