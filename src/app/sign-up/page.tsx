'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { auth, registerWithEmailAndPassword } from '../firebase/config';

const Page = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const router = useRouter();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { result, error } = await registerWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (error) {
      return console.log(error);
    }

    return router.push('/profile');
  };
  return (
    <section className="h-screen flex flex-col items-center justify-center g-3">
      <h1 className="text-xl mb-3 mt-40">Sign up</h1>

      <form onSubmit={handleForm} className="form">
        <label htmlFor="email">
          <p>Email</p>
          <input
            aria-label="Enter your password"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className="text-sm text-gray-base w-full  
							mr-3 p-4 h-2 border  
							border-gray-200 rounded mb-2"
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            aria-label="Enter your email address"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="text-sm text-gray-base w-full mr-3 p-4 h-2 border border-gray-200  
							rounded mb-2"
          />
        </label>
        <button type="submit" className="flex">
          Sign up
        </button>
      </form>
    </section>
  );
};

export default Page;
