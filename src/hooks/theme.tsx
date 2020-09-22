import React, { createContext, useState, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { DefaultTheme } from 'styled-components';
import { dark, light } from '../styles/themes/theme';

interface ThemeContext {
  theme: DefaultTheme;
  toggleTheme(theme: string): Promise<void>;
  currentTheme(): void;
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);
export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light);

  const currentTheme = useCallback(async () => {
    const themeStorage = await AsyncStorage.getItem('@Save:theme');

    if (themeStorage) {
      setTheme(themeStorage === 'light' ? light : dark);
    }
  }, []);

  const toggleTheme = useCallback(async (theme: string) => {
    setTheme(theme === 'light' ? light : dark);
    await AsyncStorage.setItem('@Save:theme', String(theme));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContext {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used within an ThemeProvider');
  }

  return context;
}
