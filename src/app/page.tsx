'use client';
import { useAuthContext } from '@/context/AuthContext';
import { ILocalizationContext } from '@/localization';
import { IAuthContextValue } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useLayoutEffect } from 'react';
import CoolButton from './components/lib/coolButton';
import { isAuthenticated } from '../utils/auth';

const WelcomePage = () => {
  const { user } = useAuthContext() as IAuthContextValue;
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      router.push('/editor');
    }
  }, [router, user]);

  const { language, localization } = useContext(ILocalizationContext);

  return (
    <div className="flex items-center justify-center bg-green-custom-800 text-white lg:text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          {localization[language].greeting}
        </h1>
        {user ? (
          <>
            <p className="text-3xl mb-4">
              {localization[language].authorizedStatusPositive}
            </p>
            <Link
              href="/main"
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
