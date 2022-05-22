import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { tokenSelector } from '@modules/auth/selectors';
import {
  subscribeGetMessageErrorSocket,
  unSubscribeGetMessageErrorSocket,
} from '@modules/home/socket';
import { SocketIoSelector } from '@modules/home/selectors';
import Toast from 'react-native-toast-message';
import i18next from 'i18next';

const useShowSocketError = () => {
  const token = useSelector(tokenSelector);
  const socketIo = useSelector(SocketIoSelector);
  useEffect(() => {
    subscribeGetMessageErrorSocket(socketIo, res => {
      console.log('Error socket', res);
      Toast.show({
        type: 'error',
        props: {
          message: i18next.t(`message:${res?.message}`) || res?.message,
          onClose: () => Toast.hide(),
        },
      });
    });
    return () => {
      unSubscribeGetMessageErrorSocket(socketIo);
    };
  }, [token]);
};
export default useShowSocketError;
