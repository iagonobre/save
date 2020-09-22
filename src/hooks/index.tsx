import React from 'react';

import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';
import { RewardsProvider } from './rewards';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <RewardsProvider>{children}</RewardsProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default AppProvider;
