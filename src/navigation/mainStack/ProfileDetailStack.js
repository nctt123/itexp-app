import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "@screens/user/EditProfile";
import FriendRequests from "@screens/user/FriendRequests";
import ChangePassword from "@screens/user/ChangePassword";
import ForgotPassword from "@screens/user/ForgotPassword";
import CreateNewPassword from "@screens/user/CreateNewPassword";
import AboutUs from "@screens/user/AboutUs";
import ContactUs from "@screens/user/ContactUs";
import Notification from "@screens/user/Notification";
import PrivacyPolicy from "@screens/user/PrivacyPolicy";
import TermOfUse from "@screens/user/TermOfUse";
import ProfileOther from "@screens/profileOther/index";
import ListFriend from "@screens/listFriend";

import * as screenTypes from "@navigation/screenTypes";
import ListFriendOther from "@screens/listFriendOther";
import MyPosts from "@screens/user/MyPosts";
import CreateProject from "@screens/user/CreateProject";
import ProjectList from "@screens/user/ProjectList";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={screenTypes.EditProfile} component={EditProfile} />
    <Stack.Screen name={screenTypes.ListFriend} component={ListFriend} />
    <Stack.Screen
      name={screenTypes.ChangePassword}
      component={ChangePassword}
    />
    <Stack.Screen
      name={screenTypes.FriendRequests}
      component={FriendRequests}
    />
    <Stack.Screen
      name={screenTypes.ForgotPassword}
      component={ForgotPassword}
    />
    <Stack.Screen
      name={screenTypes.CreateNewPassword}
      component={CreateNewPassword}
    />
    <Stack.Screen name={screenTypes.AboutUs} component={AboutUs} />
    <Stack.Screen name={screenTypes.MyPosts} component={MyPosts} />
    <Stack.Screen name={screenTypes.ContactUs} component={ContactUs} />
    <Stack.Screen name={screenTypes.Notification} component={Notification} />
    <Stack.Screen name={screenTypes.PrivacyPolicy} component={PrivacyPolicy} />
    <Stack.Screen name={screenTypes.TermOfUse} component={TermOfUse} />
    <Stack.Screen name={screenTypes.ProfileOther} component={ProfileOther} />
    <Stack.Screen
      name={screenTypes.ListFriendOther}
      component={ListFriendOther}
    />
    <Stack.Screen name={screenTypes.ProjectList} component={ProjectList} />
    <Stack.Screen name={screenTypes.CreateProject} component={CreateProject} />
  </Stack.Navigator>
);
