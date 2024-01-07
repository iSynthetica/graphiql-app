import Header from '@/app/components/header';
import { logout } from '@/app/firebase/config';
import { IAuthContextValue } from '@/types/interfaces';
import { fireEvent, render, screen } from '@testing-library/react';
import { toast } from 'react-toastify';

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn().mockReturnValue({
    user: null, // Set the user value based on your test scenario
  } as IAuthContextValue),
}));
jest.mock('@/app/firebase/config', () => ({
  signIn: jest.fn(),
  signInWithGoogle: jest.fn(),
  logout: jest.fn(),
}));

jest.mock('@/context/localization', () => ({
  useContext: jest.fn().mockReturnValue({
    language: 'EN', // Set the language value based on your test scenario
    localization: {
      EN: {
        welcomePage: 'Welcome',
        signOut: 'Sign Out',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        successLogOut: 'Logged out successfully',
      },
      UA: {
        welcomePage: 'Ласкаво просимо',
        signOut: 'Вийти',
        signIn: 'Увійти',
        signUp: 'Зареєструватися',
        successLogOut: 'Ви успішно вийшли',
      },
      RU: {
        welcomePage: 'Добро пожаловать',
        signOut: 'Выйти',
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        successLogOut: 'Вы успешно вышли',
      },
    },
    setLanguage: jest.fn(),
  }),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('Header Component', () => {
  it('renders the header with correct text', () => {
    render(<Header />);

    const welcomeText = screen.getByText('Welcome');
    expect(welcomeText).toBeInTheDocument();

    const signInText = screen.getByText('Sign In');
    expect(signInText).toBeInTheDocument();

    const signUpText = screen.getByText('Sign Up');
    expect(signUpText).toBeInTheDocument();
  });

  it('logs out the user when sign out link is clicked', () => {
    render(<Header />);

    const signOutLink = screen.getByText('Sign Out');
    fireEvent.click(signOutLink);

    expect(logout).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Logged out successfully');
  });

  it('changes the language when language select is changed', () => {
    render(<Header />);

    const languageSelect = screen.getByTestId('language-select');
    fireEvent.change(languageSelect, { target: { value: 'UA' } });

    // expect(setLanguage).toHaveBeenCalledWith('UA' as Languages);
  });
});
