'use client';
import firebase_app from '@/app/firebase/config';
import { IAuthContextProviderProps } from '@/types/interfaces';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  // onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
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

  const signUp = async (email: string, password: string) => {
    let result = null,
      error = null;
    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    return { result, error };
  };
  const signIn = async (email: string, password: string) => {
    let result = null,
      error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: FirebaseError | unknown) {
      if (err instanceof FirebaseError) {
        console.log(err);
      }
    }
    return { result, error };
  };

  useEffect(() => {
    // const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
    const unsubscribeTokenChanged = onIdTokenChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        logout();
      }
      setLoading(false);
    });

    // const unsubscribeTokenChanged = onIdTokenChanged(auth, (user) => {
    //   if (!user) {
    //     logout();
    //   }
    // });

    //return () => unsubscribeAuthState();
    return unsubscribeTokenChanged;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
