import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePostScreen from "@screens/createPost";

import * as screenTypes from "@navigation/screenTypes";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={screenTypes.CreatePostScreen}
      component={CreatePostScreen}
    />
  </Stack.Navigator>
);
