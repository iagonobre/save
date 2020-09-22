import React, { createContext, useState, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface RewardsContext {
  darkReward: boolean;
  firstTime: boolean;
  activeDarkReward(): void;
  activeFirstTime(): void;
  updateRewards(): void;
}

const RewardsContext = createContext<RewardsContext>({} as RewardsContext);
export const RewardsProvider: React.FC = ({ children }) => {
  const [darkRewardValue, setDarkRewardValue] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  const updateRewards = useCallback(async () => {
    const storageDarkReward = await AsyncStorage.getItem('@Save:darkreward');
    const storageFirstTime = await AsyncStorage.getItem('@Save:firsttime');

    if (storageDarkReward === 'true') {
      setDarkRewardValue(true);
    }

    if (storageFirstTime === 'true') {
      setFirstTime(true);
    }
  }, []);

  const activeDarkReward = useCallback(async () => {
    setDarkRewardValue(true);
    await AsyncStorage.setItem('@Save:darkreward', 'true');
  }, []);

  const activeFirstTime = useCallback(async () => {
    setFirstTime(true);
    await AsyncStorage.setItem('@Save:firsttime', 'true');
  }, []);

  return (
    <RewardsContext.Provider
      value={{
        darkReward: darkRewardValue,
        activeDarkReward,
        activeFirstTime,
        updateRewards,
        firstTime,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export function useReward(): RewardsContext {
  const context = useContext(RewardsContext);

  if (!context) {
    throw new Error('useAuth must be used within an RewardsProvider');
  }

  return context;
}
