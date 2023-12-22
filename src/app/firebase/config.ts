import { FirebaseError, getApps, initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import nookies from 'nookies';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const logout = () => {
  signOut(auth);
  nookies.destroy(undefined, 'token', { path: '/' });
  toast.success('Logout successfully');
};

const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('Sign up successfully');

    const user = auth.currentUser;
    const token = await user?.getIdToken();
    nookies.set(undefined, 'token', token!, { path: '/' });
  } catch (err) {
    toast.error('Sign up failed');
    console.error(err);
  }
  return { result, error };
};

const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    toast.success('Sign in successfully');
    nookies.set(undefined, 'token', token!, { path: '/' });
  } catch (err: FirebaseError | unknown) {
    if (err instanceof FirebaseError) {
      toast.error('Sign in failed');
      console.error(err);
    }
  }
  return { result, error };
};

const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = auth.currentUser;
    const token = await user?.getIdToken();
    nookies.set(undefined, 'token', token!, { path: '/' });
    toast.success('Sign in successfully');
    return res.user;
  } catch (err: FirebaseError | unknown) {
    if (err instanceof FirebaseError) {
      toast.error('Sign in failed');
      console.error(err);
    }
  }
};

export { auth, db, logout, signIn, signInWithGoogle, signUp };
export default firebase_app;
