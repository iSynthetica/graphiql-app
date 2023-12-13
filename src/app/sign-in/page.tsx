'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../components/button';
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase/config';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, error } = await logInWithEmailAndPassword(email, password);

    if (error) {
      return console.log(error);
    }

    return router.push('/');
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center g-3">
      <h1 className="text-xl mb-3 mt-40">Sign in</h1>
      <form onSubmit={handleForm}>
        <div className="flex flex-row items-center justify-center lg:justify-start">
          <p className="mb-0 mr-4 text-lg">Sign in with</p>

          <button type="button" onClick={signInWithGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
          </button>
        </div>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-100 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-100">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
            Or
          </p>
        </div>

        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input type="checkbox" value="" id="check" />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="check"
            >
              Remember me
            </label>
          </div>

          <Link href="/reset">Forgot password?</Link>
        </div>

        <div className="text-center lg:text-left">
          {/* <button type="submit">Sign In</button> */}
          {/* <Link href="/sign-in"> */}
          <Button type="submit" btnClass="new" title="Sign In" />
          {/* </Link> */}

          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don&apos;t have an account?
            <Link href="/sign-up">Sign Up</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
export default SignIn;
