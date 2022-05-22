/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { defaultProfile } from '@utils/models';
import _ from 'lodash';

const initialState = {
  profileOther: defaultProfile,
  loadingFetchProfileOther: false,
  profileOtherError: '',

  // Friend request
  friendRequests: {
    total: 0,
    items: [],
  },
  loadingFetchFriendRequest: false,
  fetchFriendRequestError: '',
  acceptFriendError: '',
  declineFriendError: '',
  loadMoreFriendRequestOffset: 0,
  loadingLoadMoreFriendRequest: false,
  loadMoreFriendRequestError: '',

  // Recently Played
  recentlyPlayed: {
    total: 0,
    items: [],
  },
  loadingRecently: false,
  fetchRecentlyError: '',
  loadMoreRecentlyOffset: 0,
  loadingLoadMoreRecentlyRequest: false,
  loadMoreRecentlyError: '',

  // Recently Played Other
  recentlyPlayedOther: {
    total: 0,
    items: [],
  },
  loadingRecentlyOther: false,
  fetchRecentlyOtherError: '',
  loadMoreRecentlyOtherOffset: 0,
  loadingLoadMoreRecentlyOther: false,
  loadMoreRecentlyOtherError: '',

  // Favorite
  favorite: {
    total: 0,
    items: [],
  },
  loadingFavorite: false,
  fetchFavoriteError: '',
  loadMoreFavoriteOffset: 0,
  loadingLoadMoreFavorite: false,
  loadMoreFavoriteError: '',

  // Favorite Other:
  favoriteOther: {
    total: 0,
    items: [],
  },
  loadingFavoriteOther: false,
  fetchFavoriteOtherError: '',
  loadMoreFavoriteOtherOffset: 0,
  loadingLoadMoreFavoriteOther: false,
  loadMoreFavoriteOtherError: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileOther: state => {
      state.loadingFetchProfileOther = true;
    },
    fetchProfileOtherSucceed: (state, action) => {
      state.loadingFetchProfileOther = false;
      state.profileOther = action.payload?.data;
    },
    fetchProfileOtherFailed: (state, action) => {
      state.loadingFetchProfileOther = false;
      state.profileOtherError = action.payload.errorMessage;
    },
    fetchFriendRequest: state => {
      state.loadMoreFriendRequestOffset = 0;
      state.loadingFetchFriendRequest = true;
    },
    fetchFriendRequestSucceed: (state, action) => {
      state.loadingFetchFriendRequest = false;
      state.friendRequests.items = action.payload?.data?.items;
      state.friendRequests.total = action.payload?.data?.total;
    },
    fetchFriendRequestFailed: (state, action) => {
      state.loadingFetchFriendRequest = false;
      state.fetchFriendRequestError = action.payload?.errorMessage;
    },
    acceptFriend: state => {
      state.friendRequests.items;
    },
    acceptFriendSucceed: (state, action) => {
      state.friendRequests.items = _.filter(
        state.friendRequests.items,
        item => item.id !== action.payload?.data?.requestId,
      );
    },
    acceptFriendFailed: (state, action) => {
      state.acceptFriendError = action.payload?.errorMessage;
    },
    declineFriend: state => {
      state.friendRequests;
    },
    declineFriendSucceed: (state, action) => {
      state.friendRequests.items = _.filter(
        state.friendRequests.items,
        item => item.id !== action.payload?.data?.requestId,
      );
    },
    declineFriendFailed: (state, action) => {
      state.declineFriendError = action.payload?.errorMessage;
    },
    loadMoreFriendRequest: state => {
      state.loadingLoadMoreFriendRequest = true;
    },
    loadMoreFriendRequestSucceed: (state, action) => {
      state.loadingLoadMoreFriendRequest = false;
      state.friendRequests.items = [
        ...state.friendRequests.items,
        ...action.payload?.data?.items,
      ];
      state.loadMoreFriendRequestOffset =
        action.payload?.data?.items?.length > 0
          ? state.loadMoreFriendRequestOffset + 10
          : state.loadMoreFriendRequestOffset;
    },
    loadMoreFriendRequestFailed: (state, action) => {
      state.loadingLoadMoreFriendRequest = false;
      state.loadMoreFriendRequestError = action.payload?.errorMessage;
    },
    fetchRecentlyPlayed: state => {
      state.loadingRecently = true;
      state.loadMoreRecentlyOffset = 0;
    },
    fetchRecentlyPlayedSucceed: (state, action) => {
      state.loadingRecently = false;
      state.recentlyPlayed.items = action.payload?.data?.items;
      state.recentlyPlayed.total = action.payload?.data?.total;
    },
    fetchRecentlyPlayedFailed: (state, action) => {
      state.loadingRecently = false;
      state.fetchRecentlyError = action.payload?.errorMessage;
    },
    loadMoreRecently: state => {
      state.loadingLoadMoreRecentlyRequest = true;
    },
    loadMoreRecentlySucceed: (state, action) => {
      state.loadingLoadMoreRecentlyRequest = false;
      state.recentlyPlayed.items = [
        ...state.recentlyPlayed.items,
        ...action.payload?.data?.items,
      ];
      state.loadMoreRecentlyOffset =
        action.payload?.data?.items?.length > 0
          ? state.loadMoreRecentlyOffset + 10
          : state.loadMoreRecentlyOffset;
    },
    loadMoreRecentlyFailed: (state, action) => {
      state.loadingLoadMoreRecentlyRequest = false;
      state.loadMoreFriendRequestError = action.payload?.errorMessage;
    },
    fetchRecentlyOtherPlayed: state => {
      state.loadingRecentlyOther = true;
      state.loadMoreRecentlyOtherOffset = 0;
    },
    fetchRecentlyPlayedOtherSucceed: (state, action) => {
      state.loadingRecentlyOther = false;
      state.recentlyPlayedOther.items = action.payload?.data?.items;
      state.recentlyPlayedOther.total = action.payload?.data?.total;
    },
    fetchRecentlyPlayedOtherFailed: (state, action) => {
      state.loadingRecentlyOther = false;
      state.fetchRecentlyOtherError = action.payload?.errorMessage;
    },
    loadMoreRecentlyOther: state => {
      state.loadingLoadMoreRecentlyOther = true;
    },
    loadMoreRecentlyOtherSucceed: (state, action) => {
      state.loadingLoadMoreRecentlyOther = false;
      state.recentlyPlayedOther.items = [
        ...state.recentlyPlayedOther.items,
        ...action.payload?.data?.items,
      ];
      state.loadMoreRecentlyOtherOffset =
        action.payload?.data?.items?.length > 0
          ? state.loadMoreRecentlyOtherOffset + 10
          : state.loadMoreRecentlyOtherOffset;
    },
    loadMoreRecentlyOtherFailed: (state, action) => {
      state.loadingLoadMoreRecentlyOther = false;
      state.loadMoreRecentlyOtherError = action.payload?.errorMessage;
    },
    fetchFavorite: state => {
      state.loadingFavorite = true;
      state.loadMoreFavoriteOffset = 0;
    },
    fetchFavoriteSucceed: (state, action) => {
      state.loadingFavorite = false;
      state.favorite.items = action.payload?.data?.items;
      state.favorite.total = action.payload?.data?.total;
    },
    fetchFavoriteFailed: (state, action) => {
      state.loadingFavorite = false;
      state.fetchFavoriteError = action.payload?.errorMessage;
    },
    loadMoreFavorite: state => {
      state.loadingLoadMoreFavorite = true;
    },
    loadMoreFavoriteSucceed: (state, action) => {
      state.loadingLoadMoreFavorite = false;
      state.favorite.items = [
        ...state.favorite.items,
        ...action.payload?.data?.items,
      ];
      state.loadMoreFavoriteOffset =
        action.payload?.data?.items?.length > 0
          ? state.loadMoreFavoriteOffset + 10
          : state.loadMoreFavoriteOffset;
    },
    loadMoreFavoriteFailed: (state, action) => {
      state.loadingLoadMoreFavorite = false;
      state.loadMoreFavoriteError = action.payload?.errorMessage;
    },
    fetchFavoriteOther: state => {
      state.loadingFavoriteOther = true;
      state.loadMoreFavoriteOtherOffset = 0;
    },
    fetchFavoriteOtherSucceed: (state, action) => {
      state.loadingFavoriteOther = false;
      state.favoriteOther.items = action.payload?.data?.items;
      state.favoriteOther.total = action.payload?.data?.total;
    },
    fetchFavoriteOtherFailed: (state, action) => {
      state.loadingFavoriteOther = false;
      state.fetchFavoriteOtherError = action.payload?.errorMessage;
    },
    loadMoreFavoriteOther: state => {
      state.loadingLoadMoreFavoriteOther = true;
    },
    loadMoreFavoriteOtherSucceed: (state, action) => {
      state.loadingLoadMoreFavoriteOther = false;
      state.favoriteOther.items = [
        ...state.favoriteOther.items,
        ...action.payload?.data?.items,
      ];
      state.loadMoreFavoriteOtherOffset =
        action.payload?.data?.items?.length > 0
          ? state.loadMoreFavoriteOffset + 10
          : state.loadMoreFavoriteOffset;
    },
    loadMoreFavoriteOtherFailed: (state, action) => {
      state.loadingLoadMoreFavoriteOther = false;
      state.loadMoreFavoriteOtherError = action.payload?.errorMessage;
    },
  },
});

const { actions, reducer } = profileSlice;

export const {
  fetchProfileOther,
  fetchProfileOtherSucceed,
  fetchProfileOtherFailed,
  fetchFriendRequest,
  fetchFriendRequestSucceed,
  fetchFriendRequestFailed,
  acceptFriend,
  acceptFriendSucceed,
  acceptFriendFailed,
  declineFriend,
  declineFriendSucceed,
  declineFriendFailed,
  loadMoreFriendRequest,
  loadMoreFriendRequestSucceed,
  loadMoreFriendRequestFailed,
  fetchRecentlyPlayed,
  fetchRecentlyPlayedSucceed,
  fetchRecentlyPlayedFailed,
  loadMoreRecently,
  loadMoreRecentlySucceed,
  loadMoreRecentlyFailed,
  fetchRecentlyOtherPlayed,
  fetchRecentlyPlayedOtherSucceed,
  fetchRecentlyPlayedOtherFailed,
  loadMoreRecentlyOther,
  loadMoreRecentlyOtherSucceed,
  loadMoreRecentlyOtherFailed,
  fetchFavorite,
  fetchFavoriteSucceed,
  fetchFavoriteFailed,
  loadMoreFavorite,
  loadMoreFavoriteSucceed,
  loadMoreFavoriteFailed,
  fetchFavoriteOther,
  fetchFavoriteOtherSucceed,
  fetchFavoriteOtherFailed,
  loadMoreFavoriteOther,
  loadMoreFavoriteOtherSucceed,
  loadMoreFavoriteOtherFailed,
} = actions;

export default reducer;
