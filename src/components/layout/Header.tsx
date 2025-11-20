import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LazyImage from '../common/LazyImage';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-sky-600 transition-colors'
      : 'text-slate-600 hover:text-sky-600 transition-colors';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex justify-between items-center" aria-label="Main navigation">
        <Link to="/" className="flex items-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded transition-opacity" aria-label="HEATH home">
          <LazyImage 
            src="/img/HEATH Logo B transparent.png" 
            alt="HEATH logo" 
            className="h-16 sm:h-20 md:h-24 w-auto" 
            loading="eager"
          />
          <span className="sr-only">HEATH</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center text-sm lg:text-base">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to="/product" className={navLinkClass}>
            Ulti-Care
          </NavLink>
          <NavLink
            to="/contact"
            className="bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            Contact Us
          </NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            id="mobile-menu-button"
            onClick={toggleMobileMenu}
            className="text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        data-testid="mobile-menu"
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}
        aria-label="Mobile navigation"
      >
        <NavLink
          to="/"
          className="block py-3 px-4 text-base text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="block py-3 px-4 text-base text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          About Us
        </NavLink>
        <NavLink
          to="/services"
          className="block py-3 px-4 text-base text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Services
        </NavLink>
        <NavLink
          to="/product"
          className="block py-3 px-4 text-base text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Ulti-Care
        </NavLink>
        <NavLink
          to="/contact"
          className="block py-3 px-4 text-base text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
