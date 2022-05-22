/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from 'react';
import { Block, Text } from '@components/index';

const Follwing = ({ item }) => (
  <Block flex={1} row>
    <Text flex={1} medium c1>
      <Text extraBold>{item?.body} </Text>
    </Text>

  </Block>
);
export default memo(Follwing);
