/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from 'react';
import { Text } from '@components/index';

const InvitedRoom = ({ item }) => (
  <Text flex={1} medium c1>
    <Text extraBold> {item.sender.name} </Text>
    <Text>invited you to join </Text>
    <Text extraBold>{JSON.parse(item.metadata).roomName}</Text>
  </Text>
);

export default memo(InvitedRoom);
