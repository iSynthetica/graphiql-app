'use client';
import React from 'react';
import CoolButton from '../components/lib/coolButton';
import { useForm } from 'react-hook-form';
import { validationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const onSubmit = async () => {
    await validationSchema.validate({ abortEarly: false });
    console.log('send to');
  };

  return (
    <div
      className={`min-h-[90vh] flex justify-center text-white items-center w-screen ${nunito.className}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[25%] pt-8 pb-10 bg-green-grey-custom mx-auto px-16  flex flex-col gap-6 rounded-3xl border-gray-800 border-2"
      >
        <div>
          <h1 className="text-4xl text-center">Sign Up</h1>
        </div>
        <div className="relative">
          <label className="pl-1 text-xl">Email Address:</label>
          <input
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('email')}
            placeholder="email"
            type="email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs absolute left-0 -bottom-5">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="pl-1 text-xl">Password:</label>
          <input
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('password')}
            placeholder="password"
            type="password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs absolute left-0 -bottom-5">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <label className="pl-1 text-xl">Confirm Password:</label>
          <input
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('confirmPassword')}
            placeholder="password"
            type="password"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs absolute left-0 -bottom-5">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <CoolButton color="bg-gray-800" text="Sign up" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
