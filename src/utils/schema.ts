import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .min(8, 'must be at least 8 characters long')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'must be at least 8 characters long')
    .matches(/\p{L}/u, 'Password must contain at least one letter')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(
      /[@$!%*?&\p{S}]/u,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type FormDataSchema = yup.InferType<typeof validationSchema>;
