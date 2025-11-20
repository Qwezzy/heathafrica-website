import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Product from './Product';

describe('Product Page', () => {
  test('renders all sections with correct content', () => {
    render(<Product />);
    
    // Check for ProductHero section
    expect(screen.getByText('Ulti-Care')).toBeInTheDocument();
    expect(screen.getByText('Revolutionizing Healthcare Through Integrated Digital Solutions')).toBeInTheDocument();
    
    // Check for ChallengeSolution section
    expect(screen.getByText('The Challenge')).toBeInTheDocument();
    expect(screen.getByText('Our Solution')).toBeInTheDocument();
    
    // Check for FeaturesSection
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    
    // Check for PerfectFor section
    expect(screen.getByText('Perfect For')).toBeInTheDocument();
    expect(screen.getByText('The Transformation')).toBeInTheDocument();
  });

  test('features grid displays correctly', () => {
    render(<Product />);
    
    // Check that all three features are displayed
    expect(screen.getByText('Predictive Analytics')).toBeInTheDocument();
    expect(screen.getByText('Integrated Care Delivery')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Symptom Checker')).toBeInTheDocument();
    
    // Check feature descriptions are present
    expect(screen.getByText(/Intelligent algorithms analyze patient data/)).toBeInTheDocument();
    expect(screen.getByText(/Integrated platform connecting virtual consultations/)).toBeInTheDocument();
    expect(screen.getByText(/Intelligent triage in multiple languages/)).toBeInTheDocument();
  });

  test('"Perfect For" tags are all displayed', () => {
    render(<Product />);
    
    // Check that all five "Perfect For" tags are displayed
    expect(screen.getByText('Rural and remote communities')).toBeInTheDocument();
    expect(screen.getByText('Healthcare organizations expanding their reach')).toBeInTheDocument();
    expect(screen.getByText('Government health programs seeking cost-effective solutions')).toBeInTheDocument();
    expect(screen.getByText('NGOs focused on improving community health outcomes')).toBeInTheDocument();
    expect(screen.getByText('Health systems requiring integrated care delivery')).toBeInTheDocument();
  });
});
