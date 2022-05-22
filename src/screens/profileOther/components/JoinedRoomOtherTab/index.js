import React, { memo, useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {
  getJoinedRooOtherApi,
  loadMoreJoinedOtherApi,
} from '@modules/profile/services';
import JoinedRoomView from '@screens/user/components/JoinedRoomView';

export default JoinedRoomOtherTab = memo(props => {
  const route = useRoute();
  const userId = route.params?.userId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const total = useRef();

  const onRefresh = () => {
    try {
      setRefresh(true);
      getJoinedRooOtherApi({ userId })
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
      getJoinedRooOtherApi({ userId })
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

      loadMoreJoinedOtherApi({ offset: offset + 10, userId })
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
