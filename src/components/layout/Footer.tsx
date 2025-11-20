import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm sm:text-base">&copy; 2025 HEATH. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 text-sm sm:text-base" aria-label="Footer navigation">
          <Link to="/" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            About Us
          </Link>
          <Link to="/services" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            Services
          </Link>
          <Link to="/product" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            Ulti-Care
          </Link>
          <Link to="/contact" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            Contact Us
          </Link>
          <span className="text-slate-400 hidden sm:inline" aria-hidden="true">|</span>
          <a href="#" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors">
            Privacy Policy
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors" aria-label="LinkedIn (opens in new tab)">
            LinkedIn
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-colors" aria-label="Twitter (opens in new tab)">
            Twitter
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
