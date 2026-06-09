
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../types';

interface AppContextType {
  user: UserData;
  updateUser: (data: Partial<UserData>) => void;
  resetUser: () => void;
}

const defaultUser: UserData = {
  fullName: 'Marry Doe',
  email: 'Marry@Gmail.Com',
  phone: '9876543210',
  companyName: 'PopX Studio',
  isAgency: true,
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUser);

  const updateUser = (data: Partial<UserData>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const resetUser = () => {
    setUser(defaultUser);
  };

  return (
    <AppContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
}
