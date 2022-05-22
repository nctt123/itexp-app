import React, { Suspense, useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import colors from '@assets/colors';
import { DEFAULT_MODE } from '@common/config';
import { Text, Block, ToastMessage } from '@components/index';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configStore';

import I18n from './language/i18n';
import Navigation from './navigation';

function App() {
  const [mode, setMode] = useState(DEFAULT_MODE);

  useEffect(() => {
    AsyncStorage.getItem('mode').then(mode => setMode(mode));
  }, []);

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={I18n}>
              <Suspense fallback={<View />}>
                <SafeAreaView
                  style={{ flex: 1, backgroundColor: colors.bg }}
                  edges={['top']}>
                  <Navigation />
                  <ToastMessage />
                </SafeAreaView>
              </Suspense>
            </I18nextProvider>
          </PersistGate>
        </Provider>
        {mode && mode !== 'PROD' && (
          <Block absolute top={10} left={10}>
            <Text color='red' bold c1>
              {`${mode} mode`}
            </Text>
          </Block>
        )}
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}
export default App;
