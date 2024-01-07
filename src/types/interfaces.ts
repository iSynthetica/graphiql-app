import { User, UserCredential } from 'firebase/auth';

export interface IAuthContextProviderProps {
  children: React.ReactNode;
}
export interface IAuthContextValue {
  user: User | null;
  logout: () => {};
  loading?: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ result?: UserCredential; error?: Error }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ result?: UserCredential; error?: Error }>;
}
