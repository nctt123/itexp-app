import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  signInWithEmail,
  signInWithEmailSucceeded,
  signInWithEmailFailed,
  signInWithFacebook,
  signInWithFacebookScceeded,
  signInWithFacebookFailed,
  signUpWithEmail,
  signUpWithEmailSucceeded,
  signUpWithEmailFailed,
  requestOtp,
  requestOtpSucceeded,
  requestOtpFailed,
  confirmOtp,
  confirmOtpSucceeded,
  confirmOtpFailed,
  setPassword,
  setPasswordSucceeded,
  setPasswordFailed,
} from './slice';

import {
  signInWithEmailApi,
  signUpWithEmailApi,
  requestOTPApi,
  confirmOTPApi,
  setPasswordApi,
} from './services';

function* signIpWithEmailSideEffect({ payload }) {
  try {
    const response = yield call(signInWithEmailApi, payload.data);
    console.log({response});
    yield put(signInWithEmailSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(signInWithEmailFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* signUpWithEmailSideEffect({ payload }) {
  try {
    const response = yield call(signUpWithEmailApi, payload.data);
    yield put(signUpWithEmailSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(signUpWithEmailFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* requestOTPSideEffect({ payload }) {
  try {
    yield call(requestOTPApi, payload.data);
    yield put(requestOtpSucceeded());
    if (payload.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(requestOtpFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* confirmOTPSideEffect({ payload }) {
  try {
    yield call(confirmOTPApi, payload.data);
    yield put(confirmOtpSucceeded());
    if (payload.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(confirmOtpFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* setPasswordSideEffect({ payload }) {
  try {
    yield call(setPasswordApi, payload.data);
    yield put(setPasswordSucceeded());
    if (payload.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(setPasswordFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* authSaga() {
  yield takeEvery(signInWithEmail.type, signIpWithEmailSideEffect);
  yield takeEvery(signUpWithEmail.type, signUpWithEmailSideEffect);
  yield takeEvery(requestOtp.type, requestOTPSideEffect);
  yield takeEvery(confirmOtp.type, confirmOTPSideEffect);
  yield takeEvery(setPassword.type, setPasswordSideEffect);
}
