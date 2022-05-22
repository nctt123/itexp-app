import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Block, Button, Text } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '@common/scale';
import { disconnectSocket } from '@utils/SocketHelper';

export default LogoutModal = React.memo(({ visible, onClose, onLogout }) => {
  const { t } = useTranslation();
  return (
    <Modal
      style={styles.modal}
      visible={visible}
      backdropOpacity={0.6}
      onBackdropPress={onClose}>
      <Block style={styles.container}>
        <Text bold h2>
          {t('logoutAccount')}
        </Text>
        <Text mt={16} medium textAlignCenter>
          {t('youWantToLogout')}
        </Text>

        <Button
          onPress={onLogout}
          gradient
          height={32}
          width={128}
          mv={24}
          borderRadius={3}
          ml={8}>
          <Text>{t('confirm')}</Text>
        </Button>
      </Block>
    </Modal>
  );
});

LogoutModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

LogoutModal.defaultProps = {
  visible: false,
  onClose: () => {},
  onLogout: () => {},
};
const styles = {
  modal: {
    backgroundColor: colors.blackModal,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackPrimary,
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(24),
  },
  textInputSearch: {
    color: colors.white,
    fontSize: moderateScale(16),
    flex: 1,
  },
};
