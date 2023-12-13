'use client';

import firebase_app from '@/app/firebase/config';
import { IAuthContextProviderProps } from '@/types/interfaces';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);
export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
