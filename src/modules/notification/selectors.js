import { createSelector } from 'reselect';

const notificationSelector = state => state.notification;

export const notificationsSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.notifications,
);

export const fetchNotificationsLoadingSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.fetchNotificationsLoading,
);

export const fetchNotificationsErrorSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.fetchNotificationsError,
);

export const notificationsOffsetSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.notificationsOffset,
);

export const loadMoreNotificationsNoMoreSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.loadMoreNotificationsNoMore,
);

export const loadmoreNotificationsLoadingSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.loadmoreNotificationsLoading,
);

export const loadmoreNotificationsErrorSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.loadmoreNotificationsError,
);

export const totalUnReadNotificationSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.totalUnReadNotification,
);

export const fetchTotalUnReadNotificationLoadingSelector = createSelector(
  notificationSelector,
  notificationReducer =>
    notificationReducer.fetchTotalUnReadNotificationLoading,
);

export const fetchTotalUnReadNotificationErrorSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.fetchTotalUnReadNotificationError,
);

export const readNotificationLoadingSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.readNotificationLoading,
);

export const readNotificationErrorSelector = createSelector(
  notificationSelector,
  notificationReducer => notificationReducer.readNotificationError,
);
