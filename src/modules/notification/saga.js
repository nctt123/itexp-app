import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  fetchNotifications,
  fetchNotificationsSucceeded,
  fetchNotificationsFailed,
  loadmoreNotifications,
  loadmoreNotificationsSucceeded,
  loadmoreNotificationsFailed,
  fetchTotalUnReadNotification,
  fetchTotalUnReadNotificationSucceeded,
  fetchTotalUnReadNotificationFailed,
  readNotification,
  readNotificationSucceeded,
  readNotificationFailed,
} from './slice';

import {
  fetchNotificationsApi,
  loadmoreNotificationsApi,
  fetchTotalUnReadNotificationApi,
  readNotificationApi,
} from './services';
import { notificationsOffsetSelector } from './selectors';

function* fetchNotificationsSideEffect() {
  try {
    const response = yield call(fetchNotificationsApi);
    yield put(fetchNotificationsSucceeded(response));
  } catch (error) {
    yield put(fetchNotificationsFailed(error));
  }
}

function* loadmoreNotificationsSideEffect() {
  try {
    const offset = yield select(notificationsOffsetSelector);
    const response = yield call(loadmoreNotificationsApi, {
      offset: offset + 10,
    });
    yield put(loadmoreNotificationsSucceeded(response));
  } catch (error) {
    yield put(loadmoreNotificationsFailed(error));
  }
}

function* fetchTotalUnReadNotificationSideEffect() {
  try {
    const response = yield call(fetchTotalUnReadNotificationApi);
    yield put(fetchTotalUnReadNotificationSucceeded(response));
  } catch (error) {
    yield put(fetchTotalUnReadNotificationFailed(error));
  }
}

function* readNotificationSideEffect({ payload }) {
  try {
    const response = yield call(readNotificationApi, payload.data);
    yield put(readNotificationSucceeded(response));
  } catch (error) {
    yield put(readNotificationFailed(error));
  }
}

export default function* notificationSaga() {
  yield takeEvery(fetchNotifications.type, fetchNotificationsSideEffect);
  yield takeEvery(loadmoreNotifications.type, loadmoreNotificationsSideEffect);
  yield takeEvery(
    fetchTotalUnReadNotification.type,
    fetchTotalUnReadNotificationSideEffect,
  );
  yield takeEvery(readNotification.type, readNotificationSideEffect);
}
