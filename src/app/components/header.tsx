'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Languages } from '@/types/languages';
import { Source_Sans_3 } from 'next/font/google';
import { ILocalizationContext } from '@/localization';

const sourse = Source_Sans_3({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const {language, localization, setLanguage} = useContext(ILocalizationContext);


  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
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
          <span  className={sourse.className}>{localization[language].welcomePage}</span>
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
        <Link href="/signout" className="text-white text-xl font-bold">
        <span  className={sourse.className}>{localization[language].signOut}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
