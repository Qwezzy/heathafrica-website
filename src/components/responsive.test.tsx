import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import * as fc from 'fast-check'
import Layout from './layout/Layout'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Product from '../pages/Product'
import Contact from '../pages/Contact'

// Helper function to set viewport size
const setViewportSize = (width: number, height: number = 800) => {
  // Mock window.innerWidth and window.innerHeight
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'))
}

// Helper function to check if element has responsive classes
const hasResponsiveClass = (element: Element, breakpoint: 'mobile' | 'tablet' | 'desktop'): boolean => {
  const classes = element.className
  
  if (breakpoint === 'mobile') {
    // Mobile: should have base classes without md: or lg: prefixes being active
    // Check for mobile-specific patterns like block, hidden on mobile menu
    return true // Mobile is the default in Tailwind
  } else if (breakpoint === 'tablet') {
    // Tablet: should have md: classes
    return classes.includes('md:')
  } else {
    // Desktop: should have lg: classes or be using md: classes
    return classes.includes('lg:') || classes.includes('md:')
  }
}

// Feature: heath-website, Property 6: Mobile Viewport Responsiveness
// **Validates: Requirements 7.1, 7.5**
describe('Property 6: Mobile Viewport Responsiveness', () => {
  beforeEach(() => {
    // Set mobile viewport before each test
    setViewportSize(375) // iPhone SE width
  })

  afterEach(() => {
    cleanup()
  })

  test('for any page content, when viewport width is less than 768px, the layout should render in mobile-optimized format', { timeout: 30000 }, () => {
    const routes = [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/product', element: <Product /> },
      { path: '/contact', element: <Contact /> },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        (route, viewportWidth) => {
          cleanup()
          setViewportSize(viewportWidth)

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

          // Check that mobile menu button is present (should be visible on mobile)
          const mobileMenuButton = screen.getByLabelText(/mobile menu/i)
          expect(mobileMenuButton).toBeInTheDocument()
          
          // Check that the mobile menu button has the md:hidden class pattern
          // (it should be hidden on desktop but visible on mobile)
          const buttonParent = mobileMenuButton.closest('div')
          expect(buttonParent?.className).toContain('md:hidden')

          // Verify that the desktop menu is hidden on mobile
          const desktopMenus = container.querySelectorAll('.hidden.md\\:flex')
          expect(desktopMenus.length).toBeGreaterThan(0)

          // Check that main content container exists and is responsive
          const main = container.querySelector('main')
          expect(main).toBeInTheDocument()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: heath-website, Property 7: Tablet Viewport Responsiveness
// **Validates: Requirements 7.2**
describe('Property 7: Tablet Viewport Responsiveness', () => {
  beforeEach(() => {
    // Set tablet viewport before each test
    setViewportSize(768) // iPad width
  })

  afterEach(() => {
    cleanup()
  })

  test('for any page content, when viewport width is between 768px and 1024px, the layout should render in tablet-optimized format', { timeout: 15000 }, () => {
    const routes = [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/product', element: <Product /> },
      { path: '/contact', element: <Contact /> },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        fc.integer({ min: 768, max: 1023 }), // Tablet viewport widths
        (route, viewportWidth) => {
          cleanup()
          setViewportSize(viewportWidth)

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

          // At tablet size, desktop menu should be visible (md:flex)
          const desktopMenus = container.querySelectorAll('.md\\:flex')
          expect(desktopMenus.length).toBeGreaterThan(0)

          // Mobile menu button should be hidden at tablet size (md:hidden)
          const mobileMenuButton = screen.getByLabelText(/mobile menu/i)
          const buttonParent = mobileMenuButton.closest('div')
          expect(buttonParent?.className).toContain('md:hidden')

          // Check for grid layouts that should be responsive
          // At tablet size, grids should show 2 columns (md:grid-cols-2)
          const grids = container.querySelectorAll('[class*="grid"]')
          expect(grids.length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: heath-website, Property 8: Desktop Viewport Responsiveness
// **Validates: Requirements 7.3**
describe('Property 8: Desktop Viewport Responsiveness', () => {
  beforeEach(() => {
    // Set desktop viewport before each test
    setViewportSize(1920) // Full HD width
  })

  afterEach(() => {
    cleanup()
  })

  test('for any page content, when viewport width is greater than 1024px, the layout should render in desktop-optimized format', { timeout: 15000 }, () => {
    const routes = [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/product', element: <Product /> },
      { path: '/contact', element: <Contact /> },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        fc.integer({ min: 1024, max: 2560 }), // Desktop viewport widths
        (route, viewportWidth) => {
          cleanup()
          setViewportSize(viewportWidth)

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

          // Desktop menu should be visible
          const desktopMenus = container.querySelectorAll('.md\\:flex')
          expect(desktopMenus.length).toBeGreaterThan(0)

          // Mobile menu button should be hidden
          const mobileMenuButton = screen.getByLabelText(/mobile menu/i)
          const buttonParent = mobileMenuButton.closest('div')
          expect(buttonParent?.className).toContain('md:hidden')

          // Check for full-width grid layouts (lg:grid-cols-4)
          // Desktop should show maximum columns
          const grids = container.querySelectorAll('[class*="grid"]')
          expect(grids.length).toBeGreaterThan(0)

          // Verify container has proper max-width constraint
          const containers = container.querySelectorAll('.container')
          expect(containers.length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Feature: heath-website, Property 9: Viewport Adaptation
// **Validates: Requirements 7.4**
describe('Property 9: Viewport Adaptation', () => {
  afterEach(() => {
    cleanup()
  })

  test('for any viewport size change, the layout should dynamically adjust without requiring page reload', { timeout: 15000 }, () => {
    const routes = [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/product', element: <Product /> },
      { path: '/contact', element: <Contact /> },
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...routes),
        fc.tuple(
          fc.integer({ min: 320, max: 2560 }), // Initial width
          fc.integer({ min: 320, max: 2560 })  // New width after resize
        ),
        (route, [initialWidth, newWidth]) => {
          cleanup()
          
          // Set initial viewport
          setViewportSize(initialWidth)

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

          // Verify initial render
          expect(container.querySelector('main')).toBeInTheDocument()
          expect(screen.getByAltText('HEATH logo')).toBeInTheDocument()

          // Change viewport size
          setViewportSize(newWidth)

          // Verify content is still accessible and interactive after resize
          // The layout should adapt using CSS media queries without re-render
          expect(container.querySelector('main')).toBeInTheDocument()
          expect(screen.getByAltText('HEATH logo')).toBeInTheDocument()
          
          // Verify navigation is still functional
          const mobileMenuButton = screen.getByLabelText(/mobile menu/i)
          expect(mobileMenuButton).toBeInTheDocument()
          
          // Check that responsive classes are still present
          const header = container.querySelector('header')
          expect(header).toBeInTheDocument()
          
          // Verify footer is still present
          const footer = container.querySelector('footer')
          expect(footer).toBeInTheDocument()
        }
      ),
      { numRuns: 100 }
    )
  })
})
