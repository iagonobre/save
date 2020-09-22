import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Auth/Landing';
import Login from '../pages/Auth/Login';
import Faq from '../pages/Auth/Faq';
import FirstOver from '../pages/Auth/FirstOver';
import SecondOver from '../pages/Auth/SecondOver';

const { Navigator, Screen } = createStackNavigator();

interface AuthRoutesProps {
  firstTime: boolean;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ firstTime }) => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {!firstTime ? (
          <>
            <Screen name="FirstOver" component={FirstOver} />
            <Screen name="SecondOver" component={SecondOver} />
          </>
        ) : null}
        <Screen name="Landing" component={Landing} />
        <Screen name="Faq" component={Faq} />
        <Screen name="Login" component={Login} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
