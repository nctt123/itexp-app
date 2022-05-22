import { CHANNEL_ID_NOTIFICATION } from '@common/constant';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import PushNotification from 'react-native-push-notification';

// import {
//   check,
//   request,
//   openSettings,
//   RESULTS,
// } from 'react-native-permissions';

// export function checkAndRequestPermission(permission) {
//   return check(permission).then(result => {
//     if (result === RESULTS.DENIED) {
//       console.log(
//         'The permission has not been requested / is denied but requestable',
//       );
//       return request(permission).then(result => {
//         if (result === RESULTS.GRANTED) {
//           console.log('The permission is granted');
//           return RESULTS.GRANTED;
//         }
//         return RESULTS.BLOCKED;
//       });
//     }

//     if (result === RESULTS.GRANTED) {
//       console.log('The permission is granted');
//       return RESULTS.GRANTED;
//     }

//     return RESULTS.BLOCKED;
//   });
// }

export const makeHitSlop = size => ({
  top: size,
  left: size,
  bottom: size,
  right: size,
});

export function showAlert(
  message,
  description = '',
  cancelable = true,
  callback = null,
) {
  setTimeout(() => {
    Alert.alert(
      message,
      description,
      [
        {
          text: 'Ok',
          onPress: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
      { cancelable },
    );
  }, 100);
}

export function isEmail(email) {
  // eslint-disable-next-line no-useless-escape
  return (
    email &&
    email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  );
}

export function isPassword(password) {
  return (
    password &&
    password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/g,
    )
  );
}

export function isUserName(userName) {
  return userName && userName.match(/^[A-Za-z\d]{3,50}$/g);
}

export function normalizerUrlFromW3(url) {
  return url ? url.split('?')[0] : null;
}

export const LocalNotification = (title, message) => {
  PushNotification.localNotification({
    autoCancel: true,
    title,
    message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    largeIcon: 'ic_launcher',
    channelId: CHANNEL_ID_NOTIFICATION,
  });
};

export const getDeviceInfo = () => {
  const deviceId = DeviceInfo.getDeviceId();
  const model = DeviceInfo.getModel();
  const uniqueId = DeviceInfo.getUniqueId();
  const systemName = DeviceInfo.getSystemName();
  const systemVersion = DeviceInfo.getSystemVersion();
  const appVersion = DeviceInfo.getReadableVersion();
  const brand = DeviceInfo.getBrand();

  return Promise.all([
    DeviceInfo.getBuildId(),
    DeviceInfo.getCarrier(),
    DeviceInfo.getDeviceName(),
    DeviceInfo.getFontScale(),
    DeviceInfo.getFreeDiskStorage(),
    DeviceInfo.getManufacturer(),
    DeviceInfo.getTotalMemory(),
    DeviceInfo.getUsedMemory(),
    DeviceInfo.getUserAgent(),
    DeviceInfo.isEmulator(),
    DeviceInfo.isPinOrFingerprintSet(),
  ]).then(
    ([
      buildId,
      carrier,
      deviceName,
      fontScale,
      freeDiskStorage,
      manufacturer,
      totalMemory,
      usedMemory,
      userAgent,
      isEmulator,
      isPinOrFingerprintSet,
    ]) => ({
      deviceId,
      model,
      uniqueId,
      systemName,
      systemVersion,
      appVersion,
      brand,
      buildId,
      carrier,
      deviceName,
      fontScale,
      freeDiskStorage,
      manufacturer,
      totalMemory,
      usedMemory,
      userAgent,
      isEmulator,
      isPinOrFingerprintSet,
    }),
  );
};
