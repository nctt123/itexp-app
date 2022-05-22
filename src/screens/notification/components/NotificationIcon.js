import React, { memo } from 'react';
import { Block, Text } from '@components/index';
import colors from '@assets/colors';
import { useSelector } from 'react-redux';
import { totalUnReadNotificationSelector } from '@modules/notification/selectors';

const NotificationIcon = ({ children }) => {
  const total = useSelector(totalUnReadNotificationSelector);
  return (
    <Block>
      {total > 0 && (
        <Block
          circle={18}
          center
          middle
          bg={colors.white}
          absolute
          zIndex={10}
          top={-10}
          right={-5}>
          <Text color='red'>{total}</Text>
        </Block>
      )}
      {children}
    </Block>
  );
};

export default memo(NotificationIcon);
