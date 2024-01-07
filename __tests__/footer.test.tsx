import Footer from '@/app/components/footer';
import { render, screen } from '@testing-library/react';

describe('Footer Component', () => {
  it('renders the GitHub link', () => {
    render(<Footer />);
    const gitHubLink = screen.getByRole('link', { name: /Authors GitHub/i });
    expect(gitHubLink).toBeInTheDocument();
    expect(gitHubLink).toHaveAttribute(
      'href',
      'https://github.com/iSynthetica'
    );
  });

  it('renders the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(`© ${currentYear} GraphIQL`);
    expect(yearText).toBeInTheDocument();
  });

  it('renders the RS School link', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /Course Logo/i });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/react/');
  });
});
