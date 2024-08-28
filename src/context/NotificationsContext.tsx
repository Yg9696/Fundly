import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchForUser } from '../services/dbService';
import MyNotification from '../models/Notification';
import { useUser } from './UserContext';

interface NotificationContextType {
  notifications: MyNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<MyNotification[]>>;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const fetchNotifications = async () => {
    if (user?.uid) {
      try {
        setIsLoading(true);
        const result = await fetchForUser(
          'notifications',
          'reciverId',
          user.uid,
          MyNotification.fromJson
        );
        const sortedNotifications = result.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.log('error fetching notifications', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user?.uid]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, isLoading, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};
