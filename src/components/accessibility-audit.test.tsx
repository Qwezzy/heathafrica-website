import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Product from '../pages/Product';
import Contact from '../pages/Contact';

// Helper to render components with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Automated Accessibility Audit with axe-core', () => {
  test('Full App should have no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Home page should have no accessibility violations', async () => {
    const { container } = renderWithRouter(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('About page should have no accessibility violations', async () => {
    const { container } = renderWithRouter(<About />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Services page should have no accessibility violations', async () => {
    const { container } = renderWithRouter(<Services />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Product page should have no accessibility violations', async () => {
    const { container } = renderWithRouter(<Product />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Contact page should have no accessibility violations', async () => {
    const { container } = renderWithRouter(<Contact />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
