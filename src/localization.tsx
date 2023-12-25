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
      dontHaveAccount: string;
      fromProvider: string;
      successLogIn: string;
      successLogOut: string;
      successSignUp: string;
      errorLogIn: string;
      errorSignUp: string;
      errorLogOut: string;
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
    dontHaveAccount: "Don't have an account?",
    fromProvider: 'with',
    successLogIn: 'You have successfully logged in',
    successLogOut: 'You have successfully logged out',
    successSignUp: 'You have successfully sign up',
    errorSignUp: 'Sign Up error',
    errorLogIn: 'Login error',
    errorLogOut: 'Logout error',
  },
  RU: {
    greeting: 'Добро пожаловать!',
    authorizedStatusNegative: 'Вы не авторизованы :(',
    authorizedStatusPositive: 'Вы авторизованы!',
    linkToMainPage: 'На главную страницу',
    signIn: 'Вход',
    signUp: 'Регистрация',
    signOut: 'Выход',
    welcomePage: 'Начальная страница',
    login: 'Вход в аккаунт',
    email: 'Адрес email:',
    password: 'Пароль:',
    confirmPassword: 'Подтвердите пароль:',
    notFoundPageText: 'Такая страница не существует',
    dontHaveAccount: 'Нет аккаунта?',
    fromProvider: 'через',
    successLogIn: 'Вы успешно вошли в аккаунт',
    successLogOut: 'Вы успешно вышли из аккаунта',
    successSignUp: 'Вы успешно зарегистрировались',
    errorSignUp: 'Ошибка регистрации',
    errorLogIn: 'Ошибка входа',
    errorLogOut: 'Ошибка выхода',
  },
  UA: {
    greeting: 'Ласкаво просимо!',
    authorizedStatusNegative: 'Ви не авторизовані :(',
    authorizedStatusPositive: 'Ви авторизовані!',
    linkToMainPage: 'На головну сторінку',
    signIn: 'Увійти',
    signUp: 'Реєстрація',
    signOut: 'Вийти',
    welcomePage: 'Початкова сторінка',
    login: 'Вхід в обліковий запис',
    email: 'Адреса електронної пошти:',
    password: 'Пароль:',
    confirmPassword: 'Підтвердіть пароль:',
    notFoundPageText: 'Такої сторінки не існує',
    dontHaveAccount: 'Не маєте облікового запису?',
    fromProvider: 'через',
    successLogIn: 'Ви успішно увійшли в обліковий запис',
    successLogOut: 'Ви успішно вийшли з облікового запису',
    successSignUp: 'Ви успішно зареєструвались',
    errorLogIn: 'Помилка входу',
    errorSignUp: 'Помилка реєстрації',
    errorLogOut: 'Помилка виходу',
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
