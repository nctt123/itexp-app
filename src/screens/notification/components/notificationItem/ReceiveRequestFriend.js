/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from 'react';
import { Block, Text, Button } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { acceptRequestFriend, cancelRequestFriend } from '@modules/user/slice';
import { useModal } from '@common/customHook';
import { readNotification } from '@modules/notification/slice';

const ReceiveRequestFriend = ({ item }) => {
  const { t } = useTranslation(['notification', 'common']);
  const [modal, contextHolder] = useModal();
  const dispatch = useDispatch();

  const onAcceptRequestFriend = () => {
    dispatch(
      readNotification({
        data: {
          notificationId: item.id,
        },
      }),
    );
    dispatch(
      acceptRequestFriend({
        data: {
          requestId: JSON.parse(item.metadata).requestId,
          notificationId: item.id,
        },
        onError: e => {
          modal.error({
            title: t('common:title_error'),
            content: e.errorMessage,
          });
        },
      }),
    );
  };

  const onCancelRequestFriend = () => {
    dispatch(
      cancelRequestFriend({
        data: {
          requestId: JSON.parse(item.metadata).requestId,
          notificationId: item.id,
        },
        onError: e => {
          modal.error({
            title: t('common:title_error'),
            content: e.errorMessage,
          });
        },
      }),
    );
  };

  return (
    <Block>
      <Text flex={1} medium c1>
        <Text extraBold> {item.body} </Text>
        <Text>{t('recieve_add_friend')}</Text>
      </Text>
      <Block row mt={15}>
        <Button
          width={70}
          height={20}
          bg={colors.yellow}
          borderRadius={3}
          onPress={onAcceptRequestFriend}>
          <Text c1 medium color={colors.white}>
            Accept
          </Text>
        </Button>
        <Button
          width={70}
          height={20}
          bg={colors.gray}
          ml={14}
          borderRadius={3}
          onPress={onCancelRequestFriend}>
          <Text c1 medium color={colors.white}>
            Decline
          </Text>
        </Button>
      </Block>
      {contextHolder}
    </Block>
  );
};

export default memo(ReceiveRequestFriend);
