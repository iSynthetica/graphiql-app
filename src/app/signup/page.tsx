import React from 'react';
import CoolLink from '../components/lib/coolLink';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="min-h-[90vh]">
      <div className="mt-[15vh]">
        <CoolLink color="yellow" url="/signin" text="Sign in" />
      </div>
    </div>
  );
};

export default SignUp;
