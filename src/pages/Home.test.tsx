import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page', () => {
  test('renders HeroSlider component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check that at least one slide title is present
    expect(screen.getByText('Discover Our Story')).toBeInTheDocument();
  });

  test('renders ValuePropositions component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check that value propositions are present
    expect(screen.getByText('30+ Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Complete Solutions')).toBeInTheDocument();
    expect(screen.getByText('Healthcare-First')).toBeInTheDocument();
    expect(screen.getByText('Pan-African Reach')).toBeInTheDocument();
  });

  test('renders ApproachSection component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check that approach section is present
    expect(screen.getByText('Our Approach')).toBeInTheDocument();
    expect(screen.getByText('VISION. PLAN. EXECUTE. SUPPORT–SUSTAIN.')).toBeInTheDocument();
  });

  test('CTA buttons navigate to correct routes', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check that CTA buttons have correct links
    const aboutLink = screen.getByText('Learn More About Us');
    expect(aboutLink).toHaveAttribute('href', '/about');

    const servicesLink = screen.getByText('View Our Services');
    expect(servicesLink).toHaveAttribute('href', '/services');

    const productLink = screen.getByText('Discover Ulti-Care');
    expect(productLink).toHaveAttribute('href', '/product');
  });
});
