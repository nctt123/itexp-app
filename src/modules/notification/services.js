import { baseApi } from '@common/baseApi';

const LIMIT_NOTIFICATION = 10;

export function fetchNotificationsApi() {
  return baseApi.get('/notification', {
    offset: 0,
    limit: LIMIT_NOTIFICATION,
  });
}

export function loadmoreNotificationsApi({ offset }) {
  return baseApi.get('/notification', {
    offset,
    limit: LIMIT_NOTIFICATION,
  });
}

export function fetchTotalUnReadNotificationApi() {
  return baseApi.get('/notification/unread-count');
}

export function readNotificationApi({ notificationId }) {
  return baseApi.put(`/notification/${notificationId}/read`);
}
