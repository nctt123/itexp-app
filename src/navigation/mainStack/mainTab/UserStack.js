import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '@screens/user';

import * as screenTypes from '@navigation/screenTypes';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={screenTypes.UserScreen} component={UserScreen} />
  </Stack.Navigator>
);
