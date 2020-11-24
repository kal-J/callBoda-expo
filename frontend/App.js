import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import Router from './screens/Router';
import GeneralStatusBar from './components/GeneralStatusBar';
import colors from './layouts/colors';
import { StoreProvider } from './context';

const App = () => {
  /* TODO
    * Implement phone authentication
    * if there is an internet connection, sync local data with cloud data
    * update local data
   */

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async function () {
      await Font.loadAsync({
        Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
      });
      setIsReady(true);
    })();
  });

  return (
    <StoreProvider>
      <View style={{ flex: 1 }}>
        <GeneralStatusBar backgroundColor={colors.primary} />
        <View style={{ flex: 1 }}>
          {isReady ? <Router /> : <ActivityIndicator />}
        </View>
      </View>
    </StoreProvider>
  );
};

export default App;
