import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';

describe('Contact Page', () => {
  test('renders form fields correctly', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    // Check that all form fields are present
    expect(screen.getByLabelText(/^name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interested in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('displays contact information for both offices', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    // Check Botswana office
    expect(screen.getByText('Botswana Operations')).toBeInTheDocument();
    expect(screen.getByText('Kirby Mothusi')).toBeInTheDocument();
    expect(screen.getByText('kirby.mothusi@heathafrica.com')).toBeInTheDocument();
    expect(screen.getByText('+267 71 696 631')).toBeInTheDocument();

    // Check South Africa office
    expect(screen.getByText('South Africa Operations')).toBeInTheDocument();
    expect(screen.getByText('Mphake Manyatshe')).toBeInTheDocument();
    expect(screen.getByText('mphake.manyatshe@heathafrica.com')).toBeInTheDocument();
    expect(screen.getByText('+27 82 787 6993')).toBeInTheDocument();
  });

  test('displays business hours', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday – Friday, 8:00 AM – 5:00 PM (CAT)')).toBeInTheDocument();
  });

  test('shows success message after valid submission', async () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    // Fill in the form
    const nameInput = screen.getByLabelText(/^name \*/i);
    const emailInput = screen.getByLabelText(/^email \*/i);
    const messageInput = screen.getByLabelText(/^message \*/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  test('shows validation errors for empty required fields', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Submit empty form
    fireEvent.click(submitButton);

    // Check for error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  test('shows validation error for invalid email format', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/^name \*/i);
    const emailInput = screen.getByLabelText(/^email \*/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/^message \*/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    // Use an email that passes HTML5 validation but fails our regex
    fireEvent.change(emailInput, { target: { value: 'invalid@email' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for email validation error
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});
