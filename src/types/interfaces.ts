import { User } from 'firebase/auth';

export interface IAuthContextProviderProps {
  children: React.ReactNode;
}
export interface AuthContextValue {
  user: User | null;
  logout: () => {};
  loading?: boolean;
}
export interface IButton {
  title: string;
  onClick?: () => {};
  type: 'submit' | 'reset' | 'button' | undefined;
  btnClass: string;
}
