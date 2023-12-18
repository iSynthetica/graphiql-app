'use client';
import { useAppSelector } from '@/redux/hook';
import Link from 'next/link';
import CoolButton from './components/lib/coolButton';
import { useContext } from 'react';
import { ILocalizationContext } from '@/localization';
import { Source_Sans_3 } from 'next/font/google';

type WelcomePropsType = {
  params: { isAuthorized: boolean };
};

const WelcomeProps: WelcomePropsType = {
  params: { isAuthorized: true },
};
const WelcomePage = (WelcomeProps: WelcomePropsType) => {
  const { isAuthorized } = WelcomeProps.params;
  const { language, localization, setLanguage } =
    useContext(ILocalizationContext);
  return (
    <main>
      <div className="min-h-[90vh] flex items-center justify-center bg-green-custom-800 text-white">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-4">
            {localization[language].greeting}
          </h1>
          {isAuthorized ? (
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
    </main>
  );
};

export default WelcomePage;
