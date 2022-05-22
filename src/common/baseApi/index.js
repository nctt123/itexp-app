/* eslint-disable prefer-promise-reject-errors */
import _ from "lodash";
import APISauce, { NETWORK_ERROR, TIMEOUT_ERROR } from "apisauce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { signOut } from "@modules/auth/slice";
import Toast from "react-native-toast-message";
import { store } from "../../redux/configStore";

import {
  TIME_OUT_REQUEST_API,
  HOST_DEV,
  STATUS_HTTPS,
  DEFAULT_MODE,
} from "../config";
import reactotron from "reactotron-react-native";
import { Platform } from "react-native";

let HEADERS = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json;charset=utf-8",
};

let HEADERS_MULTIPLE_PART = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "multipart/form-data",
};

const setToken = (_token) => {
  HEADERS = {
    ...HEADERS,
    Authorization: `Bearer ${_token}`,
  };
  HEADERS_MULTIPLE_PART = {
    ...HEADERS_MULTIPLE_PART,
    Authorization: `Bearer ${_token}`,
  };
};

const getBaseURLWithMode = async () => {
  let baseUrl = `${HOST_DEV[DEFAULT_MODE]}`;
  try {
    const mode = await AsyncStorage.getItem("mode");
    if (mode) {
      baseUrl = `${HOST_DEV[mode]}`;
    }
  } catch (e) {
    console.log(e);
  }
  if (Platform.OS == "ios") {
    return "http://10.0.2.2:3000";
  }
  return "http://10.0.2.2:3000";
};

export const apiGlobal = APISauce.create({
  timeout: TIME_OUT_REQUEST_API,
  headers: HEADERS,
});

const throttledResetToLogin = async (response) => {
  console.log(response);
  store.dispatch(signOut());
};

const showToastError = () => {
  Toast.show({
    type: "error",
    props: {
      message: i18next.t("message:MSG_35"),
      onClose: () => Toast.hide(),
    },
  });
};

const handlingResponse = (response) =>
  // console.log({response});
  new Promise((resolve, reject) => {
    if (response.status === STATUS_HTTPS.UNAUTHENTICATED) {
      return throttledResetToLogin(response);
    }
    if (
      response.status >= STATUS_HTTPS.GREATER_RANGE_SUCCESS &&
      response.status < STATUS_HTTPS.SMALLER_RANGE_SUCCESS
    ) {
      return resolve(response.data);
    }

    switch (response.problem) {
      case TIMEOUT_ERROR:
        reject({});
        return showToastError();
      case NETWORK_ERROR:
        reject({});
        return showToastError();
      default: {
        console.log("****Error", response.data.meta);
        const error = {
          errorMessage: "",
        };
        const extraInfo = response?.data?.meta?.extraInfo;
        const errorCode = response?.data?.meta?.errorCode;
        if (extraInfo?.field) {
          error.errorMessage = i18next.t(`message:${errorCode}`, {
            field: i18next.t(`common:${extraInfo.field}`),
          });
        } else if (extraInfo?.key) {
          error.errorMessage = i18next.t(`message:${errorCode}`, {
            playlistName: extraInfo.key,
          });
        } else {
          error.errorMessage =
            i18next.t(`message:${response?.data?.meta?.errorCode}`) ||
            response?.data?.meta?.errorCode ||
            "";
        }
        return reject(error);
      }
    }
  });
const baseApi = {
  post: async (endpoint, params) => {
    const baseURL = await getBaseURLWithMode();
    console.log("*****POST", `${baseURL}${endpoint}`, params);
    apiGlobal.setBaseURL(baseURL);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal
      .post(endpoint, params)
      .then((response) => handlingResponse(response));
  },
  get: async (endpoint, params) => {
    const baseURL = await getBaseURLWithMode();
    console.log("*****GET", `${baseURL}${endpoint}`, params);
    apiGlobal.setBaseURL(baseURL);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal
      .get(endpoint, params)
      .then((response) => handlingResponse(response));
  },
  put: async (endpoint, params) => {
    const baseURL = await getBaseURLWithMode();
    console.log("*****PUT", `${baseURL}${endpoint}`, params);
    apiGlobal.setBaseURL(baseURL);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal
      .put(endpoint, params)
      .then((response) => handlingResponse(response));
  },
  postFormData: async (endpoint, params) => {
    const baseURL = await getBaseURLWithMode();
    console.log("******POST_FORM_DATA", `${baseURL}${endpoint}`, params);
    apiGlobal.setBaseURL(baseURL);
    apiGlobal.setHeaders(HEADERS_MULTIPLE_PART);
    const formData = new FormData();
    _.forIn(params, (value, key) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return apiGlobal
      .post(endpoint, formData)
      .then((response) => handlingResponse(response));
  },
  delete: async (endpoint, params) => {
    const baseURL = await getBaseURLWithMode();
    console.log("******DELETE", `${baseURL}${endpoint}`, params);
    apiGlobal.setBaseURL(baseURL);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal
      .delete(endpoint, {}, { data: params })
      .then((response) => handlingResponse(response));
  },
};

export { baseApi, setToken, getBaseURLWithMode };
