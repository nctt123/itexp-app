import { checkConnectSocket } from '@utils/SocketHelper';

export const subscribeGetMessageErrorSocket = (socketIo, cb) => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.on('errorLogger', res => cb(res));
  }
};

export const unSubscribeGetMessageErrorSocket = socketIo => {
  const result = checkConnectSocket(socketIo);
  if (result) {
    socketIo.off('errorLogger');
  }
};
