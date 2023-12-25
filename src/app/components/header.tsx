'use client';
import { useAuth } from '@/context/AuthContext';
import { ILocalizationContext } from '@/localization';
import { IAuthContextValue } from '@/types/interfaces';
import { Languages } from '@/types/languages';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { logout } from '../firebase/config';

const Header = () => {
  const { user } = useAuth() as IAuthContextValue;
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const { language, localization, setLanguage } =
    useContext(ILocalizationContext);

  useEffect(() => {
    const checkAuth = async () =>
      await new Promise((resolve) => setTimeout(resolve, 50));
    checkAuth();
    window.addEventListener('scroll', handleScroll);
    setLoading(false);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

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
    toast.success(`${localization[language].successLogOut}`);
  };

  const handleLanguageChange = (language: Languages) => {
    setLanguage(language);
  };

  return (
    <header
      className={`${
        isSticky ? 'bg-blue-500' : 'bg-gray-600'
      } transition-all duration-300 ease-in-out fixed w-full top-0 z-50 lg:h-16`}
    >
      <div className="container mx-auto lg:flex justify-between items-center h-full">
        <div className="flex items-center justify-center lg:block">
          <Link href="/" className="text-white text-xl font-bold">
            <span>{localization[language].welcomePage}</span>
          </Link>
        </div>
        <div className="lg:flex justify-between w-80 mx-auto lg:mr-0  items-center">
          {loading ? null : user ? (
            <>
              <Link
                href="/"
                onClick={handleLogOut}
                className="text-white text-xl font-bold flex items-center justify-center lg:block"
              >
                <span>{localization[language].signOut}</span>
              </Link>
            </>
          ) : (
            <>
              {isSignInPage ? (
                <Link
                  href="/signup"
                  className="text-white text-xl font-bold flex items-center justify-center lg:block"
                >
                  <span>{localization[language].signUp}</span>
                </Link>
              ) : isSignUpPage ? (
                <Link
                  href="/signin"
                  className="text-white text-xl font-bold flex items-center justify-center lg:block"
                >
                  <span>{localization[language].signIn}</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-white text-xl font-bold flex items-center justify-center lg:block"
                  >
                    <span className="block">
                      {localization[language].signIn}
                    </span>
                  </Link>
                  <Link
                    href="/signup"
                    className="text-white text-xl font-bold flex items-center justify-center lg:block"
                  >
                    <span className="block">
                      {localization[language].signUp}
                    </span>
                  </Link>
                </>
              )}
            </>
          )}
          <div className="text-white flex items-center justify-center lg:block">
            <select
              id="language"
              className="focus:outline-none bg-transparent text-white"
              value={language}
              onChange={(e) =>
                handleLanguageChange(e.target.value as Languages)
              }
            >
              <option value="EN">EN</option>
              <option value="UA">UA</option>
              <option value="RU">RU</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
