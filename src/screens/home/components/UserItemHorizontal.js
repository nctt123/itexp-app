import React from 'react';
import images from '@assets/images';
import SvgComponent from '@assets/svg';
import colors from '@assets/colors';
import { Block, Text, Image, Icon, Touchable } from '@components/index';
import PropTypes from 'prop-types';

import { MAP_SCREEN_TYPE_TO_ICON } from '@common/constant';

const UserItemHorizontal = ({ item, index, iconType }) => (
  <Touchable middle mr={16}>
    {index === 0 ? (
      <Icon xml={SvgComponent.vuongMieng} />
    ) : (
      <Block height={16} />
    )}
    <Image
      uri={item?.avatar}
      defaultImage={images.default_avatar}
      circle={60}
      mt={2}
    />
    <Text c1 medium mv={4} color={colors.textGrayLight}>
      {item?.name}
    </Text>
    <Block row>
      <Icon xml={MAP_SCREEN_TYPE_TO_ICON[iconType]} />
      <Text c2 medium ml={4} color={colors.textSecondary}>
        {item?.total || 0}
      </Text>
    </Block>
  </Touchable>
);
UserItemHorizontal.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  iconType: PropTypes.string.isRequired,
};
UserItemHorizontal.defaultProps = {
  item: [],
  index: 0,
  iconType: '',
};

export default UserItemHorizontal;
