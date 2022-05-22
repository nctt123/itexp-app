/* eslint-disable import/order */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';

import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

import {
  CHANNEL_ID_NOTIFICATION,
  CHANNEL_NAME_NOTIFICATION,
} from '@common/constant';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {},
  popInitialNotification: true,
  requestPermissions: true,
});
PushNotification.createChannel({
  channelId: CHANNEL_ID_NOTIFICATION,
  channelName: CHANNEL_NAME_NOTIFICATION,
});

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

AppRegistry.registerComponent(appName, () => App);
