import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';

import Dashboard from '../pages/App/Estudos/Dashboard';
import DarkReward from '../pages/App/DarkReward';

const { Navigator, Screen } = createStackNavigator();

const AppStackRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="AppRoutes" component={AppRoutes} />
        <Screen name="Dashboard" component={Dashboard} />
        <Screen name="DarkReward" component={DarkReward} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStackRoutes;
