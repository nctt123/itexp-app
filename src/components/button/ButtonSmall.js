import React from 'react';
import colors from '@assets/colors';
import { Text, Button, Icon } from '@components/index';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SvgComponent from '@assets/svg';
const ButtonSmall = props => {
  const { onPress, icon, bg, title, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Button
      onPress={onPress}
      width={70}
      height={22}
      row
      center
      middle
      bg={bg}
      borderRadius={4}
      {...rest}>
      {!!icon && <Icon xml={SvgComponent.trophySmall} />}
      <Text c2 medium color={colors.white} ml={4}>
        {t(title)}
      </Text>
    </Button>
  );
};
ButtonSmall.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  bg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
ButtonSmall.defaultProps = {
  onPress: () => {},
  icon: '',
  bg: colors.gray,
  title: '',
};
export default React.memo(ButtonSmall);
