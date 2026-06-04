import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('MKM Signature')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Barbería a domicilio')).toBeInTheDocument();
  });

  it('renders the Instagram link', () => {
    render(<Footer />);
    const link = screen.getByText('@mkm_signature');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://instagram.com/mkm_signature');
  });

  it('renders the email link', () => {
    render(<Footer />);
    const link = screen.getByText('mkm@barberia.com');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'mailto:mkm@barberia.com');
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it('renders privacy link', () => {
    render(<Footer />);
    const link = screen.getByText('Privacidad');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/privacy');
  });

  it('renders terms link', () => {
    render(<Footer />);
    const link = screen.getByText('Términos');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const img = screen.getByAltText('MKM Signature');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo-cara-dorado.svg');
  });

  it('renders cover zone', () => {
    render(<Footer />);
    expect(screen.getByText('CABA y Zona Norte')).toBeInTheDocument();
  });
});
