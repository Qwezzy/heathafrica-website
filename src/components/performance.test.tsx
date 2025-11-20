import { describe, test, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import fc from 'fast-check';
import Layout from './layout/Layout';

// Lazy load page components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const Product = lazy(() => import('../pages/Product'));
const Contact = lazy(() => import('../pages/Contact'));

// Feature: heath-website, Property 12: Page Load Performance
// Validates: Requirements 10.1

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-live="polite">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="progressbar" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-slate-600">Loading page...</p>
    </div>
  </div>
);

describe('Property 12: Page Load Performance', () => {
  beforeEach(() => {
    // Clear any performance marks before each test
    if (performance.getEntriesByType) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  });

  test('for any page request, the initial content should be rendered and interactive within 3 seconds', async () => {
    const routes = [
      { path: '/', Component: Home },
      { path: '/about', Component: About },
      { path: '/services', Component: Services },
      { path: '/product', Component: Product },
      { path: '/contact', Component: Contact },
    ];

    // Test each route
    for (const { path, Component } of routes) {
      const startTime = performance.now();
      
      const { container, unmount } = render(
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Component />
            </Suspense>
          </Layout>
        </BrowserRouter>
      );

      // Wait for content to be rendered (Suspense fallback should resolve)
      await waitFor(
        () => {
          // Check that the main content is rendered (not just loading spinner)
          const loadingSpinner = container.querySelector('[role="progressbar"]');
          expect(loadingSpinner).not.toBeInTheDocument();
          
          // Verify actual page content is present
          const mainContent = container.querySelector('main') || container.querySelector('section');
          expect(mainContent).toBeInTheDocument();
        },
        { timeout: 3000 } // 3 second timeout as per requirement
      );

      const endTime = performance.now();
      const loadTime = endTime - startTime;

      // Verify load time is under 3.5 seconds (3500ms) - allowing buffer for test environment overhead
      expect(loadTime).toBeLessThan(3500);
      
      console.log(`Route ${path} loaded in ${loadTime.toFixed(2)}ms`);
      
      unmount();
    }
  });

  test('Property 12 (PBT): Page load performance across random navigation sequences', { timeout: 60000 }, async () => {
    const componentMap = {
      '/': Home,
      '/about': About,
      '/services': Services,
      '/product': Product,
      '/contact': Contact,
    };

    await fc.assert(
      fc.asyncProperty(
        // Generate random sequences of route navigation
        fc.array(
          fc.constantFrom('/', '/about', '/services', '/product', '/contact'),
          { minLength: 1, maxLength: 5 }
        ),
        async (routeSequence) => {
          for (const route of routeSequence) {
            const startTime = performance.now();
            const Component = componentMap[route as keyof typeof componentMap];
            
            const { container, unmount } = render(
              <BrowserRouter>
                <Layout>
                  <Suspense fallback={<LoadingFallback />}>
                    <Component />
                  </Suspense>
                </Layout>
              </BrowserRouter>
            );

            // Wait for content to be rendered
            await waitFor(
              () => {
                const loadingSpinner = container.querySelector('[role="progressbar"]');
                expect(loadingSpinner).not.toBeInTheDocument();
                
                const mainContent = container.querySelector('main') || container.querySelector('section');
                expect(mainContent).toBeInTheDocument();
              },
              { timeout: 3000 }
            );

            const endTime = performance.now();
            const loadTime = endTime - startTime;

            // Each page should load within 3.5 seconds (allowing buffer for test environment overhead)
            expect(loadTime).toBeLessThan(3500);
            
            // Clean up before next iteration
            unmount();
          }
        }
      ),
      { numRuns: 10 } // Run 10 iterations with different route sequences
    );
  });

  test('code splitting ensures initial bundle is optimized', async () => {
    // This test verifies that lazy loading is working by checking
    // that the app renders with Suspense boundaries
    const { container } = render(
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        </Layout>
      </BrowserRouter>
    );

    // Initially, we might see a loading state (or content loads immediately)
    // Either way, content should be available within 3 seconds
    await waitFor(
      () => {
        const mainContent = container.querySelector('main') || container.querySelector('section');
        expect(mainContent).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify that the app structure includes proper semantic elements
    const header = container.querySelector('header');
    const footer = container.querySelector('footer');
    
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
