import React from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Block, Button, Text } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '@common/scale';

export default RemoveModal = React.memo(({ visible, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      style={styles.modal}
      visible={visible}
      backdropOpacity={0.6}
      onBackdropPress={onClose}>
      <Block style={styles.container}>
        <Text bold h5>
          {t('removeFollowers')}
        </Text>
        <Text mt={16} medium maxWidth={250} textAlignCenter>
          {t('doYouWantToRemove')}
        </Text>

        <Block row mv={16} middle>
          <Button
            onPress={onClose}
            bg={colors.gray}
            height={32}
            width={128}
            borderRadius={3}
            mr={8}>
            <Text medium>{t('close')}</Text>
          </Button>
          <Button gradient height={32} width={128} borderRadius={3} ml={8}>
            <Text>{t('confirm')}</Text>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
});

RemoveModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

RemoveModal.defaultProps = {
  visible: false,
  onClose: () => {},
};
const styles = {
  modal: {
    backgroundColor: colors.blackModal,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blackPrimary,
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  textInputSearch: {
    color: colors.white,
    fontSize: moderateScale(16),
    flex: 1,
  },
};
