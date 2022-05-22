import React, { useEffect, useState, useRef } from 'react';
import {
  fetchFriendOtherApi,
  loadMoreFriendOtherApi,
} from '@modules/profile/services';
import Toast from 'react-native-toast-message';
import { useDebounce } from '@common/customHook';
import TabFriendView from '@screens/listFriend/components/TabFriendView';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { profileSelector } from '@modules/user/selectors';

export default function TabFriendOther() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const userId = route.params?.userId;
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const total = useRef(0);
  const [offset, setOffset] = useState(0);
  const debouncedSearch = useDebounce(searchText, 500);
  const currentId = useSelector(profileSelector)?.id;

  useEffect(() => {
    getFetchFriend();
  }, [debouncedSearch]);

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    try {
      if (data?.length === total.current) return;
      setLoadingLoadMore(true);
      const dataParams = {
        offset: offset + 10,
        keyword: searchText,
        userId,
      };
      loadMoreFriendOtherApi(dataParams)
        .then(res => {
          if (res.data?.items.length > 0) {
            setOffset(offset + 10);
            setData(prev => [...prev, ...res.data?.items]);
          }
        })
        .finally(() => {
          setLoadingLoadMore(false);
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

  const onRefresh = () => {
    try {
      const data = {
        keyword: searchText,
        userId,
      };
      setRefresh(true);
      fetchFriendOtherApi(data)
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

  const getFetchFriend = () => {
    try {
      const data = {
        keyword: searchText,
        userId,
      };
      setLoading(true);
      fetchFriendOtherApi(data)
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
    <TabFriendView
      data={data}
      loading={loading}
      onLoadMore={onLoadMore}
      refresh={refresh}
      onRefresh={onRefresh}
      searchText={searchText}
      setSearchText={setSearchText}
      loadingLoadMore={loadingLoadMore}
      onSucceed={getFetchFriend}
      currentId={currentId}
    />
  );
}
