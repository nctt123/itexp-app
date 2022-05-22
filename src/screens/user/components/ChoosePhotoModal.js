import React from 'react';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import SvgComponent from '@assets/svg';
import PropTypes from 'prop-types';
import { Block, Touchable, Text, Icon } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale, moderateScale } from '@common/scale';

export default ChoosePhotoModal = React.memo(
  ({ visible, onClose, onChosenPhotoFromLibrary, onRemoveCurrentPhoto }) => {
    const { t } = useTranslation();
    return (
      <Modal
        style={styles.modal}
        visible={visible}
        backdropOpacity={0.6}
        onBackdropPress={onClose}>
        <Block style={styles.container}>
          <Touchable
            middle
            center
            bg={colors.gray}
            pv={8}
            borderBottom
            onPress={() => {
              onRemoveCurrentPhoto(), onClose();
            }}>
            <Text ml={16} color={colors.white}>
              {t('removeCurrentPhoto')}
            </Text>
          </Touchable>
          <Touchable
            middle
            center
            bg={colors.gray}
            pv={8}
            onPress={() => {
              onChosenPhotoFromLibrary(onClose);
            }}>
            <Text ml={16} color={colors.white}>
              {t('choosePhoto')}
            </Text>
          </Touchable>
          <Touchable
            middle
            center
            bg={colors.gray}
            pv={8}
            mt={16}
            onPress={onClose}>
            <Text ml={16} color={colors.white}>
              {t('cancel')}
            </Text>
          </Touchable>
        </Block>
      </Modal>
    );
  },
);
ChoosePhotoModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ChoosePhotoModal.defaultProps = {
  visible: false,
  onClose: () => {},
};
const styles = {
  modal: {
    backgroundColor: colors.blackModal,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.blackPrimary,
    borderTopRightRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(16),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(32),
  },
};
