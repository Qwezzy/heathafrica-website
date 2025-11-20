import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ValuePropositions from './ValuePropositions';
import { valuePropositions } from '../../data/homeContent';

describe('ValuePropositions Component', () => {
  test('displays all four value proposition cards', () => {
    render(<ValuePropositions />);

    // Check that all four value propositions are rendered
    expect(valuePropositions).toHaveLength(4);
    
    valuePropositions.forEach((proposition) => {
      expect(screen.getByText(proposition.title)).toBeInTheDocument();
      expect(screen.getByText(proposition.description)).toBeInTheDocument();
    });
  });

  test('renders cards with correct styling classes', () => {
    const { container } = render(<ValuePropositions />);

    // Check that the grid container exists
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();

    // Check that cards have the correct classes (updated for responsive design)
    const cards = container.querySelectorAll('.bg-white.rounded-lg.shadow-md');
    expect(cards).toHaveLength(4);
  });
});
