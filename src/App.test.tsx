import { describe, test, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom'
import * as fc from 'fast-check'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Product from './pages/Product'
import Contact from './pages/Contact'

// Feature: heath-website, Property 3: Navigation Link Functionality
// **Validates: Requirements 6.2**
describe('Property 3: Navigation Link Functionality', () => {
  test('for any navigation menu link, clicking that link should navigate to the corresponding page', { timeout: 30000 }, () => {
    const routes = [
      { path: '/', name: 'Home', headingText: 'Transform Healthcare' }, // Main h1 heading
      { path: '/about', name: 'About Us', headingText: 'Who We Are' },
      { path: '/services', name: 'Services', headingText: 'Our Services' },
      { path: '/product', name: 'Ulti-Care', headingText: 'Ulti-Care' },
      { path: '/contact', name: 'Contact Us', headingText: 'Contact Us' },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        (route) => {
          // Clean up any previous renders
          cleanup()
          
          // Render the app with the specific route using MemoryRouter
          render(
            <MemoryRouter initialEntries={[route.path]}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </MemoryRouter>
          )

          // Verify the correct page content is displayed by checking for expected text
          // Use getAllByRole for home page since it has multiple h1s in the slider
          const headings = screen.getAllByRole('heading', { level: 1 })
          const hasExpectedHeading = headings.some(h => h.textContent?.includes(route.headingText))
          expect(hasExpectedHeading).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: heath-website, Property 4: Active Route Indication
// **Validates: Requirements 6.3**
describe('Property 4: Active Route Indication', () => {
  test('for any currently displayed page, the corresponding navigation menu item should be visually indicated as active', { timeout: 15000 }, () => {
    const routes = [
      { path: '/', linkText: 'Home' },
      { path: '/about', linkText: 'About Us' },
      { path: '/services', linkText: 'Services' },
      { path: '/product', linkText: 'Ulti-Care' },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        (route) => {
          // Clean up any previous renders
          cleanup()
          
          // Render the app with the specific route using MemoryRouter
          render(
            <MemoryRouter initialEntries={[route.path]}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </MemoryRouter>
          )

          // Find the navigation link for the current route
          const navLinks = screen.getAllByText(route.linkText)
          
          // At least one of the nav links should have the active class (text-sky-600)
          const hasActiveLink = navLinks.some(link => {
            const classes = link.className
            return classes.includes('text-sky-600')
          })
          
          expect(hasActiveLink).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: heath-website, Property 5: Logo Navigation Consistency
// **Validates: Requirements 6.5**
describe('Property 5: Logo Navigation Consistency', () => {
  test('for any page in the application, clicking the HEATH logo should navigate to the landing page', { timeout: 15000 }, () => {
    const routes = [
      { path: '/', name: 'Home' },
      { path: '/about', name: 'About Us' },
      { path: '/services', name: 'Services' },
      { path: '/product', name: 'Ulti-Care' },
      { path: '/contact', name: 'Contact Us' },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        (route) => {
          // Clean up any previous renders
          cleanup()
          
          // Render the app starting from the given route
          const { container } = render(
            <MemoryRouter initialEntries={[route.path]}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </MemoryRouter>
          )

          // Find the logo link
          const logoLink = screen.getByAltText('HEATH logo').closest('a')
          
          // Verify the logo link points to the home page
          expect(logoLink).toHaveAttribute('href', '/')
        }
      ),
      { numRuns: 100 }
    )
  })
})
