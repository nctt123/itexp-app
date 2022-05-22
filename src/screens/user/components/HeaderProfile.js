import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { Block, Touchable, Text, Icon, Button } from '@components/index';
import { useTranslation } from 'react-i18next';
import colors from '@assets/colors';

const HeaderProfile = ({ title, rightButton, onPressRight, disabledRight }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goBackScreen = () => {
    navigation.goBack();
  };

  return (
    <Block row height={30} mv={8} middle>
      <Touchable onPress={goBackScreen}>
        <Text c1 medium color={colors.orange}>
          {t('cancel')}
        </Text>
      </Touchable>
      <Block flex={1} middle center>
        <Text h5 bold>
          {t(title)}
        </Text>
      </Block>
      {rightButton && (
        <Button
          gradient
          ph={16}
          pv={4}
          borderRadius={3}
          onPress={onPressRight}
          disabled={disabledRight}>
          <Text>{t('done')}</Text>
        </Button>
      )}
    </Block>
  );
};

HeaderProfile.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.bool.isRequired,
  onPressRight: PropTypes.func.isRequired,
  disabledRight: PropTypes.bool,
};
HeaderProfile.defaultProps = {
  title: '',
  rightButton: true,
  onPressRight: () => {},
  disabledRight: false,
};
export default React.memo(HeaderProfile);
