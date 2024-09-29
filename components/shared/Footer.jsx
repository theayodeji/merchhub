const Footer = () => {
    return (
      <footer className="bg-black text-white py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and About */}
            <div>
                <img src="/assets/logo.png" alt="" width={200}/>
              <p className="text-gray-400">
                Your brand's tagline or short description goes here. Engage with
                your audience and let them know more about you.
              </p>
            </div>
  
            {/* Useful Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">MerchHub Experience</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-500">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-500">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact & Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 mb-2">
                Email: info@yourbrand.com
              </p>
              <p className="text-gray-400 mb-6">
                Phone: +123 456 789
              </p>
  
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.559c-.885.392-1.833.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.923 2.203-4.923 4.922 0 .386.044.762.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.481 0 1.713.87 3.225 2.188 4.111-.808-.026-1.568-.247-2.231-.616v.061c0 2.393 1.703 4.389 3.96 4.84-.415.113-.853.174-1.304.174-.319 0-.63-.031-.934-.089.631 1.968 2.463 3.4 4.635 3.437-1.698 1.33-3.835 2.125-6.153 2.125-.4 0-.796-.023-1.186-.069 2.191 1.404 4.79 2.221 7.582 2.221 9.096 0 14.074-7.538 14.074-14.075 0-.215-.005-.429-.015-.641.966-.697 1.804-1.57 2.465-2.566z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184H4.383A1.186 1.186 0 003.2 4.369v15.232a1.187 1.187 0 001.183 1.184h15.232a1.188 1.188 0 001.184-1.184V4.369a1.187 1.187 0 00-1.184-1.185zM8.85 19.232H5.924V9.37H8.85v9.862zM7.386 8.231a1.65 1.65 0 110-3.301 1.65 1.65 0 010 3.301zm11.46 11h-2.928v-4.889c0-1.162-.021-2.659-1.62-2.659-1.621 0-1.868 1.268-1.868 2.579v4.969h-2.927V9.37h2.813v1.355h.039c.392-.744 1.352-1.525 2.783-1.525 2.976 0 3.525 1.958 3.525 4.504v5.527z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c-5.454 0-9.855 4.412-9.855 9.854 0 4.355 2.827 8.06 6.762 9.367.493.091.679-.214.679-.478v-1.71c-2.744.596-3.344-1.326-3.344-1.326-.448-1.136-1.095-1.44-1.095-1.44-.897-.615.068-.603.068-.603 1.002.07 1.532 1.036 1.532 1.036.88 1.505 2.31 1.07 2.874.819.091-.637.344-1.07.626-1.315-2.19-.249-4.493-1.1-4.493-4.9 0-1.082.387-1.964 1.025-2.655-.104-.25-.446-1.262.099-2.632 0 0 .838-.267 2.745 1.02A9.556 9.556 0 0112 6.844a9.63 9.63 0 012.503.336c1.907-1.287 2.745-1.02 2.745-1.02.544 1.37.202 2.383.1 2.633.64.692 1.025 1.573 1.025 2.655 0 3.81-2.308 4.649-4.51 4.892.354.308.674.916.674 1.848v2.739c0 .267.182.574.687.475a9.884 9.884 0 006.765-9.374c0-5.442-4.402-9.854-9.856-9.854z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Your Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  