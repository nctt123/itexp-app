import React, { useEffect, memo } from 'react';
import { Block, Text, Button, TextInput } from '@components/index';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import colors from '@assets/colors';
import SvgComponent from '@assets/svg';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  if (!values.playlistName.trim()) {
    errors.playlistName = i18next.t('message:MSG_2', {
      field: i18next.t('common:playlistName'),
    });
  }
  return errors;
};

const CreatePlaylistModal = ({ onCloseModal, visible }) => {
  const { t } = useTranslation(['playlist']);

  useEffect(() => () => formik.resetForm(), [onCloseModal]);

  const formik = useFormik({
    initialValues: { playlistName: '' },
    validate,
  });

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  const onHandleCreatePlaylist = () => {
    if (formik.values.playlistName.trim()) {
      onCloseModal();
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      backdropOpacity={0.6}
      animationIn='fadeIn'
      animationOut='fadeOut'
      style={styles.modal}>
      <Block
        pv={22}
        ph={21}
        width='100%'
        bg={colors.blackPrimary}
        borderRadius={20}>
        <Block>
          <Block center middle>
            <Text bold h4 center>
              {t('txt_title_create_playlist')}
            </Text>
          </Block>

          <TextInput
            iconLeft={SvgComponent.playlist2}
            mt={18}
            height={40}
            placeholder={t('placeholder_playlist_name')}
            onBlur={e => handleTrimWhenBlurInput('playlistName', e)}
            value={formik.values.playlistName}
            onChangeText={formik.handleChange('playlistName')}
            error={formik.errors.playlistName && formik.touched.playlistName}
            errorMessage={formik.errors.playlistName}
            maxLength={100}
          />

          <Block row center middle mt={24}>
            <Button
              mh={8}
              pv={7}
              ph={48}
              bg={colors.gray}
              borderRadius={3}
              onPress={onCloseModal}>
              <Text medium c1>
                {t('common:txt_btn_cancel')}
              </Text>
            </Button>
            <Button
              mh={8}
              pv={7}
              ph={48}
              gradient
              borderRadius={3}
              onPress={onHandleCreatePlaylist}
              disabled={!formik.values.playlistName.trim()}>
              <Text medium c1>
                {t('common:txt_btn_create')}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePlaylistModal;
