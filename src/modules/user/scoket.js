import { checkConnectSocket } from '@utils/SocketHelper';

export const acceptRequestFriendSocket = (socketIo, something) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log('acceptRequestFriendSocket');
    socketIo.emit('acceptFriend', something);
  }
};

export const cancelRequestFriendSocket = (socketIo, something) => {
  if (!socketIo) return;
  const result = checkConnectSocket(socketIo);
  if (result) {
    console.log('cancelRequestFriendSocket');
    socketIo.emit('declineFriend', something);
  }
};
