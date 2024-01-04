'use client';
import { signIn, signInWithGoogle } from '@/app/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { ILocalizationContext } from '@/context/localization';
import { IAuthContextValue } from '@/types/interfaces';
import { FormDataSchema, validationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CoolButton from '../../components/lib/coolButton';

const Login = () => {
  const { user } = useAuth() as IAuthContextValue;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  const router = useRouter();
  const { language, localization } = useContext(ILocalizationContext);

  useEffect(() => {
    if (user) {
      router.push('/editor');
    } else {
      router.push('/signin');
    }
  }, [router, user]);

  const onSubmit = async (data: FormDataSchema) => {
    const { error } = await signIn(data.email, data.password);

    await validationSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      toast.error(`${localization[language].errorLogIn}`);
      return console.log(error, '+++++++');
    } else {
      toast.success(`${localization[language].successLogIn}`);
      router.push('/editor');
    }
  };

  return (
    <div className={`flex justify-center text-white items-center w-screen `}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 min-w-[433px] pt-8 pb-10 bg-gray-800 mx-auto px-16  flex flex-col gap-6 rounded-3xl border-gray-800 border-2"
        noValidate
      >
        <div>
          <h1 className="text-4xl text-center">
            {localization[language].login}
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
            aria-label="Enter your password"
            {...register('password')}
            placeholder={localization[language].password}
            type="password"
            autoComplete="new-password"
          />
          {errors.password && (
            <p
              className="text-red-500 text-xs absolute left-0 -bottom-5
            "
            >
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <CoolButton
            color="bg-green-custom"
            text={localization[language].signIn}
            type="submit"
          />
        </div>
        <p className="mb-0 mr-4 text-lg">
          {' '}
          {localization[language].login} {localization[language].fromProvider}
        </p>
        <hr />

        <button
          type="button"
          onClick={() => {
            signInWithGoogle();
            {
              user && router.push('/editor');
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="38"
            viewBox="0 0 24 24"
            width="38"
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
        <p className="text-sm font-semibold">
          {localization[language].dontHaveAccount}
          <Link href="/signup" className="text-green-custom px-2 text-sm">
            {localization[language].signUp}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
