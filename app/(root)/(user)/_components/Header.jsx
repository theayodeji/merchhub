import React from "react";

const Header = () => {
  return (
    <header className="">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="">
          <a href="/" className="hover:text-red-500 transition">
            <img src="/assets/logo.png" alt="" width={150}/>
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-red-500 transition">
            Home
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Marketplace
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Categories
          </a>
          <a href="#" className="hover:text-red-500 transition">
            About Us
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button id="mobile-menu-button" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* User Actions (Cart, Profile) */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-red-500 transition">
            <img src="/assets/Cart.svg" alt="" width={32}/>
          </a>
          <a href="#" className="hover:text-red-500 transition">
            <img src="" alt="" />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-gray-800">
        <nav className="flex flex-col space-y-4 px-6 py-4">
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            Home
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            Marketplace
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            Categories
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            About Us
          </a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
