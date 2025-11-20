import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, waitFor, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Integration Tests', () => {
  afterEach(() => {
    cleanup()
  })
  describe('Routing Integration', () => {
    test('should navigate through all pages using navigation links', { timeout: 30000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      // Wait for initial page to load (Home page) - check for hero carousel
      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate to About page
      const aboutLink = screen.getAllByText('About Us')[0]
      await user.click(aboutLink)
      await waitFor(() => {
        expect(screen.getByText(/Who We Are/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate to Services page
      const servicesLink = screen.getAllByText('Services')[0]
      await user.click(servicesLink)
      await waitFor(() => {
        expect(screen.getByText(/Our Services/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate to Product page
      const productLink = screen.getAllByText('Ulti-Care')[0]
      await user.click(productLink)
      await waitFor(() => {
        expect(screen.getByText(/Revolutionizing Healthcare/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate to Contact page
      const contactLinks = screen.getAllByText('Contact Us')
      await user.click(contactLinks[0])
      await waitFor(() => {
        expect(screen.getByText(/Send Us a Message/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate back to Home
      const homeLink = screen.getAllByText('Home')[0]
      await user.click(homeLink)
      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })
    })
  })

  describe('Complete User Journey: Landing → Services → Contact Form', () => {
    test('should complete full user journey from landing to contact form submission', { timeout: 30000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      // Step 1: Start on landing page
      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      // Step 2: Click "Explore Our Solutions" CTA button (wait for it to appear)
      const ctaButton = await screen.findByRole('link', { name: /Explore Our Solutions/i }, { timeout: 10000 })
      await user.click(ctaButton)

      // Step 3: Verify we're on Services page
      await waitFor(() => {
        expect(screen.getByText(/Our Services/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Step 4: Navigate to Contact page
      const contactLinks = screen.getAllByText('Contact Us')
      await user.click(contactLinks[0])

      // Step 5: Verify we're on Contact page
      await waitFor(() => {
        expect(screen.getByText(/Send Us a Message/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Step 6: Fill out contact form
      const nameInput = screen.getByLabelText(/Name/i)
      const emailInput = screen.getByLabelText(/Email/i)
      const messageInput = screen.getByLabelText(/Message/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john.doe@example.com')
      await user.type(messageInput, 'I am interested in your healthcare solutions.')

      // Step 7: Submit form
      const submitButton = screen.getByRole('button', { name: /Submit/i })
      await user.click(submitButton)

      // Step 8: Verify success message appears
      await waitFor(() => {
        expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument()
      }, { timeout: 10000 })
    })
  })

  describe('Form Submission Flow End-to-End', () => {
    test('should handle complete form submission flow with validation', { timeout: 30000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      // Navigate to contact page first
      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      const contactLinks = screen.getAllByText('Contact Us')
      await user.click(contactLinks[0])

      await waitFor(() => {
        expect(screen.getByText(/Send Us a Message/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Test validation: Submit empty form
      const submitButton = screen.getByRole('button', { name: /Submit/i })
      await user.click(submitButton)

      // Verify validation errors appear
      await waitFor(() => {
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Message is required/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Fill out form with valid data
      const nameInput = screen.getByRole('textbox', { name: /Name/i })
      const emailInput = screen.getByRole('textbox', { name: /Email/i })
      const messageInput = screen.getByRole('textbox', { name: /Message/i })

      await user.type(nameInput, 'Jane Smith')
      await user.type(emailInput, 'jane.smith@example.com')
      await user.type(messageInput, 'Looking forward to working with you.')

      // Submit form
      await user.click(submitButton)

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument()
      }, { timeout: 10000 })
    })
  })

  describe('Mobile Menu Interaction Flow', () => {
    test('should open and close mobile menu', { timeout: 15000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      // Find mobile menu button
      const mobileMenuButton = screen.getByLabelText(/Open mobile menu/i)
      
      // Verify mobile menu is initially hidden
      const mobileMenu = screen.getByTestId('mobile-menu')
      expect(mobileMenu).toHaveClass('hidden')

      // Open mobile menu
      await user.click(mobileMenuButton)

      // Verify mobile menu is visible
      await waitFor(() => {
        expect(mobileMenu).not.toHaveClass('hidden')
      })

      // Verify button label changed
      expect(screen.getByLabelText(/Close mobile menu/i)).toBeInTheDocument()
    })

    test('should navigate through all pages using mobile menu', { timeout: 20000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      // Open mobile menu
      const mobileMenuButton = screen.getByLabelText(/Open mobile menu/i)
      await user.click(mobileMenuButton)

      const mobileMenu = screen.getByTestId('mobile-menu')
      await waitFor(() => {
        expect(mobileMenu).not.toHaveClass('hidden')
      })

      // Navigate to About page via mobile menu
      const aboutLink = within(mobileMenu).getByText('About Us')
      await user.click(aboutLink)

      await waitFor(() => {
        expect(screen.getByText(/Who We Are/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Verify mobile menu closes after navigation
      expect(mobileMenu).toHaveClass('hidden')

      // Open menu again and navigate to Services
      await user.click(screen.getByLabelText(/Open mobile menu/i))
      await waitFor(() => {
        expect(mobileMenu).not.toHaveClass('hidden')
      })

      const servicesLink = within(mobileMenu).getByText('Services')
      await user.click(servicesLink)

      await waitFor(() => {
        expect(screen.getByText(/Our Services/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Verify menu closes again
      expect(mobileMenu).toHaveClass('hidden')
    })
  })

  describe('Logo Navigation', () => {
    test('should navigate to home from any page when clicking logo', { timeout: 20000 }, async () => {
      const user = userEvent.setup()
      render(<App />)

      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })

      // Navigate to Contact page
      const contactLinks = screen.getAllByText('Contact Us')
      await user.click(contactLinks[0])
      await waitFor(() => {
        expect(screen.getByText(/Send Us a Message/i)).toBeInTheDocument()
      }, { timeout: 10000 })

      // Click logo to go back to home
      const logo = screen.getByAltText('HEATH logo')
      await user.click(logo)

      await waitFor(() => {
        const heroSection = screen.getByRole('region', { name: /Hero carousel/i })
        expect(heroSection).toBeInTheDocument()
      }, { timeout: 10000 })
    })
  })
})
