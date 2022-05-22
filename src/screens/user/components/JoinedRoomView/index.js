/* eslint-disable no-undef */
import React, { memo, useCallback } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Block, RoomListItem, Loading, Text } from '@components/index';
import colors from '@assets/colors';
import keyExtractor from '@utils/keyExtractor';
import { useTranslation } from 'react-i18next';

export default JoinedRoom = memo(
  ({ data, loading, onLoadMore, loadingLoadMore, refresh, onRefresh }) => {
    const { t } = useTranslation(['common']);
    const renderItem = useCallback(
      ({ item }) => <RoomListItem item={item} />,
      [],
    );

    const renderFooterLoading = () =>
      loadingLoadMore && (
        <Block center mv={10}>
          <Loading />
        </Block>
      );

    if (loading) {
      return (
        <Block middle center flex>
          <ActivityIndicator color={colors.white} />
        </Block>
      );
    }

    const renderEmpty = () => (
      <Block center middle mt={16}>
        <Text color={colors.white} size={16}>
          {t('noData')}
        </Text>
      </Block>
    );

    return (
      <Block>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooterLoading}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              tintColor={colors.white}
            />
          }
        />
      </Block>
    );
  },
);
