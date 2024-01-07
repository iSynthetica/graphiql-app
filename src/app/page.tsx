'use client';
import { useAuth } from '@/context/AuthContext';
import { ILocalizationContext } from '@/context/localization';
import { IAuthContextValue } from '@/types/interfaces';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import CoolButton from './components/lib/coolButton';
import { Spinner } from './components/spinner';

const WelcomePage = () => {
  const { user } = useAuth() as IAuthContextValue;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () =>
      await new Promise((resolve) => setTimeout(resolve, 50));
    setLoading(false);
    checkAuth();
  }, [user]);

  const { language, localization } = useContext(ILocalizationContext);

  return (
    <div className="flex items-center justify-center bg-green-custom-800 text-white lg:text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          {localization[language].greeting}
        </h1>
        {loading ? (
          <Spinner />
        ) : user ? (
          <>
            <p className="text-3xl mb-4">
              {localization[language].authorizedStatusPositive}
            </p>
            <Link
              href="/editor"
              className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
            >
              {localization[language].linkToMainPage}
            </Link>
          </>
        ) : (
          <>
            <p className="text-3xl mb-4">
              {localization[language].authorizedStatusNegative}
            </p>
            <div className="flex justify-between my-8">
              <Link href="/signin" className="cursor-pointer">
                <CoolButton
                  color="bg-green-500"
                  text={localization[language].signIn}
                  type="button"
                />
              </Link>
              <Link href="/signup" className="cursor-pointer">
                <CoolButton
                  color="bg-yellow-500"
                  text={localization[language].signUp}
                  type="button"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
