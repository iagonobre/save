import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';

import DarkReward from '../pages/App/DarkReward';
import UpdateProfile from '../pages/App/Perfil/UpdateProfile';
import Notifications from '../pages/App/Notifications';
import Report from '../pages/App/Report';

const { Navigator, Screen } = createStackNavigator();

const AppStackRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="AppRoutes" component={AppRoutes} />
        <Screen name="DarkReward" component={DarkReward} />
        <Screen name="UpdateProfile" component={UpdateProfile} />
        <Screen name="Notifications" component={Notifications} />
        <Screen name="Report" component={Report} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStackRoutes;
