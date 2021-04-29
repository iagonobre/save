import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import FlashMessage from 'react-native-flash-message';
import { errorConnection } from './src/utils/errorMessages';
import AppProvider from './src/hooks/index';
import Routes from './src/routes/index.routes';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        setLoading(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setLoading(false);
      }
    }
    updateApp();
  }, []);

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      errorConnection();
    }
  });

  return (
    <AppProvider>
      <StatusBar style="light" backgroundColor="#894EB4" />
      <Routes />
      <FlashMessage position="top" />
    </AppProvider>
  );
};

export default App;
