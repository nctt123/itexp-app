import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from '@screens/notification/index';

import * as screenTypes from '@navigation/screenTypes';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={screenTypes.NotificationScreen}
      component={Notification}
    />
  </Stack.Navigator>
);
