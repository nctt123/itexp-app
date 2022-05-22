/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import { tokenSelector } from '@modules/auth/selectors';
import { setToken } from '@common/baseApi';
import { initSocket } from '@utils/SocketHelper';
import { setScoketIo } from '@modules/home/slice';
import messaging from '@react-native-firebase/messaging';
import { updateFcmToken } from '@modules/user/slice';
import { LocalNotification } from '@utils/index';
import {
  fetchNotifications,
  fetchTotalUnReadNotification,
} from '@modules/notification/slice';

const useSetup = () => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setToken(token);
      initSocket(token, socketIo => {
        dispatch(
          setScoketIo({
            socketIo,
          }),
        );
      });

      syncFCMToken();
    } else {
      setToken('');
    }
  }, [token]);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('getInitialNotification', remoteMessage);
      });

    // handle when click notificartion on out app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp', remoteMessage);
      fetchNotification();
      // navigation.navigate(screenTypes.NotificationScreen);
    });

    // TODO crash app
    messaging().setBackgroundMessageHandler(remoteMessage => {
      console.log('setBackgroundMessageHandler', remoteMessage);
      LocalNotification(remoteMessage.data?.title, remoteMessage.data?.body);
      fetchNotification();
    });

    messaging().onMessage(async remoteMessage => {
      console.log('onMessage', remoteMessage);

      LocalNotification(messaging.data?.title, messaging.data?.body);

      fetchNotification();
    });
  }, []);

  const fetchNotification = () => {
    dispatch(fetchTotalUnReadNotification());
    dispatch(fetchNotifications());
  };

  const syncFCMToken = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled < 0) {
      try {
        await messaging().requestPermission();
      } catch (error) {
        console.log(error);
      }
    }

    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log({ fcmToken });
          dispatch(
            updateFcmToken({
              data: {
                fcmToken,
                platform: Platform.OS,
              },
            }),
          );
        }
      })
      .catch(e => console.log('getToken', e));
  };
};
export default useSetup;
