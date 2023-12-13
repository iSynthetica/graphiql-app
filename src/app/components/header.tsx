'use client';
import { UserAuth } from '@/context/AuthContext';
import { AuthContextValue } from '@/types/interfaces';
import { Languages } from '@/types/languages';
import { User } from 'firebase/auth';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const nunito = Nunito({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [language, setLanguage] = useState('EN');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };
  const { user, logout } = UserAuth() as AuthContextValue;

  const handleLogOut = async () => {
    await logout();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLanguageChange = (language: Languages) => {
    setLanguage(language);
  };

  return (
    <header
      className={`min-h-[10vh] ${
        isSticky ? 'bg-blue-500 h-16' : 'bg-gray-800 h-20'
      } transition-all duration-300 ease-in-out fixed w-full top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href="/" className="text-white text-xl font-bold">
          {language && language === 'EN' && <span>Welcome Page</span>}
          {language && language === 'UK' && (
            <span className={nunito.className}>Домашня сторінка</span>
          )}
          {language && language === 'RU' && (
            <span className={nunito.className}>Начальная страница</span>
          )}
        </Link>
        <div className="text-white">
          <select
            id="language"
            className="px-4 py-2 focus:outline-none bg-transparent text-white"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Languages)}
          >
            <option value="EN">EN</option>
            <option value="UK">UK</option>
            <option value="RU">RU</option>
          </select>
        </div>
        {user ? (
          <>
            Hello, {user.displayName}
            <Link
              href="/"
              className="text-white text-xl font-bold"
              onClick={handleLogOut}
            >
              {language && language === 'EN' && <span>Sign Out</span>}
              {language && language === 'UK' && (
                <span className={nunito.className}>Вийти з Аккаунта</span>
              )}
              {language && language === 'RU' && (
                <span className={nunito.className}>Выйти из Аккаунта</span>
              )}
            </Link>
          </>
        ) : (
          // <Link
          //   href="/sign-in"
          //   className="bg-green-500 px-4 py-2 text-2l rounded-full hover:bg-green-600"
          // >
          <>Sign In</>
          // </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
