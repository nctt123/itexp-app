import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Body, Block, Text, Icon, Button } from '@components/index';
import colors from '@assets/colors';
import { useTranslation } from 'react-i18next';
import Search from '@components/search';
import SvgComponent from '@assets/svg';
import SmallButton from '@components/button/ButtonSmall';
import FriendItem from '../item/FriendItem';
import RemoveModal from '../components/RemoveModal';

const list = [
  { name: 'will_I' },
  { name: 'lunaokko' },
  { name: 'leoloofficamn' },
  { name: 'leoloofficamn' },
  { name: 'lunaokko' },
  { name: 'will_I' },
];
export default function Followers() {
  const [listFollowerSearch, setListFollowerSearch] = useState(list);

  const [isShowModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { t } = useTranslation();

  const showModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const selectItem = item => {
    setSelectedItem(item);
    showModal();
  };

  const _onChangeText = value => {
    const newList = list.filter(item =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()),
    );
    setListFollowerSearch(newList);
  };

  return (
    <Block pt={16}>
      <Search placeholder='search' onChangeText={_onChangeText} />
      <FlatList
        data={listFollowerSearch}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FriendItem
            item={item}
            rightAction={
              <Block row>
                <SmallButton
                  bg={colors.yellow}
                  title='following'
                  icon={SvgComponent.trophySmall}
                />
                <SmallButton
                  bg={colors.gray}
                  title='remove'
                  ml={16}
                  onPress={() => selectItem(item)}
                />
              </Block>
            }
          />
        )}
      />
      <RemoveModal
        visible={isShowModal}
        onClose={closeModal}
        item={selectedItem}
      />
    </Block>
  );
}
