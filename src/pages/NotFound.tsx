import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-sky-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-slate-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/contact"
            className="inline-block bg-white text-sky-600 border-2 border-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
