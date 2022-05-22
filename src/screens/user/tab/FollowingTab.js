import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Body, Block, Text, Icon, Button } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import Search from '@components/search';
import SvgComponent from '@assets/svg';
import SmallButton from '@components/button/ButtonSmall';
import FriendItem from '../item/FriendItem';

const list = [
  { name: 'will_I' },
  { name: 'lunaokko' },
  { name: 'leoloofficamn' },
  { name: 'leoloofficamn' },
  { name: 'lunaokko' },
  { name: 'will_I' },
];
export default function Following() {
  const [listFollowingSearch, setListFollowingSearch] = useState(list);
  const _onChangeText = value => {
    const newList = list.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()),
    );
    setListFollowingSearch(newList);
  };
  return (
    <Block pt={16}>
      <Search onChangeText={_onChangeText} placeholder='search' />

      <FlatList
        data={listFollowingSearch}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FriendItem
            item={item}
            rightAction={
              <SmallButton
                bg={colors.yellow}
                title='following'
                icon={SvgComponent.trophySmall}
              />
            }
          />
        )}
      />
    </Block>
  );
}
