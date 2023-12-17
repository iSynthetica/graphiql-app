'use client';
import { ReactNode, createContext, useState } from 'react';
import { Languages } from './types/languages';

export interface ILocalizationContextType {
  language: Languages;
  setLanguage: (language: Languages) => void;
  localization: {
    [key in Languages]: {
      greeting: string;
      authorizedStatusNegative: string;
      authorizedStatusPositive: string;
      linkToMainPage: string;
      signIn: string;
      signUp: string;
      signOut: string;
      welcomePage: string;
      login: string;
      email: string;
      password: string;
      confirmPassword: string;
      notFoundPageText: string;
    };
  };
}

const localization: ILocalizationContextType['localization'] = {
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
  },
  RU: {
    greeting: 'Добро пожаловать!',
    authorizedStatusNegative: 'Вы не авторизованы :(',
    authorizedStatusPositive: 'Вы авторизованы!',
    linkToMainPage: 'На главную страницу',
    signIn: 'Вход',
    signUp: 'Регистрация',
    signOut: 'Выход из Аккаунта',
    welcomePage: 'Начальная страница',
    login: 'Вход в аккаунт',
    email: 'Адрес email:',
    password: 'Пароль:',
    confirmPassword: 'Подтвердите пароль:',
    notFoundPageText: 'Такая страница не существует',
  },
  UK: {
    greeting: '',
    authorizedStatusNegative: '',
    authorizedStatusPositive: '',
    linkToMainPage: '',
    signIn: '',
    signUp: '',
    signOut: '',
    welcomePage: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    notFoundPageText: '',
  },
};

export const ILocalizationContext = createContext<ILocalizationContextType>({
  language: 'EN',
  setLanguage: () => {},
  localization: localization,
});

interface ILocalizationProviderProps {
  children: ReactNode;
}
export const ILocalizationProvider = ({
  children,
}: ILocalizationProviderProps) => {
  const [language, setLanguage] = useState<Languages>('EN');

  return (
    <ILocalizationContext.Provider
      value={{ language, setLanguage, localization }}
    >
      {children}
    </ILocalizationContext.Provider>
  );
};
