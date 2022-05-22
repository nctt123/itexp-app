import React, { useEffect, useState, useRef } from 'react';
import { fetchFriendApi, loadMoreFriendApi } from '@modules/profile/services';
import Toast from 'react-native-toast-message';
import {
  friendRequestSelector,
  LIMIT_FRIEND_REQUEST,
  loadingFetchFriendRequestSelector,
} from '@modules/profile/selectors';
import { useDebounce } from '@common/customHook';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendRequest } from '@modules/profile/slice';
import TabFriendView from './TabFriendView';

export default function TabFriend() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const total = useRef(0);
  const [offset, setOffset] = useState(0);
  const debouncedSearch = useDebounce(searchText, 500);

  const loadingFriendRequest = useSelector(loadingFetchFriendRequestSelector);
  const totalRequest = useSelector(friendRequestSelector)?.total;

  useEffect(() => {
    getFetchFriend();
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(
      fetchFriendRequest({
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
  }, []);

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    try {
      if (data?.length === total.current) return;
      if (data?.length >= LIMIT_FRIEND_REQUEST) {
        setLoadingLoadMore(true);
        const dataParams = { offset: offset + 10, keyword: searchText };
        loadMoreFriendApi(dataParams)
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
      fetchFriendApi(data)
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
      };
      setLoading(true);
      fetchFriendApi(data)
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
      loadingFriendRequest={loadingFriendRequest}
      totalRequest={totalRequest}
      onSucceed={getFetchFriend}
    />
  );
}
