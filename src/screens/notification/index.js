/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from "react";
import { Body, Block, Loading, Text } from "@components/index";

import Header from "@components/header";
import { FlatList, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  fetchTotalUnReadNotification,
  loadmoreNotifications,
} from "@modules/notification/slice";
import {
  fetchNotificationsLoadingSelector,
  loadmoreNotificationsLoadingSelector,
  notificationsSelector,
} from "@modules/notification/selectors";
import colors from "@assets/colors";
import NotificationItem from "./components/notificationItem";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const { t } = useTranslation();
  const notificatiions = useSelector(notificationsSelector);
  const fetchNotificationsLoading = useSelector(
    fetchNotificationsLoadingSelector
  );
  const loadmoreNotificationsLoading = useSelector(
    loadmoreNotificationsLoadingSelector
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onFetchNotification();
  }, []);

  const onFetchNotification = () => {
    dispatch(fetchTotalUnReadNotification());
    dispatch(fetchNotifications());
  };

  const onLoadMoreNotification = () => {
    dispatch(loadmoreNotifications());
  };

  console.log({notificatiions});
  return (
    <Body loading={false}>
      <Header title="Thông báo" isBack={false} />
      <Block mt={15} />

      <FlatList
        data={notificatiions}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={fetchNotificationsLoading}
            onRefresh={onFetchNotification}
            tintColor={colors.white}
          />
        }
        renderItem={({ item }) => (
          <NotificationItem item={item} key={item.id} />
        )}
        onEndReached={() => {
          if (!loadmoreNotificationsLoading && notificatiions.length >= 10) {
            onLoadMoreNotification();
          }
        }}
        onEndReachedThreshold={0.3}
        loadmoreLoading={() =>
          loadmoreNotificationsLoading && (
            <Block center mv={10}>
              <Loading />
            </Block>
          )
        }
        ListEmptyComponent={
          <Block center middle>
            <Text size={16} mt={64}>
              {t("common:noData")}
            </Text>
          </Block>
        }
      />
    </Body>
  );
};

export default Notification;
