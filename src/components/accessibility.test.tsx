import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fc from 'fast-check';
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

// Feature: heath-website, Property 13: Keyboard Navigation Accessibility
describe('Property 13: Keyboard Navigation Accessibility', () => {
  test('all interactive elements should be keyboard accessible', () => {
    const pages = [
      { name: 'Home', component: <Home /> },
      { name: 'About', component: <About /> },
      { name: 'Services', component: <Services /> },
      { name: 'Product', component: <Product /> },
      { name: 'Contact', component: <Contact /> },
    ];

    pages.forEach(({ name, component }) => {
      const { container } = renderWithRouter(component);
      
      // Get all interactive elements
      const interactiveElements = container.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      // Verify each interactive element is keyboard accessible
      interactiveElements.forEach((element) => {
        // Check that element is not disabled
        const isDisabled = element.hasAttribute('disabled');
        
        // Check that element has tabindex >= 0 or is naturally focusable
        const tabIndex = element.getAttribute('tabindex');
        const isNaturallyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
        
        const isKeyboardAccessible = !isDisabled && (isNaturallyFocusable || (tabIndex !== null && parseInt(tabIndex) >= 0));
        
        expect(isKeyboardAccessible).toBe(true);
      });
    });
  });

  test('interactive elements in full app should have focus styles', () => {
    const { container } = render(<App />);
    
    // Verify that interactive elements have focus styles
    // This is done by checking for focus-related classes or styles
    const elementsWithFocusStyles = container.querySelectorAll(
      '[class*="focus:"], [class*="focus-visible:"]'
    );
    
    expect(elementsWithFocusStyles.length).toBeGreaterThan(0);
  });
});

// Feature: heath-website, Property 14: Semantic Accessibility Structure
describe('Property 14: Semantic Accessibility Structure', () => {
  test('all pages should use semantic HTML elements', () => {
    const pages = [
      { name: 'Home', component: <Home /> },
      { name: 'About', component: <About /> },
      { name: 'Services', component: <Services /> },
      { name: 'Product', component: <Product /> },
      { name: 'Contact', component: <Contact /> },
    ];

    pages.forEach(({ name, component }) => {
      const { container } = renderWithRouter(component);
      
      // Check for semantic elements
      const hasMain = container.querySelector('main') !== null;
      const hasSections = container.querySelectorAll('section').length > 0;
      
      // At least one semantic element should be present
      expect(hasMain || hasSections).toBe(true);
      
      // Check for proper heading hierarchy (h1 should exist)
      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBeGreaterThan(0);
    });
  });

  test('full application should have proper ARIA labels', () => {
    const { container } = render(<App />);
    
    // Check for navigation with aria-label
    const navElements = container.querySelectorAll('nav[aria-label]');
    expect(navElements.length).toBeGreaterThan(0);
    
    // Verify header navigation has aria-label
    const headerNav = container.querySelector('header nav[aria-label]');
    expect(headerNav).toBeTruthy();
    
    // Check for buttons with aria-label
    const buttonsWithAriaLabel = container.querySelectorAll('button[aria-label]');
    expect(buttonsWithAriaLabel.length).toBeGreaterThan(0);
  });

  test('form elements should have proper ARIA attributes', () => {
    const { container } = renderWithRouter(<Contact />);
    
    // Check for form with aria-labelledby
    const form = container.querySelector('form[aria-labelledby]');
    expect(form).toBeTruthy();
    
    // Check for inputs with aria-required
    const requiredInputs = container.querySelectorAll('input[aria-required="true"], textarea[aria-required="true"]');
    expect(requiredInputs.length).toBeGreaterThan(0);
  });
});

// Feature: heath-website, Property 15: Image Alternative Text
describe('Property 15: Image Alternative Text', () => {
  test('all meaningful images should have descriptive alt text', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { name: 'Home', component: <Home /> },
          { name: 'About', component: <About /> },
          { name: 'Services', component: <Services /> },
          { name: 'Product', component: <Product /> },
          { name: 'Contact', component: <Contact /> }
        ),
        (page) => {
          const { container } = renderWithRouter(page.component);
          
          // Get all img elements
          const images = container.querySelectorAll('img');
          
          // Verify each image has alt attribute
          images.forEach((img) => {
            const altText = img.getAttribute('alt');
            
            // Alt attribute should exist (can be empty for decorative images)
            expect(altText).not.toBeNull();
            
            // For meaningful images (not decorative), alt should not be empty
            // We consider images with src containing "logo" as meaningful
            const src = img.getAttribute('src') || '';
            if (src.toLowerCase().includes('logo')) {
              expect(altText).toBeTruthy();
              expect(altText!.length).toBeGreaterThan(0);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  test('logo images should have descriptive alt text', () => {
    const { container } = render(<App />);
    
    // Find logo images
    const logoImages = Array.from(container.querySelectorAll('img')).filter(
      (img) => img.getAttribute('src')?.includes('logo')
    );
    
    // Verify each logo has meaningful alt text
    logoImages.forEach((logo) => {
      const altText = logo.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText!.length).toBeGreaterThan(0);
    });
  });
});

// Feature: heath-website, Property 16: Text Contrast Compliance
describe('Property 16: Text Contrast Compliance', () => {
  test('text elements should use color classes that meet WCAG contrast requirements', () => {
    const pages = [
      { name: 'Home', component: <Home /> },
      { name: 'About', component: <About /> },
      { name: 'Services', component: <Services /> },
      { name: 'Product', component: <Product /> },
      { name: 'Contact', component: <Contact /> },
    ];

    pages.forEach(({ name, component }) => {
      const { container } = renderWithRouter(component);
      
      // Get all text elements
      const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');
      
      // Check that text elements use appropriate color classes
      // Tailwind's default colors meet WCAG standards when used properly
      const problematicColors = ['text-slate-100', 'text-slate-200', 'text-gray-100', 'text-gray-200'];
      
      textElements.forEach((element) => {
        const className = element.className;
        
        // Check if element uses problematic light colors on light backgrounds
        const usesProblematicColor = problematicColors.some(color => className.includes(color));
        
        // If using light text, should be on dark background
        if (usesProblematicColor) {
          const parent = element.parentElement;
          const parentClassName = parent?.className || '';
          
          // Should have dark background
          const hasDarkBackground = 
            parentClassName.includes('bg-slate-800') ||
            parentClassName.includes('bg-slate-900') ||
            parentClassName.includes('bg-black') ||
            parentClassName.includes('bg-sky-600') ||
            parentClassName.includes('bg-sky-700');
          
          expect(hasDarkBackground).toBe(true);
        }
      });
      
      // Verify that we're using appropriate text colors
      // slate-600, slate-700, slate-800, slate-900 on white backgrounds meet WCAG AA
      const appropriateTextColors = container.querySelectorAll(
        '[class*="text-slate-600"], [class*="text-slate-700"], [class*="text-slate-800"], [class*="text-slate-900"], [class*="text-white"]'
      );
      
      expect(appropriateTextColors.length).toBeGreaterThan(0);
    });
  });

  test('interactive elements should have sufficient contrast', () => {
    const { container } = render(<App />);
    
    // Check buttons have appropriate colors
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      const className = button.className;
      
      // Primary buttons should have sky-600 or darker
      if (className.includes('bg-sky')) {
        expect(
          className.includes('bg-sky-600') || 
          className.includes('bg-sky-700') ||
          className.includes('bg-sky-800')
        ).toBe(true);
      }
    });
    
    // Check links have appropriate colors
    const links = container.querySelectorAll('a');
    links.forEach((link) => {
      const className = link.className;
      
      // Links should use sky-600 or darker for sufficient contrast
      if (className.includes('text-sky')) {
        expect(
          className.includes('text-sky-600') || 
          className.includes('text-sky-700') ||
          className.includes('text-sky-800')
        ).toBe(true);
      }
    });
  });
});
