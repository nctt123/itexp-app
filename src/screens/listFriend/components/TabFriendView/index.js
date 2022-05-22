/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  Block,
  Text,
  Icon,
  Image,
  Touchable,
  Loading,
} from '@components/index';
import images from '@assets/images';
import { useTranslation } from 'react-i18next';
import Search from '@components/search';
import SvgComponent from '@assets/svg';
import { useNavigation } from '@react-navigation/core';
import * as screenTypes from '@navigation/screenTypes';
import keyExtractor from '@utils/keyExtractor';
import colors from '@assets/colors';
import { unFriendApi } from '@modules/profile/services';
import { useModal } from '@common/customHook';
import { fetchProfile } from '@modules/user/slice';
import FriendItem from '@screens/user/item/FriendItem';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { addFriendApi } from '@modules/user/services';
import { statusFriend } from '@common/constant';

export default TabFriendView = ({
  data,
  loading,
  onLoadMore,
  refresh,
  onRefresh,
  searchText,
  setSearchText,
  loadingLoadMore,
  loadingFriendRequest,
  totalRequest,
  onSucceed,
  currentId,
}) => {
  const { t } = useTranslation(['common', 'translation']);
  const { navigate } = useNavigation();
  const [modal, contextHolder] = useModal();
  const dispatch = useDispatch();

  const goToFriendRequests = () => {
    navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.FriendRequests,
    });
  };

  const addFriend = (userId, onSuccess) => {
    try {
      addFriendApi({ userId, type: statusFriend.Pending }).then(() => {
        onSuccess && onSuccess();
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

  const unFriend = (userId, onSuccess) => {
    try {
      unFriendApi({ userId }).then(() => {
        onSuccess && onSuccess();
        dispatch(fetchProfile());
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

  const renderIconItem = item => {
    if (item?.friendStatus === statusFriend.Friend) {
      return SvgComponent.makeFriend;
    }
    if (!item?.friendStatus) {
      return SvgComponent.addFriend;
    }
    if (item?.friendStatus === statusFriend.Pending) {
      return SvgComponent.waitingAccept;
    }
    return SvgComponent.addFriend;
  };

  const onPressItem = item => {
    if (item?.friendStatus === statusFriend.Friend) {
      return modal.normal({
        title: t('profile:Unfriend'),
        content: t('profile:content_unfriend', {
          name: item?.friend?.name,
        }),
        okButton: () => {
          unFriend(item?.friend?.id, onSucceed);
          dispatch(fetchProfile());
        },
      });
    }

    if (item?.friendStatus === statusFriend.Pending) {
      return addFriend(item?.friend?.id, onSucceed);
    }
    if (!item?.friendStatus) {
      return addFriend(item?.friend?.id, onSucceed);
    }
    addFriend(item?.friend?.id, onSucceed);
  };

  const renderItem = useCallback(({ item }) => {
    const icon = renderIconItem(item);
    if (currentId === item.friend?.id) {
      return (
        <Block row mt={16} middle>
          <Image circle={44} source={{ uri: item?.friend?.avatar }} />
          <Text flex={1} ml={16} c1 extraBold>
            {item.friend?.name}
          </Text>
        </Block>
      );
    }
    return (
      <FriendItem
        item={item?.friend}
        rightAction={
          <Icon touchable xml={icon} onPress={() => onPressItem(item)} />
        }
      />
    );
  }, []);

  const renderNoData = () => (
    <Block center middle mt={64}>
      <Text color={colors.white} size={16}>
        {t('noData')}
      </Text>
    </Block>
  );

  const renderLoadMore = () =>
    loadingLoadMore && (
      <Block center mv={10}>
        <Loading color={colors.white} />
      </Block>
    );

  return (
    <>
      <Block mt={16} loading={loading}>
        <Search
          onChangeText={setSearchText}
          placeholder={t('Search')}
          value={searchText}
        />
        {totalRequest ? (
          loadingFriendRequest ? (
            <Block middle center mt={32}>
              <Loading />
            </Block>
          ) : (
            <Touchable row mt={16} middle onPress={goToFriendRequests}>
              <Image circle={30} source={images.bruno} />
              <Image
                circle={30}
                source={images.bruno}
                absolute
                left={22}
                top={8}
              />
              <Block flex={1} ml={30}>
                <Text extraBold>{t('Friend Requests')}</Text>
                <Text medium c2>
                  {totalRequest} {t('requests')}
                </Text>
              </Block>
              <Icon touchable xml={SvgComponent.next2} />
            </Touchable>
          )
        ) : null}

        <Text mt={16} extraBold>
          {t('All Friends')}
        </Text>
      </Block>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderNoData}
        onEndReachedThreshold={0.3}
        onEndReached={onLoadMore}
        ListFooterComponent={renderLoadMore}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }
      />
      {contextHolder}
    </>
  );
};
