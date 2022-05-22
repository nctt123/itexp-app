/* eslint-disable no-undef */
/* eslint-disable import/order */
import React, { memo, useEffect, useState } from 'react';
import { useDebounce } from '@common/customHook';
import Toast from 'react-native-toast-message';
import TabFavouriteView from './TabFavouriteView';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFavoriteSelector,
  loadingFavoriteSelector,
  loadingLoadMoreFavoriteSelector,
} from '@modules/profile/selectors';
import { fetchFavorite } from '@modules/profile/slice';

export default TabFavourite = memo(() => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const dispatch = useDispatch();
  const loading = useSelector(loadingFavoriteSelector);
  const favorite = useSelector(fetchFavoriteSelector);
  const loadingLoadMore = useSelector(loadingLoadMoreFavoriteSelector);

  useEffect(() => {
    getDataFavorite();
  }, [debouncedSearch]);

  const getDataFavorite = () => {
    dispatch(
      fetchFavorite({
        data: {
          keyword: searchText,
          onError: error => {
            Toast.show({
              type: 'error',
              props: {
                message: error.errorMessage,
              },
            });
          },
        },
      }),
    );
  };

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    if (favorite?.items?.length === favorite?.total) return;
    dispatch(
      fetchFavorite({
        data: {
          keyword: searchText,
          onError: error => {
            Toast.show({
              type: 'error',
              props: {
                message: error.errorMessage,
              },
            });
          },
        },
      }),
    );
  };

  return (
    <TabFavouriteView
      data={favorite.items}
      loading={loading}
      onLoadMore={onLoadMore}
      loadingLoadMore={loadingLoadMore}
      searchText={searchText}
      setSearchText={setSearchText}
      refresh={false}
      onRefresh={() => {}}
      onSuccess={getDataFavorite}
      total={favorite?.total}
    />
  );
});
