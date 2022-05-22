import React from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '@components/index';
import { useTranslation } from 'react-i18next';
import UserItemHorizontal from './UserItemHorizontal';

export default function UserListHorizontal({ list, iconType }) {
  const { t } = useTranslation(['common', 'translation']);

  const _renderUserItemHorizontal = ({ item, index }) => (
    <UserItemHorizontal item={item} index={index} iconType={iconType} />
  );

  return (
    <Block>
      <FlatList
        style={{ flexGrow: 0 }}
        data={list}
        horizontal
        renderItem={_renderUserItemHorizontal}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text c1 center middle>
            {t('common:noData')}
          </Text>
        }
      />
    </Block>
  );
}
