import React, { memo, useEffect, useState } from 'react';
import { useDebounce } from '@common/customHook';
import Toast from 'react-native-toast-message';
import TabFavouriteView from '@screens/user/components/TabFavouriteView';
import { useRoute } from '@react-navigation/native';
import {
  fetchFavoriteOtherSelector,
  loadingFavoriteOtherSelector,
  loadingLoadMoreFavoriteOtherSelector,
} from '@modules/profile/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFavoriteOther,
  loadMoreFavoriteOther,
} from '@modules/profile/slice';

export default TabFavouriteOther = memo(() => {
  const route = useRoute();
  const userId = route.params?.userId;
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const dispatch = useDispatch();
  const loading = useSelector(loadingFavoriteOtherSelector);
  const favorite = useSelector(fetchFavoriteOtherSelector);
  const loadingLoadMore = useSelector(loadingLoadMoreFavoriteOtherSelector);

  useEffect(() => {
    getDataFavorite();
  }, [debouncedSearch]);

  const getDataFavorite = () => {
    dispatch(
      fetchFavoriteOther({
        data: {
          userId,
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
      loadMoreFavoriteOther({
        data: {
          userId,
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
      loading={loading}
      onLoadMore={onLoadMore}
      loadingLoadMore={loadingLoadMore}
      searchText={searchText}
      setSearchText={setSearchText}
      refresh={false}
      onRefresh={() => {}}
      onSuccess={getDataFavorite}
      data={favorite.items}
    />
  );
});
