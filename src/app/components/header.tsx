'use client';
import { useAuth } from '@/context/AuthContext';
import { ILocalizationContext } from '@/localization';
import { IAuthContextValue } from '@/types/interfaces';
import { Languages } from '@/types/languages';
import { Source_Sans_3 } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { logout } from '../firebase/config';

const sourse = Source_Sans_3({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const Header = () => {
  const { user } = useAuth() as IAuthContextValue;
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { language, localization, setLanguage } =
    useContext(ILocalizationContext);

  if (!pathname || typeof window === 'undefined') {
    return null;
  }

  const isSignInPage = pathname === '/signin';
  const isSignUpPage = pathname === '/signup';

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  const handleLogOut = async () => {
    await logout();
  };

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
          <span className={sourse.className}>
            {localization[language].welcomePage}
          </span>
        </Link>
        <div className="text-white">
          <select
            id="language"
            className="px-4 py-2 focus:outline-none bg-transparent text-white"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Languages)}
          >
            <option value="EN">EN</option>
            <option value="UA">UA</option>
            <option value="RU">RU</option>
          </select>
        </div>
        {user ? (
          <>
            <Link
              href="/"
              onClick={handleLogOut}
              className="text-white text-xl font-bold"
            >
              <span className={sourse.className}>
                {localization[language].signOut}
              </span>
            </Link>
          </>
        ) : (
          <>
            {isSignInPage ? (
              <Link href="/signup" className="text-white text-xl font-bold">
                <span className={sourse.className}>
                  {localization[language].signUp}
                </span>
              </Link>
            ) : isSignUpPage ? (
              <Link href="/signin" className="text-white text-xl font-bold">
                <span className={sourse.className}>
                  {localization[language].signIn}
                </span>
              </Link>
            ) : (
              <>
                <Link href="/signin" className="text-white text-xl font-bold">
                  <span className={sourse.className}>
                    {localization[language].signIn}
                  </span>
                </Link>
                <Link href="/signup" className="text-white text-xl font-bold">
                  <span className={sourse.className}>
                    {localization[language].signUp}
                  </span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
