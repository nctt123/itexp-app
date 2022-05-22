import { checkConnectSocket } from "@utils/SocketHelper";

export const JoinRoomSocket = (socketIo, roomId) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("JoinRoomSocket");
    socketIo.emit("joinRoom", roomId);
  }
};

export const updateRoomInfoSocket = (socketIo, cb) => {
  if (!socketIo) return;
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("updateRoomInfoSocket");
    socketIo.on("updateRoomInfo", (res) => cb(res));
  }
};

export const sendMessageSocket = (socketIo, message) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("sendMessageSocket", message);
    socketIo.emit("sendMessage", {
      receiverId: message.userId,
      content: message.content,
    });
  }
};

export const subscribeGetMessageSocket = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("getMessageSocket");
    socketIo.on("getMessage", (res) => cb(res));
  }
};

export const unSubscribeGetMessageSocket = (socketIo) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("unGetMessageSocket");
    socketIo.off("getMessage");
  }
};

export const leftRoomSocket = (socketIo, roomId) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log("leftRoomSocket");
    socketIo.emit("leaveRoom", roomId);
  }
};

export const subUpdateRoomInfoSocket = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.on("updateRoomInfo", (res) => {
      cb(res);
    });
  }
};

export const unSubUpdateRoomInfoSocket = (socketIo) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.off("updateRoomInfo");
  }
};

export const kickMemberSocket = (socketIo, roomId, userIds) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.emit("kickMembers", {
      roomId,
      userIds,
    });
  }
};

export const subForceLeaveSocket = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.on("forceLeaveRoom", (res) => {
      cb(res);
    });
  }
};

export const unSubForceLeaveSocket = (socketIo) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.off("forceLeaveRoom");
  }
};

export const subNotificationSocket = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.on("notification", (res) => {
      console.log("subNotificationSocket ", res);
      cb(res);
    });
  }
};

export const unSubNotificationSocket = (socketIo) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.off("notification");
  }
};

export const voteTourSocket = (socketIo, type) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.emit("voteSong", {
      type,
    });
  }
};

export const subUserJoinedRoom = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.on("userJoinedRoom", (res) => {
      cb(res);
    });
  }
};

export const unSubUserJoinedRoom = (socketIo) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.off("userJoinedRoom");
  }
};
