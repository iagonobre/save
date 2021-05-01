import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface RewardsContext {
  firstTime: boolean;
  changelog: boolean;
  activeFirstTime(): void;
  updateRewards(): void;
  activeChangelog(): void;
}

const RewardsContext = createContext<RewardsContext>({} as RewardsContext);
export const RewardsProvider: React.FC = ({ children }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [changelog, setChangelog] = useState(false);

  useEffect(() => {
    async function getStorage() {
      const changelogStorage = await AsyncStorage.getItem('@Save:changelog');

      if (changelogStorage === 'true') {
        setChangelog(true);
      }
    }
    getStorage();
  }, []);

  const activeChangelog = useCallback(async () => {
    setChangelog(true);
    await AsyncStorage.setItem('@Save:changelog', 'true');
  }, []);

  const updateRewards = useCallback(async () => {
    const storageFirstTime = await AsyncStorage.getItem('@Save:firsttime');

    if (storageFirstTime === 'true') {
      setFirstTime(true);
    }
  }, []);

  const activeFirstTime = useCallback(async () => {
    setFirstTime(true);
    await AsyncStorage.setItem('@Save:firsttime', 'true');
  }, []);

  return (
    <RewardsContext.Provider
      value={{
        activeChangelog,
        changelog,
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
