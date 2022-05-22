/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-undef */
import React, { memo, useCallback } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import colors from '@assets/colors';
import { Block, Loading, Text } from '@components/index';
import keyExtractor from '@utils/keyExtractor';
import { useTranslation } from 'react-i18next';
import SongItemUser from '../SongItemUser';

export default RecentlyPlayedTabView = memo(
  ({ data, onLoadMore, loading, loadingLoadMore, refresh, onRefresh }) => {
    const { t } = useTranslation(['common']);

    const renderItem = useCallback(({ item }) => (
      <SongItemUser item={item} />
    ));

    const renderLoadMore = () =>
      loadingLoadMore ? (
        <Block center mv={10}>
          <Loading color={colors.white} />
        </Block>
      ) : null;

    const renderEmpty = () => (
      <Block center middle mt={14}>
        <Text color={colors.white} size={16}>
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

    return (
      <FlatList
        indicatorStyle={'white'}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.3}
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
    );
  },
);
