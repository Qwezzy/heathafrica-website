import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  test('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('displays helpful message to user', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/couldn't find the page you're looking for/i)
    ).toBeInTheDocument();
  });

  test('provides link to home page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Go to Home');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('provides link to contact page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const contactLink = screen.getByText('Contact Us');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
