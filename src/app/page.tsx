'use client';
import { useAuthContext } from '@/context/AuthContext';
import { AuthContextValue } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WelcomePage = () => {
  const { user } = useAuthContext() as AuthContextValue;
  const router = useRouter();

  useEffect(() => {
    if (router) {
      if (!user) router.push('/');
    }
  }, [user, router]);

  return (
    <main>
      <div className="min-h-[90vh] flex items-center justify-center bg-green-custom-800 text-white">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-4">Welcome</h1>
          {user ? (
            <>
              <p className="text-3xl mb-4">You are authorized!</p>
              <Link
                href="/admin"
                className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Go to Main Page
              </Link>
            </>
          ) : (
            <>
              <p className="text-3xl mb-4">You are not authorized :(</p>
              <div className="flex justify-between my-8">
                <Link
                  href="/sign-in"
                  className="bg-green-500 px-4 py-2 text-2xl rounded-full hover:bg-green-600"
                  // onClick={() => router.push('/profile')}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-yellow-500 px-4 py-2 text-2xl rounded-full hover:bg-yellow-600"
                >
                  Sign Up
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
