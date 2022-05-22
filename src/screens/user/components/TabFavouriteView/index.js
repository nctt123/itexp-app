/* eslint-disable import/order */
/* eslint-disable no-undef */
import React, { memo, useCallback, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import colors from '@assets/colors';
import { Block, Loading, Text, Search, Icon } from '@components/index';
import keyExtractor from '@utils/keyExtractor';
import { useTranslation } from 'react-i18next';
import SvgComponent from '@assets/svg';
import SongItemUser from '../SongItemUser';

export default TabFavourite = memo(
  ({
    loading,
    data,
    onLoadMore,
    loadingLoadMore,
    searchText,
    setSearchText,
    refresh,
    onRefresh,
    total,
  }) => {
    const { t } = useTranslation(['common, home']);
    const [showSearch, setShowSearch] = useState(false);
    const renderItem = useCallback(
      ({ item }) => <SongItemUser item={item} />,
      [],
    );

    const renderLoadMore = () =>
      loadingLoadMore ? (
        <Block center mv={10}>
          <Loading color={colors.white} />
        </Block>
      ) : null;

    const renderEmpty = () => (
      <Block center middle mt={16}>
        <Text color={colors.white} size={18}>
          {t('common:noData')}
        </Text>
      </Block>
    );

    if (loading) {
      return (
        <Block middle center mt={64}>
          <ActivityIndicator color={colors.white} />
        </Block>
      );
    }

    const onShowSearch = () => {
      setShowSearch(true);
    };

    return (
      <>
        {!showSearch ? (
          <Block row middle justifyBetween mt={8} mb={8}>
            <Text size={14} color={colors.white} medium>
              {t('home:songs', { numberSongs: total })}
            </Text>
            <Icon touchable onPress={onShowSearch} xml={SvgComponent.search} />
          </Block>
        ) : (
          <Search
            placeholder={t('Search')}
            mb={10}
            mh={16}
            value={searchText}
            onChangeText={setSearchText}
          />
        )}

        <FlatList
          indicatorStyle='white'
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={onLoadMore}
          ListFooterComponent={renderLoadMore}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              tintColor={colors.white}
            />
          }
        />
      </>
    );
  },
);
