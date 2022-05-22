import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as screenTypes from '@navigation/screenTypes';
import { useSelector } from 'react-redux';
import { tokenSelector } from '@modules/auth/selectors';
import { useSetup } from '@common/customHook';
import MainStack from './mainStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

const Navigation = () => {
  const token = useSelector(tokenSelector);
  useSetup();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRoute={screenTypes.AuthStack}
          screenOptions={{
            headerShown: false,
          }}>
          {!token ? (
            <Stack.Screen name={screenTypes.AuthStack} component={AuthStack} />
          ) : (
            <Stack.Screen name={screenTypes.MainStack} component={MainStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default Navigation;
