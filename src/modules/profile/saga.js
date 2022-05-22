import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  loadMoreFriendRequestOffsetSelector,
  loadMoreRecentlyOffsetSelector,
  loadMoreRecentlyOtherOffsetSelector,
} from './selectors';

import {
  acceptFriendApi,
  declineFriendApi,
  fetchFavoriteApi,
  fetchFavoriteOtherApi,
  fetchFriendRequestsApi,
  fetchProfileApiOther,
  fetchRecentlyPlayedApi,
  fetchRecentlyPlayedOtherApi,
} from './services';
import {
  acceptFriend,
  acceptFriendFailed,
  acceptFriendSucceed,
  declineFriend,
  declineFriendFailed,
  declineFriendSucceed,
  fetchFavorite,
  fetchFavoriteFailed,
  fetchFavoriteOther,
  fetchFavoriteOtherFailed,
  fetchFavoriteOtherSucceed,
  fetchFavoriteSucceed,
  fetchFriendRequest,
  fetchFriendRequestFailed,
  fetchFriendRequestSucceed,
  fetchProfileOther,
  fetchProfileOtherFailed,
  fetchProfileOtherSucceed,
  fetchRecentlyOtherPlayed,
  fetchRecentlyPlayed,
  fetchRecentlyPlayedFailed,
  fetchRecentlyPlayedOtherFailed,
  fetchRecentlyPlayedOtherSucceed,
  fetchRecentlyPlayedSucceed,
  loadMoreFavorite,
  loadMoreFavoriteFailed,
  loadMoreFavoriteOther,
  loadMoreFavoriteOtherFailed,
  loadMoreFavoriteOtherSucceed,
  loadMoreFavoriteSucceed,
  loadMoreFriendRequest,
  loadMoreFriendRequestFailed,
  loadMoreFriendRequestSucceed,
  loadMoreRecently,
  loadMoreRecentlyFailed,
  loadMoreRecentlyOther,
  loadMoreRecentlyOtherFailed,
  loadMoreRecentlyOtherSucceed,
  loadMoreRecentlySucceed,
} from './slice';

function* fetchProfileOtherSideEffect({ payload }) {
  try {
    const response = yield call(fetchProfileApiOther, payload.data);
    yield put(fetchProfileOtherSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchProfileOtherFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchFriendRequestSideEffect({ payload }) {
  try {
    const response = yield call(fetchFriendRequestsApi, payload.data);
    yield put(fetchFriendRequestSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchFriendRequestFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* addFriendSideEffect({ payload }) {
  try {
    yield call(acceptFriendApi, payload.data);
    yield put(acceptFriendSucceed(payload));
  } catch (error) {
    yield put(acceptFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* declineFriendSideEffect({ payload }) {
  try {
    yield call(declineFriendApi, payload.data);
    yield put(declineFriendSucceed(payload));
  } catch (error) {
    yield put(declineFriendFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadMoreFriendRequestSideEffect({ payload }) {
  try {
    const offset = yield select(loadMoreFriendRequestOffsetSelector);
    const data = {
      ...payload?.data,
      offset: offset + 10,
    };
    const response = yield call(fetchFriendRequestsApi, data);
    yield put(loadMoreFriendRequestSucceed(response));

    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadMoreFriendRequestFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchRecentlySideEffect({ payload }) {
  try {
    const response = yield call(fetchRecentlyPlayedApi, payload.data);
    yield put(fetchRecentlyPlayedSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchRecentlyPlayedFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadMoreRecentlySideEffect({ payload }) {
  try {
    const offset = yield select(loadMoreRecentlyOffsetSelector);
    const data = {
      ...payload?.data,
      offset: offset + 10,
    };
    const response = yield call(fetchRecentlyPlayedApi, data);
    yield put(loadMoreRecentlySucceed(response));

    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadMoreRecentlyFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchRecentlySideOtherEffect({ payload }) {
  try {
    const response = yield call(fetchRecentlyPlayedOtherApi, payload.data);
    yield put(fetchRecentlyPlayedOtherSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchRecentlyPlayedOtherFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadMoreRecentlyOtherSideEffect({ payload }) {
  try {
    const offset = yield select(loadMoreRecentlyOtherOffsetSelector);
    const data = {
      ...payload?.data,
      offset: offset + 10,
    };
    const response = yield call(fetchRecentlyPlayedOtherApi, data);
    yield put(loadMoreRecentlyOtherSucceed(response));

    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadMoreRecentlyOtherFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchFavoriteSideEffect({ payload }) {
  try {
    const response = yield call(fetchFavoriteApi, payload.data);
    yield put(fetchFavoriteSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchFavoriteFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadMoreFavoriteSideEffect({ payload }) {
  try {
    const offset = yield select(loadMoreRecentlyOtherOffsetSelector);
    const data = {
      ...payload?.data,
      offset: offset + 10,
    };
    const response = yield call(fetchFavoriteApi, data);
    yield put(loadMoreFavoriteSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadMoreFavoriteFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}
function* fetchFavoriteOtherSideEffect({ payload }) {
  try {
    const response = yield call(fetchFavoriteOtherApi, payload.data);
    yield put(fetchFavoriteOtherSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchFavoriteOtherFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadMoreFavoriteOtherSideEffect({ payload }) {
  try {
    const offset = yield select(loadMoreRecentlyOtherOffsetSelector);
    const data = {
      ...payload?.data,
      offset: offset + 10,
    };
    const response = yield call(fetchFavoriteOtherApi, data);
    yield put(loadMoreFavoriteOtherSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadMoreFavoriteOtherFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* profileSaga() {
  yield takeEvery(fetchProfileOther.type, fetchProfileOtherSideEffect);
  yield takeEvery(fetchFriendRequest.type, fetchFriendRequestSideEffect);
  yield takeEvery(acceptFriend.type, addFriendSideEffect);
  yield takeEvery(declineFriend.type, declineFriendSideEffect);
  yield takeEvery(loadMoreFriendRequest.type, loadMoreFriendRequestSideEffect);
  yield takeEvery(fetchRecentlyPlayed.type, fetchRecentlySideEffect);
  yield takeEvery(loadMoreRecently.type, loadMoreRecentlySideEffect);
  yield takeEvery(fetchRecentlyOtherPlayed.type, fetchRecentlySideOtherEffect);
  yield takeEvery(loadMoreRecentlyOther.type, loadMoreRecentlyOtherSideEffect);
  yield takeEvery(loadMoreFavorite.type, loadMoreFavoriteSideEffect);
  yield takeEvery(fetchFavorite.type, fetchFavoriteSideEffect);
  yield takeEvery(fetchFavoriteOther.type, fetchFavoriteOtherSideEffect);
  yield takeEvery(loadMoreFavoriteOther.type, loadMoreFavoriteOtherSideEffect);
}
