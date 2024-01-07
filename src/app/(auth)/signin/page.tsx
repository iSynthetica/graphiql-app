'use client';
import { signIn } from '@/app/firebase/config';
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
      router.push('/main');
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
    } else {
      toast.success(`${localization[language].successLogIn}`);
      router.push('/main');
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
