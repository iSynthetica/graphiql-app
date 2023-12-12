import { useAppSelector } from '@/redux/hook';
import Link from 'next/link';
import CoolLink from './components/lib/coolLink';

type WelcomePropsType = {
  isAuthorized: boolean;
};

const WelcomeProps: WelcomePropsType = {
  isAuthorized: true,
};
const WelcomePage = (WelcomeProps: WelcomePropsType) => {
  //const  isAuthorized  = useAppSelector((store) => store.common.isAuthorized);
  const { isAuthorized } = WelcomeProps;
  return (
    <main>
      <div className="min-h-[90vh] flex items-center justify-center bg-green-custom-800 text-white">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-4">Welcome</h1>
          {isAuthorized ? (
            <>
              <p className="text-3xl mb-4">You are authorized!</p>
              <Link
                href="/main"
                className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Go to Main Page
              </Link>
            </>
          ) : (
            <>
              <p className="text-3xl mb-4">You are not authorized :(</p>
              <div className="flex justify-between my-8">
                <CoolLink color="green" url="/signin" text="Sign in" />
                <CoolLink color="yellow" url="/signup" text="Sign up" />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
