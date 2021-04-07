import React from 'react';

import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';
import { RewardsProvider } from './rewards';
import { NotificationProvider } from './notifications';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <NotificationProvider>
      <ThemeProvider>
        <RewardsProvider>{children}</RewardsProvider>
      </ThemeProvider>
    </NotificationProvider>
  </AuthProvider>
);

export default AppProvider;
