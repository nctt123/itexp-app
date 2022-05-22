import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@modules/user/slice";
import authReducer from "@modules/auth/slice";
import profileReducer from "@modules/profile/slice";
import uploadFileReducer from "@modules/uploadFile/slice";
import notificationReducer from "@modules/notification/slice";
import homeReducer from "@modules/home/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import chatReducer from "@modules/chat/slice";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token"],
};

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
  chat: chatReducer,
  uploadFile: uploadFileReducer,
  notification: notificationReducer,
  home: homeReducer,
  profile: profileReducer,
});

export default rootReducer;
