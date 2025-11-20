import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <div id="main-content" className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
