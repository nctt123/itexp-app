import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RequestOTPScreen from '@screens/auth/forgotPassword/RequestOTP';
import ConfirmOTPScreen from '@screens/auth/forgotPassword/ConfirmOTP';
import SetPasswordScreen from '@screens/auth/forgotPassword/SetPassword';

import * as screenTypes from '@navigation/screenTypes';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={screenTypes.RequestOTPScreen}
      component={RequestOTPScreen}
    />
    <Stack.Screen
      name={screenTypes.ConfirmOTPScreen}
      component={ConfirmOTPScreen}
    />
    <Stack.Screen
      name={screenTypes.SetPasswordScreen}
      component={SetPasswordScreen}
    />
  </Stack.Navigator>
);
