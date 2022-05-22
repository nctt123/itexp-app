/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/order */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Body, Block, Loading, Text } from '@components/index';
import Header from '@components/header';
import colors from '@assets/colors';

import Search from '@components/search';
import FriendItem from './item/FriendItem';
import SmallButton from '@components/button/ButtonSmall';
import { useDispatch, useSelector } from 'react-redux';
import {
  friendRequestSelector,
  LIMIT_FRIEND_REQUEST,
  loadingFetchFriendRequestSelector,
  loadingLoadMoreFriendRequestSelector,
} from '@modules/profile/selectors';
import keyExtractor from '@utils/keyExtractor';
import {
  acceptFriend,
  declineFriend,
  fetchFriendRequest,
  loadMoreFriendRequest,
} from '@modules/profile/slice';
import { useDebounce } from '@common/customHook';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default FriendRequests = () => {
  const [searchText, setSearchText] = useState('');
  const friendRequest = useSelector(friendRequestSelector);
  const { t } = useTranslation(['common']);
  const dispatch = useDispatch();
  const loadingLoadMore = useSelector(loadingLoadMoreFriendRequestSelector);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const loadingFriendRequest = useSelector(loadingFetchFriendRequestSelector);
  const { goBack } = useNavigation();

  const renderItem = ({ item }) => (
    <FriendItem
      item={item?.user}
      rightAction={
        <Block row>
          <SmallButton
            bg={colors.yellow}
            title={t('accept')}
            onPress={() => {
              dispatch(
                acceptFriend({
                  data: {
                    requestId: item?.id,
                  },
                }),
              );
            }}
          />
          <SmallButton
            bg={colors.gray}
            title={t('decline')}
            ml={16}
            onPress={() => {
              dispatch(
                declineFriend({
                  data: {
                    requestId: item?.id,
                  },
                }),
              );
            }}
          />
        </Block>
      }
    />
  );

  useEffect(() => {
    onFetchFriendRequest();
  }, [debouncedSearchTerm]);

  const onFetchFriendRequest = () => {
    dispatch(
      fetchFriendRequest({
        data: {
          keyword: searchText,
          onError: e => {
            Toast.show({
              type: 'error',
              props: {
                message: e.errorMessage,
              },
            });
          },
        },
      }),
    );
  };

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    if (friendRequest?.items?.length === friendRequest?.total) return;
    if (friendRequest?.items?.length >= LIMIT_FRIEND_REQUEST) {
      dispatch(
        loadMoreFriendRequest({
          data: {
            keyword: searchText,
            onError: e => {
              Toast.show({
                type: 'error',
                props: {
                  message: e.errorMessage,
                },
              });
            },
          },
        }),
      );
    }
  };

  const renderLoadMore = () =>
    loadingLoadMore ? (
      <Block center mv={10}>
        <Loading color={colors.white} />
      </Block>
    ) : null;

  const renderNoData = () => (
    <Block center middle mt={64}>
      <Text color={colors.white} size={16}>
        {t('common:noData')}
      </Text>
    </Block>
  );

  const onGoBack = () => {
    goBack();
    onFetchFriendRequest();
  };

  return (
    <Body ph={16} flex={1} loading={loadingFriendRequest}>
      <Header title={t('friendRequests')} onLeftPress={onGoBack} />
      <Search
        placeholder='Search'
        onChangeText={setSearchText}
        value={searchText}
      />
      <FlatList
        data={friendRequest.items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderLoadMore}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={renderNoData}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
            tintColor={colors.white}
          />
        }
      />
    </Body>
  );
};
