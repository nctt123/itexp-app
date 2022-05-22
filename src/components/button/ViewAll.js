import React from 'react';
import colors from '@assets/colors';
import { Text, Button } from '@components/index';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ViewAll = props => {
  const { onPress, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Button
      middle
      center
      bg={colors.black}
      mr={16}
      p={7}
      onPress={onPress}
      {...rest}>
      <Text c1 medium color={colors.textGrayDark}>
        {t('viewAll')}
      </Text>
    </Button>
  );
};
ViewAll.propTypes = {
  onPress: PropTypes.func.isRequired,
};
ViewAll.defaultProps = {
  onPress: () => {},
};
export default React.memo(ViewAll);
