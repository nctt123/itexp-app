import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListUsers from "@screens/home/tabUser/listUser";

import * as screenTypes from "@navigation/screenTypes";
import PostDetail from "@screens/postDetail";
import listLike from "@screens/listLike";
import ListPosts from "@screens/home/listPost";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={screenTypes.ListUsers} component={ListUsers} />
    <Stack.Screen name={screenTypes.ListPosts} component={ListPosts} />
    <Stack.Screen name={screenTypes.PostDetail} component={PostDetail} />
    <Stack.Screen name={screenTypes.ListLike} component={listLike} />
  </Stack.Navigator>
);
