'use client'

import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import Searchbar from "./Searchbar";
import Avatar from "./Avatar";
import Notifications from "./Notifications";
import { useState } from "react";

const Topbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return user ? (
    <div className="topbar px-2 sm:px-5 py-3 flex items-center mb-6">
      <Breadcrumb username={"Kai"} />
      <Searchbar />
      <Notifications />
      <Avatar image={"/assets/avatar.webp"} username={"Kai Cenat"} />
    </div>
  ) : (
    <header className="bg-black text-white mb-6">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <img src="/assets/logo.png" alt="" width={150}/>
        </div>

        {/* Desktop NavLinks */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-red-500">
            Home
          </a>
          <a href="/marketplace" className="hover:text-red-500">
            Marketplace
          </a>
          <a href="/about" className="hover:text-red-500">
            About
          </a>
          <a href="/contact" className="hover:text-red-500">
            Contact
          </a>
        </nav>

        {/* Auth Links */}
        <div className="hidden md:flex space-x-4">
          <a
            href="/signin"
            className="bg-white text-sm text-black px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Sign In
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white">
          <nav className="space-y-2 p-4">
            <a href="/" className="block hover:text-red-500">
              Home
            </a>
            <a href="/shop" className="block hover:text-red-500">
              Shop
            </a>
            <a href="/about" className="block hover:text-red-500">
              About
            </a>
            <a href="/contact" className="block hover:text-red-500">
              Contact
            </a>
            <div className="border-t border-gray-700 mt-4 pt-4">
              <a
                href="/signin"
                className="block bg-white text-black text-center px-4 py-2 rounded-lg mb-2 hover:bg-gray-200"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block bg-red-500 text-center px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Register
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Topbar;
