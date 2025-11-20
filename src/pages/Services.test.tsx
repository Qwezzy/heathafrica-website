import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from './Services';

describe('Services Page', () => {
  test('renders all seven services', () => {
    render(<Services />);
    
    // Check that all seven service titles are rendered
    expect(screen.getByText('Business Architecture & Digital Transformation')).toBeInTheDocument();
    expect(screen.getByText('Business Process Automation & Intelligent Rules Engine')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Analytics & Business Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Supply Chain Optimization')).toBeInTheDocument();
    expect(screen.getByText('System Integration & IT Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Advisory (Health System Strengthening, Service Delivery, Technical Assistance)')).toBeInTheDocument();
    expect(screen.getByText('AI Solutions & Ethical Adoption')).toBeInTheDocument();
  });

  test('AI service spans full width', () => {
    render(<Services />);
    
    // Find the AI service card by its title
    const aiServiceTitle = screen.getByText('AI Solutions & Ethical Adoption');
    const aiServiceCard = aiServiceTitle.closest('article');
    
    // Check that it has the full-width classes
    expect(aiServiceCard?.className).toContain('md:col-span-2');
    expect(aiServiceCard?.className).toContain('lg:col-span-3');
  });
});
