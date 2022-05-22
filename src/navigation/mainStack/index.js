import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePostModal from "@screens/createPost";
import * as screenTypes from "../screenTypes";

import MainTab from "./mainTab";
import HomeDetailStack from "./HomeDetailStack";
import ProfileDetailStack from "./ProfileDetailStack";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={screenTypes.MainTab}
      screenOptions={{ headerShown: false, animationEnabled: false }}
      mode="modal"
    >
      <Stack.Screen
        name={screenTypes.MainTab}
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screenTypes.HomeDetailStack}
        component={HomeDetailStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screenTypes.ProfileDetailStack}
        component={ProfileDetailStack}
        options={{
          headerShown: false,
        }}
      />

     
      <Stack.Screen
        name={screenTypes.CreatePostScreen}
        component={CreatePostModal}
        options={{
          animationEnabled: Platform.OS !== "android",
          cardStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
