import { put, call, takeEvery } from 'redux-saga/effects';
import {
  preUploadFile,
  preUploadFileFailed,
  preUploadFileSuccessed,
} from './slice';
import { preUploadFileApi } from './services';

function* preUploadFileSideEffect({ payload }) {
  try {
    const response = yield call(preUploadFileApi, payload.data);
    yield put(preUploadFileSuccessed(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(preUploadFileFailed(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* authSaga() {
  yield takeEvery(preUploadFile.type, preUploadFileSideEffect);
}
