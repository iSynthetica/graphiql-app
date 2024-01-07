import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { userEvent } from '@testing-library/userEvent';
import * as AuthContext from '@/context/AuthContext';
import * as FirebaseConfig from '@/app/firebase/config';
import Login from '@/app/(auth)/signin/page';

import { mockLocalizationData } from '../mocks/mocks';
import { useRouter } from 'next/navigation';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/localization', () => ({
  useContext: jest.fn(),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/app/firebase/config', () => ({
  auth: jest.fn(),
  db: jest.fn(),
  logout: jest.fn(),
  signIn: jest.fn(),
  signInWithGoogle: jest.fn(),
  signUp: jest.fn(),
}));

describe('Login Component', () => {
  // Mock implementations
  const mockPush = jest.fn();

  (useRouter as jest.Mock).mockImplementation(() => ({
    push: mockPush,
    replace: jest.fn(),
  }));
  const useAuthMock: jest.MockedFunction<typeof AuthContext.useAuth> =
    jest.mocked(AuthContext.useAuth);
  const signInMock: jest.MockedFunction<typeof FirebaseConfig.signIn> =
    jest.mocked(FirebaseConfig.signIn);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct localization', () => {
    const { getByText } = render(<Login />);

    const el = screen.getByText(mockLocalizationData.localization.EN.login);
    expect(el).toBeInTheDocument();
  });
});
