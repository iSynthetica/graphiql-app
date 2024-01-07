import { render, screen } from '@testing-library/react';
import NotFoundPage from '@/app/not-found';

it('test not found page', () => {
  render(<NotFoundPage />);
  const linkElement = screen.getByText(/404/i);
  expect(linkElement).toBeInTheDocument();
});
