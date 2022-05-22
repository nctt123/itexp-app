import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Block, Button, Text } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '@common/scale';
import Icon from '@components/commons/Icon';
import SvgComponent from '@assets/svg';

export default ResultModal = React.memo(
  ({ visible, onClose, type, message }) => {
    const { t } = useTranslation();
    return (
      <Modal
        style={styles.modal}
        visible={visible}
        backdropOpacity={0.6}
        onBackdropPress={onClose}>
        <Block style={styles.container}>
          <Icon xml={SvgComponent.success} />
          <Text mt={16} h2 bold textAlignCenter>
            {type === 'success' ? t('congratulation') : t('tryAgain')}
          </Text>
          <Text mt={16} h5 medium textAlignCenter>
            {message}
          </Text>

          <Button
            mv={16}
            onPress={onClose}
            bg={colors.gray}
            height={32}
            width={128}
            borderRadius={3}
            mr={8}>
            <Text medium>{t('close')}</Text>
          </Button>
        </Block>
      </Modal>
    );
  },
);

ResultModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

ResultModal.defaultProps = {
  visible: false,
  onClose: () => {},
  type: 'success',
  message: '',
};
const styles = {
  modal: {
    backgroundColor: colors.blackModal,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackPrimary,
    borderRadius: moderateScale(16),
    paddingTop: verticalScale(16),
  },
  textInputSearch: {
    color: colors.white,
    fontSize: moderateScale(16),
    flex: 1,
  },
};
