import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import { validateForm, FormData } from './ContactForm';

// Feature: heath-website, Property 1: Form Validation Completeness
describe('Form Validation Property', () => {
  test('prevents submission when any required field is empty', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.option(fc.string(), { nil: '' }),
          email: fc.option(fc.emailAddress(), { nil: '' }),
          message: fc.option(fc.string(), { nil: '' }),
          service: fc.string()
        }),
        (formData) => {
          const data: FormData = {
            name: formData.name || '',
            email: formData.email || '',
            message: formData.message || '',
            service: formData.service
          };

          const hasEmptyRequired = 
            !data.name.trim() || !data.email.trim() || !data.message.trim();
          
          const validationErrors = validateForm(data);
          const hasErrors = Object.keys(validationErrors).length > 0;
          
          // If any required field is empty, validation should fail
          if (hasEmptyRequired) {
            expect(hasErrors).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('validates email format for non-empty emails', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string().filter(s => s.trim().length > 0),
          email: fc.string().filter(s => s.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)),
          message: fc.string().filter(s => s.trim().length > 0),
          service: fc.string()
        }),
        (formData) => {
          const data: FormData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            service: formData.service
          };

          const validationErrors = validateForm(data);
          
          // Invalid email format should produce an error
          expect(validationErrors.email).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  test('accepts valid form data with all required fields filled', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string().filter(s => s.trim().length > 0),
          email: fc.emailAddress(),
          message: fc.string().filter(s => s.trim().length > 0),
          service: fc.string()
        }),
        (formData) => {
          const data: FormData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            service: formData.service
          };

          const validationErrors = validateForm(data);
          
          // Valid data should have no errors
          expect(Object.keys(validationErrors).length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
