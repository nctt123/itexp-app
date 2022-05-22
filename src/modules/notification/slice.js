/* eslint-disable no-param-reassign */
import { acceptRequestFriend, cancelRequestFriend } from '@modules/user/slice';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  fetchNotificationsLoading: false,
  fetchNotificationsError: '',

  notificationsOffset: 0,
  loadMoreNotificationsNoMore: false,
  loadmoreNotificationsLoading: false,
  loadmoreNotificationsError: '',

  totalUnReadNotification: 0,
  fetchTotalUnReadNotificationLoading: false,
  fetchTotalUnReadNotificationError: '',

  readNotificationLoading: false,
  readNotificationError: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNotifications: state => {
      state.fetchNotificationsLoading = true;
      state.fetchNotificationsError = '';
      state.loadMoreNotificationsNoMore = false;
    },
    fetchNotificationsSucceeded: (state, action) => {
      state.fetchNotificationsLoading = false;
      state.notifications = action.payload?.items || [];
    },
    fetchNotificationsFailed: (state, action) => {
      state.fetchNotificationsLoading = false;
      state.fetchNotificationsError = action.payload.errorMessage;
    },

    loadmoreNotifications: state => {
      state.loadmoreNotificationsLoading = true;
      state.loadmoreNotificationsError = '';
    },
    loadmoreNotificationsSucceeded: (state, action) => {
      state.loadmoreNotificationsLoading = false;
      state.loadmoreNotificationsError = '';
      state.notifications.push(...(action.payload?.items || []));
      state.NotificationsOffset =
        action.payload?.data?.items?.length > 0
          ? state.NotificationsOffset + 10
          : state.NotificationsOffset;
      state.loadMoreNotificationsNoMore = !(
        action.payload?.data?.items?.length > 0
      );
    },
    loadmoreNotificationsFailed: (state, action) => {
      state.loadmoreNotificationsLoading = false;
      state.loadmoreNotificationsError = action.payload.errorMessage;
    },

    fetchTotalUnReadNotification: state => {
      state.fetchTotalUnReadNotificationLoading = true;
      state.fetchTotalUnReadNotificationError = '';
    },
    fetchTotalUnReadNotificationSucceeded: (state, action) => {
      state.fetchTotalUnReadNotificationLoading = false;
      state.totalUnReadNotification = action.payload?.total || 0;
    },
    fetchTotalUnReadNotificationFailed: (state, action) => {
      state.fetchTotalUnReadNotificationLoading = false;
      state.fetchTotalUnReadNotificationError = action.payload.errorMessage;
    },

    incrementTotalUnReadNotification: (state, action) => {
      state.totalUnReadNotification += action.payload.amout;
    },
    decrementTotalUnReadNotification: (state, action) => {
      state.totalUnReadNotification -= action.payload.amout;
    },

    readNotification: state => {
      state.readNotificationLoading = true;
      state.readNotificationError = '';
    },
    readNotificationSucceeded: (state, action) => {
      state.readNotificationLoading = false;
      state.totalUnReadNotification -= 1;
      const index = state.notifications.findIndex(
        item => item.id === action.payload.items.id,
      );
      if (index !== -1) {
        state.notifications[index].isRead = true;
      }
    },
    readNotificationFailed: (state, action) => {
      state.readNotificationLoading = false;
      state.readNotificationError = action.payload.errorMessage;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(acceptRequestFriend, (state, action) => {
        const index = state.notifications.findIndex(
          item => item.id === action.payload.data.notificationId,
        );
        if (index !== -1) {
          state.notifications.splice(index, 1);
        }
      })
      .addCase(cancelRequestFriend, (state, action) => {
        const index = state.notifications.findIndex(
          item => item.id === action.payload.data.notificationId,
        );
        if (index !== -1) {
          state.notifications.splice(index, 1);
        }
      });
  },
});

const { actions, reducer } = notificationSlice;

export const {
  fetchNotifications,
  fetchNotificationsSucceeded,
  fetchNotificationsFailed,

  loadmoreNotifications,
  loadmoreNotificationsSucceeded,
  loadmoreNotificationsFailed,

  fetchTotalUnReadNotification,
  fetchTotalUnReadNotificationSucceeded,
  fetchTotalUnReadNotificationFailed,

  incrementTotalUnReadNotification,
  decrementTotalUnReadNotification,

  readNotification,
  readNotificationSucceeded,
  readNotificationFailed,
} = actions;

export default reducer;
