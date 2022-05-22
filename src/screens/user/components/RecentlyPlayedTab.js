/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable no-undef */
import React, { memo, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import RecentlyPlayedView from './RecentlyPlayedView';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecentlySelector,
  loadingLoadMoreRecentlySelector,
  loadingRecentlySelector,
} from '@modules/profile/selectors';
import { fetchRecentlyPlayed, loadMoreRecently } from '@modules/profile/slice';

export default RecentlyPlayedTab = memo(() => {
  const dispatch = useDispatch();
  const loadingLoadMore = useSelector(loadingLoadMoreRecentlySelector);
  const recentlyPlayed = useSelector(fetchRecentlySelector);
  const loading = useSelector(loadingRecentlySelector);

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    if (recentlyPlayed?.items?.length === recentlyPlayed?.total) return;
    dispatch(
      loadMoreRecently({
        data: {
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

  const getRecentlyPlayed = () => {
    dispatch(
      fetchRecentlyPlayed({
        data: {
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
    getRecentlyPlayed();
  }, []);

  return (
    <RecentlyPlayedView
      data={recentlyPlayed?.items}
      onLoadMore={onLoadMore}
      loading={loading}
      loadingLoadMore={loadingLoadMore}
      refresh={false}
      onRefresh={() => {}}
    />
  );
});
