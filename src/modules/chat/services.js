import { baseApi } from "@common/baseApi";

const LIMIT_MESSAGES = 10;
const LIMIT_MESSAGE_LIST = 100;

export function fetchMessageApi(data) {
  return baseApi.get(`/chat/message`, {
    offset: data?.offset || 0,
    limit: LIMIT_MESSAGES,
    keyword: data?.keyword || "",
  });
}

export function sendMessageApi({ content, receiverId }) {
  return baseApi.post("/chat/send", {
    content,
    receiverId,
  });
}

export function fetchMessagesApi({ receiverId, lastId = "" }) {
  return baseApi.get("/chat/history", {
    receiverId,
    lastId,
    limit: LIMIT_MESSAGE_LIST,
  });
}
