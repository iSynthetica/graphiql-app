'use client';
import { useAuth } from '@/context/AuthContext';
import { ILocalizationContext } from '@/localization';
import { IAuthContextValue } from '@/types/interfaces';
import { FormDataSchema, validationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Nunito } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CoolButton from '../../components/lib/coolButton';

const nunito = Nunito({
  weight: '800',
  subsets: ['latin'],
  display: 'swap',
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const router = useRouter();

  const { user, signUp } = useAuth() as IAuthContextValue;
  const { language, localization } = useContext(ILocalizationContext);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  if (user) {
    return null;
  }
  const onSubmit = async (data: FormDataSchema) => {
    const { error } = await signUp(data.email, data.password);

    await validationSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      return console.log(error);
    }

    return router.push('/');
  };
  return (
    <div
      className={`min-h-[90vh] flex justify-center text-white items-center w-screen ${nunito.className}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[25%] pt-8 pb-10 bg-green-grey-custom mx-auto px-16  flex flex-col gap-6 rounded-3xl border-gray-800 border-2"
        noValidate
      >
        <div>
          <h1 className="text-4xl text-center">
            {localization[language].signUp}
          </h1>
        </div>
        <div className="relative">
          <label className="pl-1 text-xl" htmlFor="email">
            {localization[language].email}
          </label>
          <input
            id="email"
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('email')}
            placeholder={localization[language].email}
            type="email"
            autoComplete="new-email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs absolute left-0 -bottom-5">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label className="pl-1 text-xl" htmlFor="password">
            {localization[language].password}
          </label>
          <input
            id="password"
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('password')}
            placeholder={localization[language].password}
            type="password"
            autoComplete="new-password"
          />
          {errors.password && (
            <p
              className="text-red-500 text-xs absolute left-0 -bottom-8
            "
            >
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <label className="pl-1 text-xl" htmlFor="confirmPassword">
            {localization[language].confirmPassword}
          </label>
          <input
            id="confirmPassword"
            className="block w-[100%] rounded-2xl text-gray-800 border-gray-800 border-2 text-xl p-2"
            {...register('confirmPassword')}
            placeholder={localization[language].password}
            type="password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs absolute left-0 -bottom-5">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <CoolButton
            color="bg-gray-800"
            text={localization[language].signUp}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
