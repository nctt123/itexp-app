import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as screenTypes from "@navigation/screenTypes";

import { Block, Icon, Touchable } from "@components/index";
import SvgComponent from "@assets/svg";
import colors from "@assets/colors";
import NotificationIcon from "@screens/notification/components/NotificationIcon";
import HomeStack from "./HomeStack";
import ChatStack from "./ChatStack";
import UserStack from "./UserStack";
import NotificationStack from "./NotificationStack";
import CreatePostStack from "./CreatePostStack";

const BottomTab = createBottomTabNavigator();

const CusomTabBottom = ({ state, navigation }) => {
  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowTab(false);
  };

  const _keyboardDidHide = () => {
    setShowTab(true);
  };

  if (showTab) {
    return (
      <Block height={80} row justifyAround middle bg={colors.blackPrimary}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const getIcon = () => {
            switch (route.name) {
              case screenTypes.HomeStack:
                return {
                  iconNameActive: SvgComponent.homeActive,
                  iconName: SvgComponent.homeDeactive,
                };
              case screenTypes.ChatStack:
                return {
                  iconNameActive: SvgComponent.docActive,
                  iconName: SvgComponent.doc,
                };
              case screenTypes.CreatePostStack:
                return {
                  iconNameActive: SvgComponent.createGroup,
                  iconName: SvgComponent.createGroup,
                };
              case screenTypes.NotificationStack:
                return {
                  iconNameActive: SvgComponent.notiActive,
                  iconName: SvgComponent.notification,
                };
              case screenTypes.UserStack:
                return {
                  iconNameActive: SvgComponent.userActive,
                  iconName: SvgComponent.user,
                };

              default:
                return {
                  iconNameActive: SvgComponent.homeActive,
                  iconName: SvgComponent.homeDeactive,
                };
            }
          };

          return (
            <Touchable
              onPress={onPress}
              onLongPress={onLongPress}
              key={route.name}
              p={10}
            >
              {route.name === screenTypes.NotificationStack && (
                <NotificationIcon>
                  <Icon
                    imgType="svg"
                    xml={
                      isFocused ? getIcon().iconNameActive : getIcon().iconName
                    }
                  />
                </NotificationIcon>
              )}
              {route.name !== screenTypes.NotificationStack && (
                <Icon
                  imgType="svg"
                  xml={
                    isFocused ? getIcon().iconNameActive : getIcon().iconName
                  }
                />
              )}
            </Touchable>
          );
        })}
      </Block>
    );
  }

  return <Block />;
};

function BottomTabs() {
  return (
    <BottomTab.Navigator tabBar={(props) => <CusomTabBottom {...props} />}>
      <BottomTab.Screen name={screenTypes.HomeStack} component={HomeStack} />
      <BottomTab.Screen name={screenTypes.ChatStack} component={ChatStack} />
      <BottomTab.Screen
        name={screenTypes.CreatePostStack}
        component={CreatePostStack}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate(screenTypes.CreatePostScreen);
          },
        })}
      />
      <BottomTab.Screen
        name={screenTypes.NotificationStack}
        component={NotificationStack}
      />
      <BottomTab.Screen name={screenTypes.UserStack} component={UserStack} />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;
