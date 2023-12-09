'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Languages } from '@/types/languages';


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [language, setLanguage] = useState('EN');

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
      className={`${
        isSticky ? 'bg-blue-500 h-16' : 'bg-gray-800 h-20'
      } transition-all duration-300 ease-in-out fixed w-full top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href='/' className="text-white text-xl font-bold">Welcome Page</Link>
        <div className="text-white">
        <select
            id="language"
            className='px-4 py-2 focus:outline-none bg-transparent text-white'
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Languages)}
          >
            <option value="EN">EN</option>
            <option value="UK">UK</option>
            <option value="RU">RU</option>
          </select>
        </div>
        <Link href="/signout" className="text-white">Sign Out</Link>
      </div>
    </header>
  );
};

export default Header;
