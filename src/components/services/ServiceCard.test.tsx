import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('ServiceCard Component', () => {
  test('renders props correctly', () => {
    const mockProps = {
      title: 'Test Service',
      description: 'Test description for the service',
      features: [
        'Feature one',
        'Feature two',
        'Feature three'
      ]
    };

    render(<ServiceCard {...mockProps} />);
    
    // Check title is rendered
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    
    // Check description is rendered
    expect(screen.getByText('Test description for the service')).toBeInTheDocument();
    
    // Check all features are rendered
    expect(screen.getByText('Feature one')).toBeInTheDocument();
    expect(screen.getByText('Feature two')).toBeInTheDocument();
    expect(screen.getByText('Feature three')).toBeInTheDocument();
  });

  test('applies full width styling when fullWidth prop is true', () => {
    const mockProps = {
      title: 'AI Service',
      description: 'AI service description',
      features: ['AI feature'],
      fullWidth: true
    };

    const { container } = render(<ServiceCard {...mockProps} />);
    
    // Check that the card has the full-width classes
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('md:col-span-2');
    expect(card.className).toContain('lg:col-span-3');
  });

  test('does not apply full width styling when fullWidth prop is false', () => {
    const mockProps = {
      title: 'Regular Service',
      description: 'Regular service description',
      features: ['Regular feature'],
      fullWidth: false
    };

    const { container } = render(<ServiceCard {...mockProps} />);
    
    // Check that the card does not have the full-width classes
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('md:col-span-2');
    expect(card.className).not.toContain('lg:col-span-3');
  });
});
