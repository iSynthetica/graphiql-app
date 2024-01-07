'use client';

import { Spinner } from '@/app/components/spinner';
import firebase_app, { logout } from '@/app/firebase/config';
import { IAuthContextProviderProps } from '@/types/interfaces';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { User, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const auth = getAuth(firebase_app);
export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);
export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setUser(null);
      setLoading(false);
    }

    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [user]);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const user = auth.currentUser;
      let isExpired = false;
      if (user) {
        if (!currentToken) {
          const token = await user.getIdToken();
          setCurrentToken(token as string);
          isExpired = isTokenExpired(token as string);
        } else {
          isExpired = isTokenExpired(currentToken as string);
        }

        if (isExpired) {
          logout();
          router.push('/signin');
        }
      }
    };

    const interval = 4 * 60 * 1000;
    const handle = setInterval(checkTokenExpiration, interval);

    return () => clearInterval(handle);
  }, [currentToken, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
