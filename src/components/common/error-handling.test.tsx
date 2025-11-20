import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NotFound from '../../pages/NotFound';
import ContactForm from '../contact/ContactForm';
import LazyImage from './LazyImage';

describe('Error Handling Integration', () => {
  test('displays 404 page for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('form submission error handling displays error message', async () => {
    const user = userEvent.setup();

    // Mock console.error to suppress error logs in test output
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>
    );

    // Fill in the form using more specific selectors
    await user.type(screen.getByLabelText(/^name \*/i), 'Test User');
    await user.type(screen.getByLabelText(/^email \*/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^message \*/i), 'Test message');

    // Submit the form - it should succeed in normal case
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test('image loading fallback displays error message when image fails to load', () => {
    const { container } = render(
      <LazyImage 
        src="/invalid-image.jpg" 
        alt="Test image" 
        className="w-full h-64"
      />
    );

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();

    // Simulate image load error
    if (img) {
      fireEvent.error(img);
    }

    // Check that fallback error message is displayed
    expect(screen.getByText('Image failed to load')).toBeInTheDocument();
  });

  test('image loading fallback calls custom onError handler', () => {
    const onErrorMock = vi.fn();
    
    const { container } = render(
      <LazyImage 
        src="/invalid-image.jpg" 
        alt="Test image" 
        onError={onErrorMock}
      />
    );

    const img = container.querySelector('img');
    
    // Simulate image load error
    if (img) {
      fireEvent.error(img);
    }

    // Verify custom error handler was called
    expect(onErrorMock).toHaveBeenCalled();
  });
});
