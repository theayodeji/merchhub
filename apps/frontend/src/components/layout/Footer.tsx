import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 mb-4 block">
              MerchHub
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Elevating independent commerce.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-500 hover:text-gray-900 text-sm">Products</Link></li>
              <li><Link to="/categories" className="text-gray-500 hover:text-gray-900 text-sm">Categories</Link></li>
              <li><Link to="/creators" className="text-gray-500 hover:text-gray-900 text-sm">Creators</Link></li>
            </ul>
          </div>

          {/* Creators Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Creators</h3>
            <ul className="space-y-3">
              <li><Link to="/start-selling" className="text-gray-500 hover:text-gray-900 text-sm">Start Selling</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-gray-900 text-sm">Creator Login</Link></li>
              <li><Link to="/resources" className="text-gray-500 hover:text-gray-900 text-sm">Resources</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-gray-500 hover:text-gray-900 text-sm">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MerchHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
