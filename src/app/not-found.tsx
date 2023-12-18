'use client';
import { ILocalizationContext } from '@/localization';
import Link from 'next/link';
import { useContext } from 'react';

const NotFoundPage = () => {
  const { language, localization } = useContext(ILocalizationContext);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-4">{localization[language].notFoundPageText}</p>
      <Link href="/" className="text-blue-500 hover:underline">
        <p>{localization[language].linkToMainPage}</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
