/* eslint-disable no-param-reassign */
import { ICON_TYPE, LIMIT_USER } from '@common/constant';
import { createSlice } from '@reduxjs/toolkit';
import { defaultProfile } from '@utils/models';

const initialState = {
  profile: defaultProfile,
  fetchProfileLoading: false,
  fetchProfileError: '',
  followFriendLoading: false,
  addFriendLoading: false,
  favouriteHostLoading: false,
  loadingUpdateProfile: false,
  updateProfileError: false,

  acceptRequestFriendLoading: false,
  acceptRequestFriendError: '',

  cancelRequestFriendLoading: false,
  cancelRequestFriendError: '',
  fcmToken: '',

  friendList: [],
  fetchFriendListLoading: false,
  fetchFriendListError: '',

  friendListOffset: 0,
  loadMoreFriendListNoMore: false,
  loadmoreFriendListLoading: false,
  loadmoreFriendListError: '',
  fetchUserLoading: false,

  listUser: [],
  usersOffset: 0,
  loadmoreUsersNoMore: false,
  loadmoreUsersLoading: false,
  notiSettingLoading: false,
  updatnotiSettingLoading: false,
  notiSetting: {},
  contactUs: false,

  popularUsers: [],
  winnerUsers: [],
  winnerOfWeeksUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.profile.email = action.payload.email;
    },

    fetchProfile: state => {
      state.fetchProfileLoading = true;
      state.fetchProfileError = '';
    },
    fetchProfileSucceeded: (state, action) => {
      state.fetchProfileLoading = false;
      state.profile = action.payload?.data || defaultProfile;
    },
    fetchProfileFailed: (state, action) => {
      state.fetchProfileLoading = false;
      state.fetchProfileError = action.payload.errorMessage;
    },
    followFriend: (state, action) => {
      state.followFriendLoading = true;
      const { data } = action.payload;
      if (data?.isNeedUpdate) {
        const index = state.listUser.findIndex(item => item.id === data.userId);
        if (data?.iconType === ICON_TYPE.POPULAR) {
          if (state.listUser[index].isFollowed) {
            state.listUser[index].total = +state.listUser[index].total - 1;
          } else {
            state.listUser[index].total = +state.listUser[index].total + 1;
          }
        }

        state.listUser[index].isFollowed = !state.listUser[index].isFollowed;
      }
    },
    followFriendSuccecced: state => {
      state.followFriendLoading = false;
    },
    followFriendFailed: state => {
      state.followFriendLoading = false;
    },
    addFriend: (state, action) => {
      state.addFriendLoading = true;
    },
    addFriendSuccecced: (state, action) => {
      state.addFriendLoading = false;
      const { data } = action.payload.payload;
      const index = state.listUser.findIndex(item => item.id === data?.userId);
      if (data?.isNeedUpdate && index !== -1) {
        const { friendStatus } = state.listUser[index];
        const { isFollowed } = state.listUser[index];
        if (friendStatus === null) {
          state.listUser[index].friendStatus = 'PENDING';
          state.listUser[index].isFollowed = true;
        } else {
          state.listUser[index].friendStatus = null;
          state.listUser[index].isFollowed = false;
        }
        // chi update total khi nó là list mà có icon love
        if (data?.iconType === ICON_TYPE.POPULAR) {
          const total = +state.listUser[index].total;
          if (friendStatus === null) {
            if (!isFollowed) {
              state.listUser[index].total = total + 1;
            }
          } else if (isFollowed) {
            state.listUser[index].total = total - 1;
          }
        }
      }
    },
    addFriendFailed: state => {
      state.addFriendLoading = false;
    },
    favouriteHost: state => {
      state.favouriteHostLoading = true;
    },
    favouriteHostSuccecced: state => {
      state.favouriteHostLoading = false;
    },
    favouriteHostFailed: state => {
      state.favouriteHostLoading = false;
    },

    acceptRequestFriend: state => {
      state.acceptRequestFriendLoading = true;
      state.acceptRequestFriendError = '';
    },
    acceptRequestFriendSucceeded: state => {
      state.acceptRequestFriendLoading = false;
    },
    acceptRequestFriendFailed: (state, action) => {
      state.acceptRequestFriendLoading = false;
      state.acceptRequestFriendError = action.payload.errorMessage;
    },

    cancelRequestFriend: state => {
      state.cancelRequestFriendLoading = true;
      state.cancelRequestFriendError = '';
    },
    cancelRequestFriendSucceeded: state => {
      state.cancelRequestFriendLoading = false;
    },
    cancelRequestFriendFailed: (state, action) => {
      state.cancelRequestFriendLoading = false;
      state.cancelRequestFriendError = action.payload.errorMessage;
    },

    updateFcmToken: (state, action) => {
      state.fcmToken = action.payload?.data?.fcmToken || '';
    },

    fetchFriendList: state => {
      state.fetchFriendListLoading = true;
      state.fetchFriendListError = '';
      state.loadMoreFriendListNoMore = false;
    },
    fetchFriendListSucceeded: (state, action) => {
      state.fetchFriendListLoading = false;
      state.friendList = action.payload?.data?.items || [];
    },
    fetchFriendListFailed: (state, action) => {
      state.fetchFriendListLoading = false;
      state.fetchFriendListError = action.payload.errorMessage;
    },
    loadmoreFriendList: state => {
      state.loadmoreFriendListLoading = true;
      state.loadmoreFriendListError = '';
    },
    loadmoreFriendListSucceeded: (state, action) => {
      state.loadmoreFriendListLoading = false;
      state.loadmoreFriendListError = '';
      state.friendList.push(...(action.payload?.data?.items || []));
      state.FriendListOffset =
        action.payload?.data?.items?.length > 0
          ? state.friendListOffset + 10
          : state.friendListOffset;
      state.loadMoreFriendListNoMore = !(
        action.payload?.data?.items?.length > 0
      );
    },
    loadmoreFriendListFailed: (state, action) => {
      state.loadmoreFriendListLoading = false;
      state.loadmoreFriendListError = action.payload.errorMessage;
    },

    fetchUser: state => {
      state.fetchUserLoading = true;
    },
    fetchUserSucceeded: (state, action) => {
      state.fetchUserLoading = false;
      state.loadmoreUsersNoMore = false;
      if (!Array.isArray(action.payload.data)) {
        state.popularUsers = action.payload.data.popular;
        state.winnerOfWeeksUsers = action.payload.data.winnerOfWeek;
        state.winnerUsers = action.payload.data.winner;
      } else {
        state.listUser = action.payload.data;
      }
    },
    fetchUserFailed: state => {
      state.fetchUserLoading = false;
      state.listUser = [];
    },

    loadmoreUsers: state => {
      state.loadmoreUsersLoading = true;
    },
    loadmoreUsersSucceeded: (state, action) => {
      state.loadmoreUsersLoading = false;
      state.listUser.push(...(action.payload?.data || []));
      state.usersOffset =
        action.payload?.data?.length > 0
          ? state.usersOffset + LIMIT_USER
          : state.usersOffset;
      state.loadmoreUsersNoMore = !(action.payload?.data?.length > 0);
    },
    loadmoreUsesFailed: (state, action) => {
      state.loadmoreUsersLoading = false;
    },
    updateProfile: state => {
      state.loadingUpdateProfile = true;
    },
    updateProfileSucceeded: (state, action) => {
      state.loadingUpdateProfile = false;
      state.profile.name = action.payload.data?.name;
      state.profile.avatar = action.payload.data?.avatar;
      state.profile.description = action.payload.data?.description;
      state.profile.birthday = action.payload.data?.birthday;
    },
    updateProfileFailed: (state, action) => {
      state.loadingUpdateProfile = false;
      state.updateProfileError = action.payload.errorMessage;
    },
    fetchNotifiSetting: state => {
      state.notiSettingLoading = true;
    },
    fetchNotifiSettingSucceeded: (state, action) => {
      state.notiSettingLoading = false;
      state.notiSetting = action.payload.data;
    },
    fetchNotiSettingFailed: state => {
      state.notiSettingLoading = false;
    },
    updateNotifiSetting: state => {
      state.updatnotiSettingLoading = true;
    },
    updateNotifiSettingSucceeded: state => {
      state.updatnotiSettingLoading = false;
    },
    updateNotiSettingFailed: state => {
      state.updatnotiSettingLoading = false;
    },
    contactUs: state => {
      state.contactUs = true;
    },
    contactUsSucceeded: state => {
      state.contactUs = false;
    },
    contactUsFailed: state => {
      state.contactUs = false;
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  saveEmail,
  fetchProfile,
  fetchProfileSucceeded,
  fetchProfileFailed,
  followFriend,
  followFriendSuccecced,
  followFriendFailed,
  addFriend,
  addFriendFailed,
  addFriendSuccecced,
  favouriteHost,
  favouriteHostFailed,
  favouriteHostSuccecced,
  acceptRequestFriend,
  acceptRequestFriendSucceeded,
  acceptRequestFriendFailed,
  cancelRequestFriend,
  cancelRequestFriendSucceeded,
  cancelRequestFriendFailed,
  updateFcmToken,
  fetchFriendList,
  fetchFriendListSucceeded,
  fetchFriendListFailed,
  loadmoreFriendList,
  loadmoreFriendListSucceeded,
  loadmoreFriendListFailed,
  fetchUser,
  fetchUserFailed,
  fetchUserSucceeded,
  loadmoreUsers,
  loadmoreUsersSucceeded,
  loadmoreUsesFailed,
  updateProfile,
  updateProfileSucceeded,
  updateProfileFailed,
  fetchNotiSettingFailed,
  fetchNotifiSetting,
  fetchNotifiSettingSucceeded,
  updateNotiSettingFailed,
  updateNotifiSetting,
  updateNotifiSettingSucceeded,
  contactUs,
  contactUsFailed,
  contactUsSucceeded,
} = actions;

export default reducer;
