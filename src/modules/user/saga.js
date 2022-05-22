import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";
import {
  fetchProfile,
  fetchProfileSucceeded,
  fetchProfileFailed,
  followFriend,
  followFriendFailed,
  followFriendSuccecced,
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
} from "./slice";

import {
  fetchProfileApi,
  acceptRequestFriendApi,
  cancelRequestFriendApi,
  updateFcmTokenApi,
  fetchFriendListApi,
  loadmoreFriendListApi,
  favouriteHostApi,
  followFriendApi,
  addFriendApi,
  fetchUserApi,
  loadmoreFetchUserApi,
  updateProfileApi,
  fetchNotiSettingApi,
  updateNotiSettingApi,
  contactUsApi,
} from "./services";
import { LIMIT_USER } from "@common/constant";
import { friendListOffsetSelector, usersOffsetSelector } from "./selectors";
import reactotron from "reactotron-react-native";

function* fetchProfileSideEffect() {
  try {
    const response = yield call(fetchProfileApi);
    yield put(fetchProfileSucceeded(response));
  } catch (error) {
    yield put(fetchProfileFailed(error));
  }
}

function* followFriendSideEffect({ payload }) {
  try {
    const response = yield call(followFriendApi, payload.data);
    yield put(followFriendSuccecced(response));
    if (payload.data.roomId) {
    } else if (payload.data.userType) {
      yield put(
        fetchUser({
          data: {
            keyword: payload.data.valueSearch,
            type: payload.data.userType,
          },
        })
      );
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(followFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* addFriendSideEffect({ payload }) {
  try {
    const response = yield call(addFriendApi, payload.data);
    yield put(addFriendSuccecced({ ...response, payload }));
    if (payload.data.userType) {
      yield put(
        fetchUser({
          data: {
            keyword: payload.data.valueSearch,
            type: payload.data.userType,
          },
        })
      );
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(addFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}
function* acceptRequestFriendSideEffect({ payload }) {
  try {
    const response = yield call(acceptRequestFriendApi, payload.data);
    yield put(acceptRequestFriendSucceeded(payload.data));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(acceptRequestFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* cancelRequestFriendSideEffect({ payload }) {
  try {
    const response = yield call(cancelRequestFriendApi, payload.data);
    yield put(cancelRequestFriendSucceeded(payload.data));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(cancelRequestFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* favouriteHostSideEffect({ payload }) {
  try {
    const response = yield call(favouriteHostApi, payload.data);
    yield put(favouriteHostSuccecced(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(favouriteHostFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateFcmTokenSideEffect({ payload }) {
  try {
    yield call(updateFcmTokenApi, payload.data);
  } catch (error) {
    console.log(error);
  }
}

function* fetchFriendListSideEffect({ payload }) {
  try {
    const response = yield call(fetchFriendListApi, payload.data);
    yield put(fetchFriendListSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchFriendListFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadmoreFriendListSideEffect({ payload }) {
  try {
    const offset = yield select(friendListOffsetSelector);
    const response = yield call(loadmoreFriendListApi, {
      ...payload.data,
      offset: offset + 10,
    });
    yield put(loadmoreFriendListSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadmoreFriendListFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}
function* fetchUserSideEffect({ payload }) {
  try {
    const response = yield call(fetchUserApi, payload.data);
    yield put(fetchUserSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchUserFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadmoreFetchUserSideEffect({ payload }) {
  try {
    const offset = yield select(usersOffsetSelector);
    const response = yield call(loadmoreFetchUserApi, {
      ...payload.data,
      offset: offset + LIMIT_USER,
    });
    yield put(loadmoreUsersSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadmoreUsesFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateProfileSideEffect({ payload }) {
  try {
    console.log({payload})
    const response = yield call(updateProfileApi, payload.data);
    yield put(updateProfileSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(updateProfileFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchNotiSettingSideEffect({ payload }) {
  try {
    const response = yield call(fetchNotiSettingApi);
    yield put(fetchNotifiSettingSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchNotiSettingFailed(error));
  }
}

function* updateNotiSettingSideEffect({ payload }) {
  try {
    const response = yield call(updateNotiSettingApi, payload);
    yield put(updateNotifiSettingSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updateNotiSettingFailed(error));
  }
}

function* contactUsSideEffect({ payload }) {
  try {
    const response = yield call(contactUsApi, payload.data);
    yield put(contactUsSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(contactUsFailed(error));
  }
}

export default function* userSaga() {
  yield takeEvery(fetchProfile.type, fetchProfileSideEffect);
  yield takeEvery(followFriend.type, followFriendSideEffect);
  yield takeEvery(addFriend.type, addFriendSideEffect);
  yield takeEvery(favouriteHost.type, favouriteHostSideEffect);
  yield takeEvery(acceptRequestFriend.type, acceptRequestFriendSideEffect);
  yield takeEvery(cancelRequestFriend.type, cancelRequestFriendSideEffect);
  yield takeEvery(updateFcmToken.type, updateFcmTokenSideEffect);
  yield takeEvery(fetchFriendList.type, fetchFriendListSideEffect);
  yield takeEvery(loadmoreFriendList.type, loadmoreFriendListSideEffect);
  yield takeLatest(fetchUser.type, fetchUserSideEffect);
  yield takeLatest(loadmoreUsers.type, loadmoreFetchUserSideEffect);
  yield takeLatest(updateProfile.type, updateProfileSideEffect);
  yield takeLatest(fetchNotifiSetting.type, fetchNotiSettingSideEffect);
  yield takeLatest(updateNotifiSetting.type, updateNotiSettingSideEffect);
  yield takeLatest(contactUs.type, contactUsSideEffect);
}
