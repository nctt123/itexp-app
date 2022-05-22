/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import reactotron from "reactotron-react-native";

const initialState = {
  messenger: {
    items: [],
    total: 0,
  },
  loadingFetchMessenger: false,
  sendMessageLoading: false,
  messageList: [],
  fetchMessageListLoading: false,
  messageLastId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchMessenger: (state) => {
      state.loadingFetchMessenger = true;
    },
    fetchMessengerSucceed: (state, action) => {
      state.loadingFetchMessenger = false;
      state.messenger.items = action.payload?.items || [];
    },
    fetchMessengerFailed: (state) => {
      state.loadingFetchMessenger = false;
    },
    sendMessage: (state) => {
      state.sendMessageLoading = false;
    },
    sendMessageSucceeded: (state) => {
      state.sendMessageLoading = false;
    },
    sendMessageFailed: (state, action) => {
      state.sendMessageLoading = false;
    },
    pushMessageToList: (state, action) => {
      state.messageList = [action.payload.message].concat(state.messageList);
    },
    fetchMessageList: (state) => {
      state.fetchMessageListLoading = true;
    },
    fetchMessageListSucceeded: (state, action) => {
      state.fetchMessageListLoading = false;
      state.messageLastId = action.payload?.data[0]?.id || "";
      state.messageList = action.payload?.data.reverse() || [];
    },
    fetchMessageListFailed: (state, action) => {
      state.fetchMessageListLoading = false;
      state.fetchMessageListError = action.payload.errorMessage;
    },
  },
});

const { actions, reducer } = chatSlice;

export const {
  fetchMessenger,
  fetchMessengerSucceed,
  fetchMessengerFailed,
  sendMessage,
  sendMessageSucceeded,
  sendMessageFailed,
  pushMessageToList,
  fetchMessageListSucceeded,
  fetchMessageListFailed,
  fetchMessageList,
} = actions;

export default reducer;
