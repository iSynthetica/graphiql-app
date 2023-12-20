'use client';

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
        // const token = await user.getIdToken();
        setUser(user);
        setLoading(false);
      }
    });
  }, [user, router]);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const isExpired = isTokenExpired(token);
        console.log('isExpired', isExpired);

        if (isExpired) {
          logout();
          router.push('/signin');
        }
      }
    };

    const interval = 4 * 60 * 1000;
    const handle = setInterval(checkTokenExpiration, 5000);

    return () => clearInterval(handle);
  }, [router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
