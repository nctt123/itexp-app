/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from "react";
import { Keyboard, Platform } from "react-native";
import {
  Text,
  Body,
  Touchable,
  Search,
  Block,
  Image,
  Icon,
  Loading,
} from "@components/index";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@modules/user/slice";
import { fetchTotalUnReadNotification } from "@modules/notification/slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, RefreshControl } from "react-native";
import {
  loadingFetchPostSelector,
  loadingLoadMoreSelector,
  postSelector,
  refreshSelector,
} from "@modules/home/selectors";
import keyExtractor from "@utils/keyExtractor";
import {
  addLike,
  fetchPost,
  loadMorePost,
  onRefresh,
} from "@modules/home/slice";
import Toast from "react-native-toast-message";
import { profileSelector } from "@modules/user/selectors";
import images from "@assets/images";
import colors from "@assets/colors";
import SvgComponent from "@assets/svg";
import * as screenTypes from "@navigation/screenTypes";
import moment from "moment";

export default function Home() {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const post = useSelector(postSelector);
  const profile = useSelector(profileSelector);
  const loading = useSelector(loadingFetchPostSelector);
  const loadingLoadMore = useSelector(loadingLoadMoreSelector);
  const refresh = useSelector(refreshSelector)
  const [keyword, setKeyword] = useState('Tìm kiếm ....')
  const { navigate } = useNavigation();
  console.log({ loading });
  useEffect(() => {
    onFetchData();
  }, []);

  const onFetchData = () => {
    dispatch(fetchProfile());
    dispatch(fetchTotalUnReadNotification());
    dispatch(
      fetchPost({
        // onError: (e) => {
        //   Toast.show({
        //     type: "error",
        //     props: {
        //       message: e.errorMessage,
        //     },
        //   });
        // },
      })
    );
  };

  const onAddLike = (postId) => {
    dispatch(
      addLike({
        data: {
          postId,
          onError: (e) => {
            Toast.show({
              type: "error",
              props: {
                message: e.errorMessage,
              },
            });
          },
        },
      })
    );
  };

  const onRefreshPost = () => {
    if (refresh) return;
    dispatch(
      onRefresh({
        onError: (e) => {
          Toast.show({
            type: "error",
            props: {
              message: e.errorMessage,
            },
          });
        },
      })
    );
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <Touchable mt={10}
        onPress={() => {
          navigate(screenTypes.HomeDetailStack, {
            screen: screenTypes.PostDetail,
            params: { item },
          });
        }}
      >
        <Block row justifyBetween middle >
          <Block row>
            <Image
              uri={"http://10.0.2.2:3000/" + item?.user_avatar}
              defaultImage={images.default_avatar}
              circle={35}
            />
            <Block>
              <Text size={16} color={colors.white} bold pl={5}>
                {item?.user_name ?? 'Tác giả'}
              </Text>

              <Text ml={5} type='c2' italic color={colors.white}>
                {moment(item?.createdAt).format("hh:mm A - DD/MM/YYYY")}{" "}
              </Text>
            </Block>
          </Block>
          <Icon
            touchable
            onPress={() => {
              onAddLike(item.id);
            }}
            xml={
              item?.isLiked ? SvgComponent.iconLoveRedBig : SvgComponent.love
            }
          />
        </Block>
        <Block row justifyBetween >
          <Block width={'65%'}>
            <Text numberOfLines={2} fontWeight='bold' size={14} mv={3}>
              {item.title}
            </Text>
            <Text numberOfLines={3} color={'#ECECEC'} size={14} mv={3}>
              {item.description}
            </Text>
          </Block>
          {item?.image ? (
            <Image
              uri={
                Platform.OS !== "ios"
                  ? "http://10.0.2.2:3000/" + item?.image
                  : "http://10.0.2.2:3000/" + item?.image
              }
              borderRadius={5}
              height={80}
              width={'35%'}
            />
          ) : null}
        </Block>
        <Block height={1} mt={10} bg={colors.gray} />
      </Touchable>
    );
  });

  const onLoadMore = () => {
    if (loadingLoadMore) return;
    if (post?.items?.length === post?.total) return;
    dispatch(
      loadMorePost({
        data: {
          onError: (error) => {
            Toast.show({
              type: "error",
              props: {
                message: error.errorMessage,
              },
            });
          },
        },
      })
    );
  };

  const renderLoadMore = () =>
    loadingLoadMore ? (
      <Block center mv={10}>
        <Loading color={colors.white} />
      </Block>
    ) : null;

  const goListUser = () => {
    navigate(screenTypes.HomeDetailStack, {
      screen: screenTypes.ListUsers,
    });
  };

  const onGoSearch = () => {
    navigate(screenTypes.HomeDetailStack, {
      screen: screenTypes.ListPosts,
    });
  };

  return (
    <Body loading={loading} ph={16}>
      <Text type='h3' fontWeight={'bold'} pt={10}>
        {`Hi ${profile?.name},`}
      </Text>
      <Block row middle mt={8}>
        <Block flex={1}>
          <Touchable
            onPress={onGoSearch}
            row
            height={30}
            borderRadius={8}
            borderWidth={1}
            middle
            borderColor={colors.gray}
            bg={colors.gray}
          >
            <Icon xml={SvgComponent.searchActive} mh={10} />
            <Text size={16} medium>
              Tìm kiếm ...
            </Text>
          </Touchable>
        </Block>
      </Block>
      <FlatList
        data={post?.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text center middle mt={60} size={18}>
            {t("common:noData")}
          </Text>
        }
        onEndReachedThreshold={0.3}
        onEndReached={onLoadMore}
        ListFooterComponent={renderLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefreshPost}
            tintColor={colors.white}
          />
        }
      />
    </Body>
  );
}
