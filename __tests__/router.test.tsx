// __tests__/router.test.tsx
import Header from '@/app/components/header';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  it('renders correctly for a signin route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      route: '/signin',
      pathname: '/signin',
      query: { someParam: 'signin' },
      asPath: '/signin',
    });

    render(<Header />);
  });
});
