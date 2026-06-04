import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FAQAccordion from '../FAQAccordion';

const mockItems = [
  { q: 'Pregunta 1', a: 'Respuesta 1' },
  { q: 'Pregunta 2', a: 'Respuesta 2' },
  { q: 'Pregunta 3', a: 'Respuesta 3' },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText('Pregunta 1')).toBeInTheDocument();
    expect(screen.getByText('Pregunta 2')).toBeInTheDocument();
    expect(screen.getByText('Pregunta 3')).toBeInTheDocument();
  });

  it('shows numbered badges', () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('answers are hidden by default', () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.queryByText('Respuesta 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Respuesta 2')).not.toBeInTheDocument();
  });

  it('toggles answer on click', () => {
    render(<FAQAccordion items={mockItems} />);
    const button = screen.getByText('Pregunta 1').closest('button')!;
    fireEvent.click(button);
    expect(screen.getByText('Respuesta 1')).toBeInTheDocument();
  });

  it('closes answer on second click', async () => {
    render(<FAQAccordion items={mockItems} />);
    const button = screen.getByText('Pregunta 1').closest('button')!;
    fireEvent.click(button);
    expect(screen.getByText('Respuesta 1')).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Respuesta 1')).not.toBeInTheDocument();
    });
  });

  it('closes previous answer when opening a new one', async () => {
    render(<FAQAccordion items={mockItems} />);
    const btn1 = screen.getByText('Pregunta 1').closest('button')!;
    const btn2 = screen.getByText('Pregunta 2').closest('button')!;
    fireEvent.click(btn1);
    expect(screen.getByText('Respuesta 1')).toBeInTheDocument();
    fireEvent.click(btn2);
    await waitFor(() => {
      expect(screen.queryByText('Respuesta 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Respuesta 2')).toBeInTheDocument();
  });

  it('sets aria-expanded correctly', async () => {
    render(<FAQAccordion items={mockItems} />);
    const button = screen.getByText('Pregunta 1').closest('button')!;
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
