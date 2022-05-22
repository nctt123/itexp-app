import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@screens/home/index";

import * as screenTypes from "@navigation/screenTypes";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={screenTypes.HomeScreen} component={HomeScreen} />
  </Stack.Navigator>
);
