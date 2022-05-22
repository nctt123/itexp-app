import React from 'react';
import { Image, Text, Touchable } from '@components/index';
import images from '@assets/images';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import * as screenTypes from '@navigation/screenTypes';

function FriendItem({ item, rightAction }) {
  const { navigate } = useNavigation();

  const goProfileOther = () => {
    navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.ProfileOther,
      params: { userId: item?.id },
    });
  };

  return (
    <Touchable row mt={16} middle onPress={goProfileOther}>
      {item?.avatar ? (
        <Image circle={44} source={{ uri: item?.avatar }} />
      ) : (
        <Image circle={44} source={images.default_avatar} />
      )}
      <Text flex={1} ml={16} c1 extraBold>
        {item.name}
      </Text>
      {rightAction && rightAction}
    </Touchable>
  );
}
FriendItem.propTypes = {
  item: PropTypes.object.isRequired,
  rightAction: PropTypes.node,
};
FriendItem.defaultProps = {
  rightAction: null,
};
export default React.memo(FriendItem);
