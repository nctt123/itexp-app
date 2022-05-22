import React, { memo, useEffect, useState, useRef } from 'react';
import JoinedRoomView from './JoinedRoomView';
import Toast from 'react-native-toast-message';
import { getJoinedRoomApi, loadMoreJoinedApi } from '@modules/profile/services';

export default JoinedRoom = memo(() => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const total = useRef();

  const onRefresh = () => {
    try {
      setRefresh(true);
      getJoinedRoomApi()
        .then(res => {
          setData(res.data?.items);
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

  const getDataJoinedRoom = () => {
    try {
      setLoading(true);
      getJoinedRoomApi()
        .then(res => {
          setData(res.data?.items);
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

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    try {
      if (data.length === total.current) return;
      setLoadingLoadMore(true);
      ({ offset: offset + 10 });
      loadMoreJoinedApi()
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

  useEffect(() => {
    getDataJoinedRoom();
  }, []);

  return (
    <JoinedRoomView
      data={data}
      loading={loading}
      loadingLoadMore={loadingLoadMore}
      onLoadMore={onLoadMore}
      refresh={refresh}
      onRefresh={onRefresh}
    />
  );
});
