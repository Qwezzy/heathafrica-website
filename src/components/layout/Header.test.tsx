import { describe, test, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fc from 'fast-check';
import Header from './Header';

// Feature: heath-website, Property 2: Universal Navigation Presence
// Validates: Requirements 6.1
describe('Header - Property 2: Universal Navigation Presence', () => {
  test('navigation menu contains all five main page links on any route', { timeout: 15000 }, () => {
    fc.assert(
      fc.property(
        // Generate random routes including valid and invalid paths
        fc.oneof(
          fc.constant('/'),
          fc.constant('/about'),
          fc.constant('/services'),
          fc.constant('/product'),
          fc.constant('/contact'),
          fc.string().map(s => `/${s}`)
        ),
        (route) => {
          // Render Header with the generated route
          render(
            <MemoryRouter initialEntries={[route]}>
              <Header />
            </MemoryRouter>
          );

          // Verify all five navigation links are present
          // Using getAllByText since links appear in both desktop and mobile menus
          const homeLinks = screen.getAllByText('Home');
          const aboutLinks = screen.getAllByText('About Us');
          const servicesLinks = screen.getAllByText('Services');
          const productLinks = screen.getAllByText('Ulti-Care');
          const contactLinks = screen.getAllByText('Contact Us');

          expect(homeLinks.length).toBeGreaterThanOrEqual(1);
          expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
          expect(servicesLinks.length).toBeGreaterThanOrEqual(1);
          expect(productLinks.length).toBeGreaterThanOrEqual(1);
          expect(contactLinks.length).toBeGreaterThanOrEqual(1);

          // Clean up after each property test run
          cleanup();
        }
      ),
      { numRuns: 100 }
    );
  });
});
