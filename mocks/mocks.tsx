import * as AuthContext from '@/context/AuthContext';
import * as LocalizationContext from '@/context/localization';
import * as ReactRouter from 'next/router';
import * as FirebaseConfig from '@/app/firebase/config';

export const mockLocalizationData = {
  language: 'en', // Example language
  localization: {
    EN: {
      greeting: 'Welcome',
      authorizedStatusNegative: 'You are not authorized :(',
      authorizedStatusPositive: 'You are authorized',
      linkToMainPage: 'Go to Main Page',
      signIn: 'Sign in',
      signUp: 'Sign up',
      signOut: 'Sign out',
      welcomePage: 'Welcome Page',
      login: 'Login',
      email: 'Email Address:',
      password: 'Password:',
      confirmPassword: 'Confirm Password:',
      notFoundPageText: 'The page you are looking for does not exist.',
      dontHaveAccount: "Don't have an account?",
      fromProvider: 'with',
      successLogIn: 'You have successfully logged in',
      successLogOut: 'You have successfully logged out',
      successSignUp: 'You have successfully sign up',
      errorSignUp: 'Email is already in use',
      errorLogIn: 'Login error',
      errorLogOut: 'Logout error',
    },
  },
};
jest.mock('@/context/localization', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('@/app/firebase/config', () => ({
  signIn: jest.fn(),
  signInWithGoogle: jest.fn(),
}));
