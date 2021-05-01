import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import AuthRoutes from './auth.routes';
import AppStackRoutes from './appStack.routes';

import { useAuth } from '../hooks/auth';
import { useReward } from '../hooks/rewards';
import { useTheme } from '../hooks/theme';

const Routes: React.FC = () => {
  const { updateRewards, firstTime } = useReward();
  const { student, loading } = useAuth();
  const { theme, currentTheme } = useTheme();

  currentTheme();
  updateRewards();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      {student ? <AppStackRoutes /> : <AuthRoutes firstTime={firstTime} />}
    </ThemeProvider>
  );
};

export default Routes;
