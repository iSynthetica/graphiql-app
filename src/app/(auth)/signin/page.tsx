'use client';
import React from 'react';
import CoolButton from '../../components/lib/coolButton';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const Login = () => {
  const onSubmit = async () => {
    console.log('login');
  };

  return (
    <div
      className={`min-h-[90vh] flex justify-center text-white items-center w-screen ${nunito.className}`}
    >
      <form
        onSubmit={onSubmit}
        className="min-w-[25%] pt-8 pb-10 bg-green-grey-custom mx-auto px-16  flex flex-col gap-6 rounded-3xl border-gray-800 border-2"
      >
        <div>
          <h1 className="text-4xl text-center">Login</h1>
        </div>
        <div className="relative">
          <label className="pl-1 text-xl">Email Address:</label>
          <input
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            placeholder="email"
            type="email"
            required
          />
        </div>

        <div className="relative">
          <label className="pl-1 text-xl">Password:</label>
          <input
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            placeholder="password"
            type="password"
            required
          />
        </div>
        <div className="flex justify-center">
          <CoolButton color="bg-gray-800" text="Login" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
