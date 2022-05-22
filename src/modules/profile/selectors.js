import { createSelector } from 'reselect';

const profileSelector = state => state.profile;

export const LIMIT_FRIEND_REQUEST = 10;

export const profileOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.profileOther,
);

export const loadingFetchProfileSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingFetchProfileOther,
);

export const friendRequestSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.friendRequests,
);

export const loadingFetchFriendRequestSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingFetchFriendRequest,
);

export const loadMoreFriendRequestOffsetSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadMoreFriendRequestOffset,
);

export const loadingLoadMoreFriendRequestSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingLoadMoreFriendRequest,
);

export const loadingLoadMoreRecentlySelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingLoadMoreRecentlyRequest,
);

export const loadingRecentlySelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingRecently,
);

export const fetchRecentlySelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.recentlyPlayed,
);

export const loadMoreRecentlyOffsetSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadMoreRecentlyOffset,
);

export const loadingLoadMoreRecentlyOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingLoadMoreRecentlyOther,
);

export const loadingRecentlyOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingRecentlyOther,
);

export const fetchRecentlyOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.recentlyPlayedOther,
);

export const loadMoreRecentlyOtherOffsetSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadMoreRecentlyOtherOffset,
);

export const loadingLoadMoreFavoriteSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingLoadMoreFavorite,
);

export const loadingFavoriteSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingFavorite,
);

export const fetchFavoriteSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.favorite,
);

export const loadMoreFavoriteOffsetSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadMoreFavoriteOtherOffset,
);

export const loadingLoadMoreFavoriteOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingLoadMoreFavoriteOther,
);

export const loadingFavoriteOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadingFavoriteOther,
);

export const fetchFavoriteOtherSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.favoriteOther,
);

export const loadMoreFavoriteOtherOffsetSelector = createSelector(
  profileSelector,
  profileSelector => profileSelector.loadMoreFavoriteOtherOffset,
);
