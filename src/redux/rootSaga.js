import { all } from "redux-saga/effects";
import userSaga from "@modules/user/saga";
import authSaga from "@modules/auth/saga";
import chatSaga from "@modules/chat/saga";
import uploadFileSaga from "@modules/uploadFile/saga";
import notificationSaga from "@modules/notification/saga";
import profileSaga from "@modules/profile/saga";
import homeSaga from "@modules/home/saga";

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    chatSaga(),
    uploadFileSaga(),
    notificationSaga(),
    profileSaga(),
    homeSaga(),
  ]);
}
export default rootSaga;
