import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "@screens/chat";

import * as screenTypes from "@navigation/screenTypes";
import ChatDetail from "@screens/chatDetail";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={screenTypes.ChatScreen} component={ChatScreen} />
    <Stack.Screen name={screenTypes.ChatDetail} component={ChatDetail} />
  </Stack.Navigator>
);
