import { baseApi } from '@common/baseApi';
import { statusFriend } from '@common/constant';
const LIMIT_RECENTLY_PLAYED = 10;

export function fetchProfileApiOther({ userId }) {
  return baseApi.get('/user/profile', { userId });
}

export function loadMoreRecentlyPlayedOtherApi({ userId, offset }) {
  return baseApi.get('/user/rencently', {
    userId,
    offset,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function loadMoreRecentlyPlayedApi({ offset }) {
  return baseApi.get('/user/rencently', {
    offset,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function loadMoreJoinedApi({ offset }) {
  return baseApi.get('/room/joinedRoom', {
    offset,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function loadMoreJoinedOtherApi({ offset, userId }) {
  return baseApi.get('/room/joinedRoom', {
    userId,
    offset,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function fetchRecentlyPlayedApi(data) {
  return baseApi.get('/user/rencently', {
    offset: data?.offset || 0,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function fetchRecentlyPlayedOtherApi(data) {
  return baseApi.get('/user/rencently', {
    userId: data.userId,
    offset: data?.offset || 0,
    limit: LIMIT_RECENTLY_PLAYED,
  });
}

export function getJoinedRoomApi() {
  return baseApi.get('/room/joinedRoom', {
    limit: 10,
    offset: 0,
  });
}

export function getJoinedRooOtherApi({ userId }) {
  return baseApi.get('/room/joinedRoom', {
    limit: 10,
    offset: 0,
    userId,
  });
}

export function updateProfileApi({ avatar, name }) {
  return baseApi.put('/user/profile', {
    avatar,
    name,
  });
}

export function fetchFavoriteApi(data) {
  return baseApi.get('/song/favourite', {
    keyword: data?.keyword || '',
    limit: 10,
    offset: data?.offset || 0,
  });
}

export function fetchFavoriteOtherApi(data) {
  return baseApi.get('/song/favourite', {
    keyword: data?.keyword || '',
    limit: 10,
    offset: data?.offset || 0,
    userId: data.userId,
  });
}

export function loadMoreFavoriteApi(data) {
  return baseApi.get('/song/favourite', {
    keyword: data?.keyword ? data?.keyword : '',
    offset: data.offset,
    limit: 10,
  });
}

export function loadMoreFavoriteOtherApi(data) {
  return baseApi.get('/song/favourite', {
    keyword: data?.keyword || '',
    offset: data.offset,
    limit: 10,
    userId: data.userId,
  });
}

export function fetchFriendRequestsApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset || 0,
    limit: 10,
    type: 'PENDING',
  });
}

export function fetchFriendApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Friend,
  });
}

export function fetchFriendOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Friend,
    userId: data.userId,
  });
}

export function unFriendApi({ userId }) {
  return baseApi.delete('/friend', {
    userId,
  });
}

export function loadMoreFriendApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Friend,
  });
}

export function loadMoreFriendOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Friend,
    userId: data.userId,
  });
}

export function fetchFollowers(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Followers,
  });
}

export function fetchFollowersOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Followers,
    userId: data.userId,
  });
}

export function loadMoreFollowersApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Followers,
  });
}

export function loadMoreFollowersOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Followers,
    userId: data.userId,
  });
}

export function fetchFollowingOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Following,
    userId: data.userId,
  });
}

export function fetchFollowingApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: 0,
    limit: 10,
    type: statusFriend.Following,
  });
}

export function loadMoreFollowingApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Following,
  });
}

export function loadMoreFollowingOtherApi(data) {
  return baseApi.get('/friend', {
    keyword: data?.keyword || '',
    offset: data?.offset,
    limit: 10,
    type: statusFriend.Following,
    userId: data.userId,
  });
}

export function acceptFriendApi(data) {
  return baseApi.put(`/friend/${data?.requestId}/accept`);
}

export function declineFriendApi({ requestId }) {
  return baseApi.put(`/friend/${requestId}/decline`);
}

export function updatePasswordApi(oldPassword, newPassword) {
  return baseApi.put(`/user/password`, {
    oldPassword,
    newPassword,
  });
}
