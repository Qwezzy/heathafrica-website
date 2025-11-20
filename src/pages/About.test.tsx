import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Page', () => {
  test('renders all content sections correctly', () => {
    render(<About />);
    
    // Check for Who We Are section
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    
    // Check for Mission, Vision, Values section
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
    expect(screen.getByText('Core Values')).toBeInTheDocument();
    
    // Check for Industries We Serve section
    expect(screen.getByText('Industries We Serve')).toBeInTheDocument();
  });

  test('displays all five core values', () => {
    render(<About />);
    
    // Check that all five core values are displayed
    expect(screen.getByText(/Integrity:/)).toBeInTheDocument();
    expect(screen.getByText(/Excellence:/)).toBeInTheDocument();
    expect(screen.getByText(/Collaboration:/)).toBeInTheDocument();
    expect(screen.getByText(/Innovation:/)).toBeInTheDocument();
    expect(screen.getByText(/Client-Centric Success:/)).toBeInTheDocument();
  });

  test('displays all four industry categories', () => {
    render(<About />);
    
    // Check that all four industry categories are displayed
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.getByText('NGOs & Non-Profits')).toBeInTheDocument();
    expect(screen.getByText('Government')).toBeInTheDocument();
    expect(screen.getByText('Private Sectors')).toBeInTheDocument();
  });
});
