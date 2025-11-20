import { describe, test, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fc from 'fast-check';
import Footer from './Footer';

// Feature: heath-website, Property 10: Universal Footer Presence
// Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5
describe('Footer - Property 10: Universal Footer Presence', () => {
  test('footer contains copyright, quick links, social media links, and privacy policy on any route', { timeout: 60000 }, () => {
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
          // Render Footer with the generated route
          render(
            <MemoryRouter initialEntries={[route]}>
              <Footer />
            </MemoryRouter>
          );

          // Requirement 8.2: Copyright notice
          const copyrights = screen.getAllByText(/© 2025 HEATH/i);
          expect(copyrights.length).toBeGreaterThanOrEqual(1);

          // Requirement 8.3: Quick links to all main pages
          const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
          const aboutLinks = screen.getAllByRole('link', { name: /about us/i });
          const servicesLinks = screen.getAllByRole('link', { name: /^services$/i });
          const productLinks = screen.getAllByRole('link', { name: /ulti-care/i });
          const contactLinks = screen.getAllByRole('link', { name: /contact us/i });

          expect(homeLinks.length).toBeGreaterThanOrEqual(1);
          expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
          expect(servicesLinks.length).toBeGreaterThanOrEqual(1);
          expect(productLinks.length).toBeGreaterThanOrEqual(1);
          expect(contactLinks.length).toBeGreaterThanOrEqual(1);

          // Requirement 8.5: Privacy policy link
          const privacyLinks = screen.getAllByRole('link', { name: /privacy policy/i });
          expect(privacyLinks.length).toBeGreaterThanOrEqual(1);

          // Requirement 8.4: Social media links (LinkedIn, Twitter)
          const linkedInLinks = screen.getAllByRole('link', { name: /linkedin/i });
          const twitterLinks = screen.getAllByRole('link', { name: /twitter/i });

          expect(linkedInLinks.length).toBeGreaterThanOrEqual(1);
          expect(twitterLinks.length).toBeGreaterThanOrEqual(1);

          // Clean up after each property test run
          cleanup();
        }
      ),
      { numRuns: 50 }
    );
  });
});
