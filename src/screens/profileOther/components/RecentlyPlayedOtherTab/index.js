/* eslint-disable no-undef */
import React, { memo, useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/core';
import {
  getRecentlyPlayedOther,
  loadMoreRecentlyPlayedOtherApi,
} from '@modules/profile/services';

import RecentlyPlayedView from '@screens/user/components/RecentlyPlayedView';

import Toast from 'react-native-toast-message';
import {
  fetchRecentlyOtherSelector,
  loadingLoadMoreRecentlyOtherSelector,
  loadingRecentlyOtherSelector,
} from '@modules/profile/selectors';

import {
  fetchRecentlyOtherPlayed,
  loadMoreRecentlyOther,
} from '@modules/profile/slice';

import { useDispatch, useSelector } from 'react-redux';

export default RecentlyPlayedOtherTab = memo(() => {
  const dispatch = useDispatch();
  const route = useRoute();
  const loadingLoadMore = useSelector(loadingLoadMoreRecentlyOtherSelector);
  const recentlyPlayedOther = useSelector(fetchRecentlyOtherSelector);
  const loading = useSelector(loadingRecentlyOtherSelector);
  const userId = route.params?.userId;

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    if (recentlyPlayedOther.items?.length === recentlyPlayedOther.total) return;
    dispatch(
      loadMoreRecentlyOther({
        data: {
          userId,
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

  const getRecentlyPlayedOther = () => {
    dispatch(
      fetchRecentlyOtherPlayed({
        data: {
          userId,
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

  useEffect(() => {
    getRecentlyPlayedOther();
  }, []);

  return (
    <RecentlyPlayedView
      data={recentlyPlayedOther.items}
      onLoadMore={onLoadMore}
      loading={loading}
      loadingLoadMore={loadingLoadMore}
      refresh={false}
      onRefresh={() => {}}
    />
  );
});
