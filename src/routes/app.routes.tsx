import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { ThemeContext } from 'styled-components';

import { useAuth } from '../hooks/auth';
import Home from '../pages/App/Home';
import Perfil from '../pages/App/Perfil';
import Estudos from '../pages/App/Estudos';
import Admin from '../pages/App/Admin';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const { student } = useAuth();
  const { admin } = student;
  const { colors } = useContext(ThemeContext);
  return (
    <Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 56,
        },
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        inactiveBackgroundColor: `${colors.boxFooter}`,
        activeBackgroundColor: `${colors.lineWhite}`,
        inactiveTintColor: `${colors.tintColor}`,
        activeTintColor: `${colors.textPurple}`,
        showLabel: false,
      }}
    >
      <Screen
        name="Estudos"
        component={Estudos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      {admin && (
        <Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="sliders" size={size} color={color} />
            ),
          }}
        />
      )}
    </Navigator>
  );
};

export default AppRoutes;
