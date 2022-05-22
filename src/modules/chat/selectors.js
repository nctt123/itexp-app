import { createSelector } from "reselect";

const chatSelector = (state) => state.chat;

export const loadingFetchMessageSelector = createSelector(
  chatSelector,
  (chatReducer) => chatReducer.loadingFetchMessenger
);

export const messengerSelector = createSelector(
  chatSelector,
  (chatReducer) => chatReducer.messenger
);

export const sendMessageLoadingSelector = createSelector(
  chatSelector,
  (chatReducer) => chatReducer.sendMessageLoading
);

export const messageListSelector = createSelector(
  chatSelector,
  (chatReducer) => chatReducer.messageList
);

export const fetchMessageListLoadingSelector = createSelector(
  chatSelector,
  (chatReducer) => chatReducer.fetchMessageListLoading
);
