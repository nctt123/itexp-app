import React, { useEffect, useState, useRef } from 'react';
import {
  fetchFollowingApi,
  loadMoreFollowingApi,
} from '@modules/profile/services';
import Toast from 'react-native-toast-message';
import { useDebounce } from '@common/customHook';
import TabFollowingView from './TabFollowingView';
import { LIMIT_FRIEND_REQUEST } from '@modules/profile/selectors';

export default function TabFollowing() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const total = useRef(0);
  const [offset, setOffset] = useState(0);
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    getFollowing();
  }, [debouncedSearch]);

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    try {
      if (data?.length === total.current) return;
      if (data?.length >= LIMIT_FRIEND_REQUEST) {
        setLoadingLoadMore(true);
        const dataParams = { offset: offset + 10, keyword: searchText };
        loadMoreFollowingApi(dataParams)
          .then(res => {
            if (res.data?.items.length > 0) {
              setOffset(offset + 10);
              setData(prev => [...prev, ...res.data?.items]);
            }
          })
          .finally(() => {
            setLoadingLoadMore(false);
          });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        props: {
          message: error.errorMessage,
        },
      });
    }
  };

  const onRefresh = () => {
    try {
      const data = {
        keyword: searchText,
      };
      setRefresh(true);
      fetchFollowingApi(data)
        .then(res => {
          setData(res.data?.items);
          setOffset(0);
        })
        .finally(() => {
          setRefresh(false);
        });
    } catch (error) {}
  };

  const getFollowing = () => {
    try {
      const data = {
        keyword: searchText,
      };
      setLoading(true);
      fetchFollowingApi(data)
        .then(res => {
          setData(res.data?.items);
          setOffset(0);
          total.current = res.data?.total;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        props: {
          message: error.errorMessage,
        },
      });
    }
  };

  return (
    <TabFollowingView
      data={data}
      loading={loading}
      onLoadMore={onLoadMore}
      refresh={refresh}
      onRefresh={onRefresh}
      searchText={searchText}
      setSearchText={setSearchText}
      loadingLoadMore={loadingLoadMore}
      onSuccess={getFollowing}
    />
  );
}
