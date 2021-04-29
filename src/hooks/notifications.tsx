import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { api } from '../services/api';

interface Notification {
  id: string;
  title: string;
  content: string;
  student_id: string;
  tags: 'save' | 'institucional' | 'evento';
  completedAt: Date;
}

interface NotificationContext {
  circle: boolean;
  notifications: Notification[];
  getNotificationsInApp(): Promise<void>;
  deleteOneNotification(id: string): Promise<void>;
  deleteAllNotification(): Promise<void>;
  resetCircle(): void;
}

const NotificationContext = createContext<NotificationContext>(
  {} as NotificationContext,
);

export const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [circle, setCircle] = useState(false);

  const getNotificationsInApp = useCallback(async () => {
    const token = await AsyncStorage.getItem('@Save:token');

    const response = await api.get('/notifications?havePush=false', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const newNotification: Notification[] = response.data;

    setNotifications(newNotification.reverse());

    const oldNotifications = await AsyncStorage.getItem(
      '@Save:oldNotifications',
    );

    if (!oldNotifications) {
      await AsyncStorage.setItem(
        '@Save:oldNotifications',
        JSON.stringify(response.data.reverse()),
      );
    }

    if (oldNotifications) {
      const formattedOldNotifications = JSON.parse(oldNotifications);

      if (formattedOldNotifications?.length !== response.data.length) {
        await AsyncStorage.setItem(
          '@Save:oldNotifications',
          JSON.stringify(response.data.reverse()),
        );
        setCircle(true);
      }
    }
  }, []);

  const deleteOneNotification = useCallback(
    async (id: string) => {
      const removeNotify = notifications.filter(notify => notify.id !== id);
      setNotifications(removeNotify);
      try {
        const token = await AsyncStorage.getItem('@Save:token');

        await api.delete(`/notifications/?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        await AsyncStorage.setItem(
          '@Save:oldNotifications',
          JSON.stringify(removeNotify),
        );
      } catch (err) {
        setNotifications(removeNotify);
      }
    },
    [notifications],
  );

  const deleteAllNotification = useCallback(async () => {
    setNotifications([]);
    try {
      const token = await AsyncStorage.getItem('@Save:token');

      await api.delete('/notifications/?all=true', {
        headers: { Authorization: `Bearer ${token}` },
      });

      await AsyncStorage.setItem('@Save:oldNotifications', JSON.stringify([]));
    } catch {
      setNotifications([]);
    }
  }, []);

  const resetCircle = useCallback(async () => {
    setCircle(false);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        resetCircle,
        circle,
        deleteAllNotification,
        deleteOneNotification,
        notifications,
        getNotificationsInApp,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotifications(): NotificationContext {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useAuth must be used within an NotificationProvider');
  }

  return context;
}
