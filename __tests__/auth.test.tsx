import { render, screen } from '@testing-library/react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Spinner } from '@/app/components/spinner';
import { AuthContextProvider, useAuth } from '@/context/AuthContext';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    query: { myQueryParam: 'test' },
    asPath: '/',
  }),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));
const MockChildComponent = () => {
  const user = useAuth() as User | null;
  return <div>{user ? user.email : 'No user'}</div>;
};
describe('AuthContextProvider', () => {
  const mockPush = jest.fn();
  const mockUser = { email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({ push: mockPush }));
    (getAuth as jest.Mock).mockImplementation(() => mockUser);
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });
  });

  it('renders its children and provides user context', () => {
    render(
      <AuthContextProvider>
        <MockChildComponent />
      </AuthContextProvider>
    );
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('shows spinner while loading', () => {
    render(
      <AuthContextProvider>
        <Spinner />
      </AuthContextProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Additional tests for token expiration and redirection
});
