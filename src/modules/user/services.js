import { baseApi } from '@common/baseApi';
import { LIMIT_USER } from '@common/constant';

const LIMIT_FRIEND_LIST = 10;

export function fetchProfileApi() {
  return baseApi.get('/user/profile');
}

export function fetchProfileOtherApi({ userId }) {
  return baseApi.get('/user/profile', { userId });
}

export function followFriendApi({ userId }) {
  return baseApi.post('/friend/follow', {
    userId,
  });
}

export function addFriendApi({ userId, type }) {
  return baseApi.post('/friend', {
    userId,
    type,
  });
}

export function favouriteHostApi({ roomId }) {
  return baseApi.put(`/host/${roomId}/favourite`, {
    roomId,
  });
}
export function acceptRequestFriendApi({ requestId, notificationId }) {
  return baseApi.put(`/friend/${requestId}/accept`, {
    notificationId,
  });
}

export function cancelRequestFriendApi({ requestId, notificationId }) {
  return baseApi.put(`/friend/${requestId}/decline`, {
    notificationId,
  });
}

export function updateFcmTokenApi({ fcmToken, platform }) {
  return baseApi.post('/user/device', {
    token: fcmToken,
    platform,
  });
}
export function deleteFcmTokenApi() {
  return baseApi.delete('/user/device');
}

export function fetchFriendListApi({ userId, keyword = '', type }) {
  return baseApi.get('/friend', {
    type,
    userId,
    keyword,
    offset: 0,
    limit: LIMIT_FRIEND_LIST,
  });
}

export function loadmoreFriendListApi({ userId, keyword = '', offset, type }) {
  return baseApi.get('/friend', {
    type,
    userId,
    keyword,
    offset,
    limit: LIMIT_FRIEND_LIST,
  });
}

export function fetchUserApi({ keyword = '', type, offset = 0 }) {
  return baseApi.get('/user/', {
    keyword,
    type,
    limit: LIMIT_USER,
    offset,
  });
}

export function loadmoreFetchUserApi({ offset, type, keyword }) {
  return baseApi.get('/user/', {
    keyword,
    offset,
    type,
    limit: LIMIT_USER,
  });
}

export function updateProfileApi({ name, avatar, description, birthday }) {

  return baseApi.postFormData('/user/profile', {
    name,
    image: avatar,
    description,
    birthday
  });
}

export function fetchNotiSettingApi() {
  return baseApi.get('/user/notification-setting');
}

export function updateNotiSettingApi(data) {
  return baseApi.put('/user/notification-setting', data);
}

export function contactUsApi(data) {
  return baseApi.post('/contactUs', {
    data,
  });
}
