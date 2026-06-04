import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionSpringIn from '../SectionSpringIn';

describe('SectionSpringIn', () => {
  it('renders children', () => {
    render(
      <SectionSpringIn>
        <p>Hello</p>
      </SectionSpringIn>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <SectionSpringIn className="custom-class">
        <p>Test</p>
      </SectionSpringIn>
    );
    const el = container.querySelector('.custom-class');
    expect(el).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <SectionSpringIn>
        <span>A</span>
        <span>B</span>
      </SectionSpringIn>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
