'use client';

import { User } from '@/types/User';
import React, { createContext, useState } from 'react';

export const UserContext = createContext<{
  user: User | undefined;
  setUser: (u: User) => void;
}>({
  user: undefined,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
