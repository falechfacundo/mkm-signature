import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders the logo image', () => {
    render(<Navbar />);
    const img = screen.getByAltText('MKM Signature');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo-cara-dorado.svg');
  });

  it('renders nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Cobertura')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('nav links have correct hrefs', () => {
    render(<Navbar />);
    const servicios = screen.getByText('Servicios').closest('a');
    expect(servicios).toHaveAttribute('href', '/#servicios');
    const cobertura = screen.getByText('Cobertura').closest('a');
    expect(cobertura).toHaveAttribute('href', '/#comunicacion');
    const blog = screen.getByText('Blog').closest('a');
    expect(blog).toHaveAttribute('href', '/blog');
    const faq = screen.getByText('FAQ').closest('a');
    expect(faq).toHaveAttribute('href', '/#faq');
  });

  it('renders the reservar button', () => {
    render(<Navbar />);
    const btn = screen.getByText('Reservar');
    expect(btn).toBeInTheDocument();
    expect(btn.closest('a')).toHaveAttribute('href', '#reservar');
  });

  it('does not render the MKM Signature text (commented out)', () => {
    render(<Navbar />);
    // The span was commented out by the user
    const allSpans = document.querySelectorAll('span');
    const mkmSpans = Array.from(allSpans).filter(s => s.textContent === 'MKM Signature');
    expect(mkmSpans).toHaveLength(0);
  });
});
