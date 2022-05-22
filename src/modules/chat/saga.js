import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";
import { fetchMessageApi, fetchMessagesApi, sendMessageApi } from "./services";
import {
  fetchMessageListFailed,
  fetchMessageListSucceeded,
  fetchMessenger,
  fetchMessengerFailed,
  fetchMessengerSucceed,
  sendMessage,
  sendMessageFailed,
  sendMessageSucceeded,
  fetchMessageList,
} from "./slice";

function* fetchMessageSideEffect({ payload }) {
  try {
    const response = yield call(fetchMessageApi, payload.data);
    yield put(fetchMessengerSucceed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchMessengerFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* sendMessageSideEffect({ payload }) {
  try {
    const response = yield call(sendMessageApi, payload.data);
    yield put(sendMessageSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(sendMessageFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchMessageListSideEffect({ payload }) {
  try {
    const response = yield call(fetchMessagesApi, payload.data);
    yield put(fetchMessageListSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchMessageListFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* chatSaga() {
  yield takeEvery(fetchMessenger.type, fetchMessageSideEffect);
  yield takeEvery(sendMessage.type, sendMessageSideEffect);
  yield takeEvery(fetchMessageList.type, fetchMessageListSideEffect);
}
