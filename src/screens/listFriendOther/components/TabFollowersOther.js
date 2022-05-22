import React, { useEffect, useState, useRef } from 'react';
import {
  fetchFollowersOtherApi,
  loadMoreFollowersOtherApi,
} from '@modules/profile/services';
import Toast from 'react-native-toast-message';
import { useDebounce } from '@common/customHook';
import TabFollowersView from '@screens/listFriend/components/TabFollowersView';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { profileSelector } from '@modules/user/selectors';
import { LIMIT_FRIEND_REQUEST } from '@modules/profile/selectors';

export default function TabFollowersOther() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const total = useRef(0);
  const [offset, setOffset] = useState(0);
  const debouncedSearch = useDebounce(searchText, 500);
  const route = useRoute();
  const userId = route.params?.userId;
  const currentId = useSelector(profileSelector)?.id;

  const getFollowers = () => {
    try {
      const data = {
        keyword: searchText,
        userId,
      };
      setLoading(true);
      fetchFollowersOtherApi(data)
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

  useEffect(() => {
    getFollowers();
  }, [debouncedSearch]);

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    try {
      if (data?.length === total.current) return;
      if (data?.length >= LIMIT_FRIEND_REQUEST) {
        setLoadingLoadMore(true);
        const dataParams = {
          offset: offset + 10,
          keyword: searchText,
          userId,
        };
        loadMoreFollowersOtherApi(dataParams)
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
        userId,
      };
      setRefresh(true);
      fetchFollowersOtherApi(data)
        .then(res => {
          setData(res.data?.items);
          setOffset(0);
        })
        .finally(() => {
          setRefresh(false);
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
    <TabFollowersView
      data={data}
      loading={loading}
      onLoadMore={onLoadMore}
      refresh={refresh}
      onRefresh={onRefresh}
      searchText={searchText}
      setSearchText={setSearchText}
      loadingLoadMore={loadingLoadMore}
      onSuccess={getFollowers}
      currentId={currentId}
    />
  );
}
