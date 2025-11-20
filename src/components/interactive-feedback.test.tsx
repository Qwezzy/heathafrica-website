import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fc from 'fast-check';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ContactForm from './contact/ContactForm';
import HeroSlider from './home/HeroSlider';
import ValuePropositions from './home/ValuePropositions';
import ServiceCard from './services/ServiceCard';

// Feature: heath-website, Property 11: Interactive Element Feedback
// **Validates: Requirements 9.5**

describe('Interactive Element Feedback Property Tests', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  // Helper function to check if an element has hover state classes
  const hasHoverState = (element: Element): boolean => {
    const className = element.className;
    // Check computed styles for hover capability
    const computedStyle = window.getComputedStyle(element);
    return className.includes('hover:') || computedStyle.cursor === 'pointer';
  };

  // Helper function to check if an element has focus state classes
  const hasFocusState = (element: Element): boolean => {
    const className = element.className;
    return className.includes('focus:') || className.includes('focus-visible:');
  };

  // Helper function to check if an element has transition classes
  const hasTransition = (element: Element): boolean => {
    const className = element.className;
    const computedStyle = window.getComputedStyle(element);
    return className.includes('transition') || computedStyle.transitionDuration !== '0s';
  };

  test('Property 11: All buttons have hover and focus states with transitions', () => {
    // Test Header buttons
    const { container: headerContainer } = renderWithRouter(<Header />);
    const headerButtons = headerContainer.querySelectorAll('button');
    
    headerButtons.forEach((button) => {
      expect(
        hasHoverState(button) || hasFocusState(button),
        `Button should have hover or focus state: ${button.textContent}`
      ).toBe(true);
      expect(
        hasTransition(button),
        `Button should have transition: ${button.textContent}`
      ).toBe(true);
    });

    // Test ContactForm buttons
    const { container: formContainer } = renderWithRouter(<ContactForm />);
    const formButtons = formContainer.querySelectorAll('button');
    
    formButtons.forEach((button) => {
      expect(
        hasHoverState(button) || hasFocusState(button),
        `Form button should have hover or focus state: ${button.textContent}`
      ).toBe(true);
      expect(
        hasTransition(button),
        `Form button should have transition: ${button.textContent}`
      ).toBe(true);
    });
  });

  test('Property 11: All links have hover and focus states with transitions', () => {
    // Test Header links
    const { container: headerContainer } = renderWithRouter(<Header />);
    const headerLinks = headerContainer.querySelectorAll('a');
    
    headerLinks.forEach((link) => {
      expect(
        hasHoverState(link) || hasFocusState(link),
        `Link should have hover or focus state: ${link.textContent}`
      ).toBe(true);
      expect(
        hasTransition(link),
        `Link should have transition: ${link.textContent}`
      ).toBe(true);
    });

    // Test Footer links
    const { container: footerContainer } = renderWithRouter(<Footer />);
    const footerLinks = footerContainer.querySelectorAll('a');
    
    footerLinks.forEach((link) => {
      expect(
        hasHoverState(link) || hasFocusState(link),
        `Footer link should have hover or focus state: ${link.textContent}`
      ).toBe(true);
      expect(
        hasTransition(link),
        `Footer link should have transition: ${link.textContent}`
      ).toBe(true);
    });

    // Test HeroSlider links
    const { container: sliderContainer } = renderWithRouter(<HeroSlider />);
    const sliderLinks = sliderContainer.querySelectorAll('a');
    
    sliderLinks.forEach((link) => {
      expect(
        hasHoverState(link) || hasFocusState(link),
        `Slider link should have hover or focus state: ${link.textContent}`
      ).toBe(true);
      expect(
        hasTransition(link),
        `Slider link should have transition: ${link.textContent}`
      ).toBe(true);
    });
  });

  test('Property 11: All form inputs have focus states', () => {
    const { container } = renderWithRouter(<ContactForm />);
    
    // Test text inputs
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      expect(
        hasFocusState(input),
        `Input should have focus state: ${input.name}`
      ).toBe(true);
    });

    // Test textareas
    const textareas = container.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      expect(
        hasFocusState(textarea),
        `Textarea should have focus state: ${textarea.name}`
      ).toBe(true);
    });

    // Test selects
    const selects = container.querySelectorAll('select');
    selects.forEach((select) => {
      expect(
        hasFocusState(select),
        `Select should have focus state: ${select.name}`
      ).toBe(true);
    });
  });

  test('Property 11: Cards with hover effects have transitions', () => {
    const { container: valuePropsContainer } = renderWithRouter(<ValuePropositions />);
    const valueCards = valuePropsContainer.querySelectorAll('.shadow-md');
    
    valueCards.forEach((card) => {
      if (hasHoverState(card)) {
        expect(
          hasTransition(card),
          'Card with hover state should have transition'
        ).toBe(true);
      }
    });

    // Test ServiceCard
    const { container: serviceCardContainer } = render(
      <ServiceCard
        title="Test Service"
        description="Test description"
        features={['Feature 1', 'Feature 2']}
      />
    );
    const serviceCard = serviceCardContainer.querySelector('.shadow-md');
    if (serviceCard) {
      if (hasHoverState(serviceCard)) {
        expect(
          hasTransition(serviceCard),
          'ServiceCard with hover state should have transition'
        ).toBe(true);
      }
    }
  });

  // Property-based test: For any interactive element type, verify it has appropriate feedback
  test('Property 11 (PBT): Interactive elements have consistent feedback patterns', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { component: <Header />, name: 'Header' },
          { component: <Footer />, name: 'Footer' },
          { component: <ContactForm />, name: 'ContactForm' },
          { component: <HeroSlider />, name: 'HeroSlider' },
          { component: <ValuePropositions />, name: 'ValuePropositions' }
        ),
        (testCase) => {
          const { container } = renderWithRouter(testCase.component);
          
          // Check all buttons
          const buttons = container.querySelectorAll('button');
          buttons.forEach((button) => {
            const hasInteractiveFeedback = 
              (hasHoverState(button) || hasFocusState(button)) && 
              hasTransition(button);
            
            expect(
              hasInteractiveFeedback,
              `${testCase.name}: Button "${button.textContent}" should have interactive feedback`
            ).toBe(true);
          });

          // Check all links
          const links = container.querySelectorAll('a');
          links.forEach((link) => {
            const hasInteractiveFeedback = 
              (hasHoverState(link) || hasFocusState(link)) && 
              hasTransition(link);
            
            expect(
              hasInteractiveFeedback,
              `${testCase.name}: Link "${link.textContent}" should have interactive feedback`
            ).toBe(true);
          });

          // Check all form inputs
          const inputs = container.querySelectorAll('input, textarea, select');
          inputs.forEach((input) => {
            const hasFocusFeedback = hasFocusState(input);
            
            expect(
              hasFocusFeedback,
              `${testCase.name}: Input "${(input as HTMLInputElement).name}" should have focus feedback`
            ).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
