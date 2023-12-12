import React from 'react';
import CoolLink from '../components/lib/coolLink';

const SignIn = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="mt-[15vh]">
        <CoolLink color='yellow' url='/signin' text="Sign in"/>
      </div>
    </div>
  );
};

export default SignIn;
