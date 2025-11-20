import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSlider from './HeroSlider';
import { heroSlides } from '../../data/homeContent';

describe('HeroSlider Component', () => {
  test('renders all three slides', () => {
    render(
      <BrowserRouter>
        <HeroSlider />
      </BrowserRouter>
    );

    // Check that all slide titles are present in the DOM
    heroSlides.forEach((slide) => {
      expect(screen.getByText(slide.title)).toBeInTheDocument();
    });
  });

  test('renders slide descriptions', () => {
    render(
      <BrowserRouter>
        <HeroSlider />
      </BrowserRouter>
    );

    // Check that all slide descriptions are present
    heroSlides.forEach((slide) => {
      expect(screen.getByText(slide.description)).toBeInTheDocument();
    });
  });

  test('renders CTA buttons with correct text', () => {
    render(
      <BrowserRouter>
        <HeroSlider />
      </BrowserRouter>
    );

    // Check that all CTA buttons are present
    heroSlides.forEach((slide) => {
      expect(screen.getByText(slide.ctaText)).toBeInTheDocument();
    });
  });
});
