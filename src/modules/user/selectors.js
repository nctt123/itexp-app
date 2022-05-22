import { createSelector } from 'reselect';

const userSelector = state => state.user;

export const profileSelector = createSelector(
  userSelector,
  userReducer => userReducer.profile,
);

export const followFriendSelector = createSelector(
  userSelector,
  userReducer => userReducer.followFriendLoading,
);

export const addFriendSelector = createSelector(
  userSelector,
  userReducer => userReducer.addFriendLoading,
);
export const favouriteHostSelector = createSelector(
  userSelector,
  userReducer => userReducer.favouriteHostLoading,
);

export const accecptRequestFriendLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.acceptRequestFriendLoading,
);

export const acceptRequestFriendErrorSelector = createSelector(
  userSelector,
  userReducer => userReducer.acceptRequestFriendError,
);

export const cancelRequestFriendLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.acceptRequestFriendLoading,
);

export const cancelRequestFriendErrorSelector = createSelector(
  userSelector,
  userReducer => userReducer.cancelRequestFriendError,
);

export const friendListSelector = createSelector(
  userSelector,
  userReducer => userReducer.friendList,
);

export const fetchFriendListLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.fetchFriendListLoading,
);

export const fetchFriendListErrorSelector = createSelector(
  userSelector,
  userReducer => userReducer.fetchFriendListError,
);

export const friendListOffsetSelector = createSelector(
  userSelector,
  userReducer => userReducer.FriendListOffset,
);

export const loadmoreFriendListLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.loadmoreFriendListLoading,
);

export const loadmoreFriendListErrorSelector = createSelector(
  userSelector,
  userReducer => userReducer.loadmoreFriendListError,
);

export const loadMoreFriendListNoMoreSelector = createSelector(
  userSelector,
  userReducer => userReducer.loadMoreFriendListNoMore,
);
export const fetchUserSelector = createSelector(
  userSelector,
  userReducer => userReducer.listUser,
);

export const fetchUserLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.fetchUserLoading,
);

export const loadmoreFetchUserNoMoreSelector = createSelector(
  userSelector,
  userReducer => userReducer.loadmoreUsersNoMore,
);

export const loadmoreFetchUserLoadingSelector = createSelector(
  userSelector,
  userReducer => userReducer.loadmoreUsersLoading,
);

export const usersOffsetSelector = createSelector(
  userSelector,
  userReducer => userReducer.usersOffset,
);

export const loadingUpdateProfileSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.loadingUpdateProfile,
);
export const notiSettingLoadingSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.notiSettingLoading,
);
export const notiSettingSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.notiSetting,
);

export const popularUsersSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.popularUsers,
);
export const winnerOfWeeksUsersSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.winnerOfWeeksUsers,
);
export const winnerUsersSelector = createSelector(
  userSelector,
  profileSelector => profileSelector.winnerUsers,
);
