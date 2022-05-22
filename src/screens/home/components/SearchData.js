// /* eslint-disable indent */
import React, { useImperativeHandle } from "react";
import { FlatList, Keyboard } from "react-native";
import { Loading, RoomListItem, Text } from "@components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserSelector,
  fetchUserLoadingSelector,
  loadmoreFetchUserLoadingSelector,
  loadmoreFetchUserNoMoreSelector,
} from "@modules/user/selectors";
import { fetchUser, loadmoreUsers } from "@modules/user/slice";
import Toast from "react-native-toast-message";
import SongItemHome from "@screens/home/components/SongItemSearch";
import { verticalScale } from "@common/scale";
import { useTranslation } from "react-i18next";
import { LIMIT_USER } from "@common/constant";
import UserItem from "./UserItem";

const SearchData = React.forwardRef((props, ref) => {
  const { tabName, valueSearch, onCancel } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listUser = useSelector(fetchUserSelector);

  const loadingUser = useSelector(fetchUserLoadingSelector);
  const loadmoreUsersLoading = useSelector(loadmoreFetchUserLoadingSelector);
  const loadmoreUsersNoMore = useSelector(loadmoreFetchUserNoMoreSelector);

  useImperativeHandle(ref, () => ({
    onSearch() {
      switch (tabName) {
        case "songs": {
          getListSongYoutube();
          break;
        }
        case "users": {
          onFetchUsers();
          break;
        }
        default:
          null;
      }
      Keyboard.dismiss();
    },
  }));

  const onFetchUsers = () => {
    dispatch(
      fetchUser({
        data: { keyword: valueSearch },
        onError: (e) => {
          showError(e.errorMessage);
        },
      })
    );
  };

  const onFetchRooms = () => {};

  const getListSongYoutube = () => {
    dispatch(
      searchSongYoutube({
        data: {
          keyword: valueSearch,
        },
        onError: (e) => {
          showError(e.errorMessage);
        },
      })
    );
  };

  const onLoadMoreUsers = () => {
    dispatch(
      loadmoreUsers({
        data: {
          keyword: valueSearch,
        },
        onError: (e) => {
          showError(e.errorMessage);
        },
      })
    );
  };

  const showError = (message) => {
    Toast.show({
      type: "error",
      props: {
        message,
      },
    });
  };

  const onHandleLoadMore = () => {
    switch (tabName) {
      case "songs": {
        break;
      }
      case "users": {
        if (
          !loadmoreUsersNoMore &&
          !loadmoreUsersLoading &&
          listUser.length >= LIMIT_USER
        ) {
          onLoadMoreUsers();
        }
        break;
      }
      default:
        null;
    }
  };

  const renderItemSearch = (item, index) => {
    let renderItem = null;
    if (tabName === "songs") {
      renderItem = <SongItemHome item={item} />;
    } else if (tabName === "users") {
      renderItem = <UserItem item={item} index={index} valueSearch />;
    } else {
      renderItem = <RoomListItem item={item} onCancel={onCancel} />;
    }
    return renderItem;
  };

  const getData = () => {
    let listData = null;
    if (tabName === "songs") {
      listData = listUser;
    } else if (tabName === "users") {
      listData = listUser;
    }
    return listData;
  };

  return Array.isArray(getData()) ? (
    <FlatList
      data={getData()}
      renderItem={({ item, index }) => renderItemSearch(item, index)}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: verticalScale(16) }}
      ListEmptyComponent={
        loadingUser ? (
          <Loading />
        ) : (
          <Text c1 center middle>
            {t("common:noData")}
          </Text>
        )
      }
      onEndReachedThreshold={0.3}
      onEndReached={onHandleLoadMore}
    />
  ) : (
    <Loading mt={16} />
  );
});
export default SearchData;
