'use client'

import { useRouter } from "next/navigation";
import React from "react";

const SignIn = () => {

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="lg:w-1/2 w-full bg-cover bg-center relative h-64 lg:h-auto" style={{ backgroundImage: "url('/assets/signin.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50 lg:hidden"></div> {/* Overlay */}
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-20 ">
        <div className="w-full max-w-md">
        <img src="/assets/logo.png" alt="" width={300} className="mx-auto"/>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Login to Your Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email or Username</label>
              <input
                type="text"
                id="email"
                className="w-full border border-solid border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your username or email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full border border-solid border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                router.push('/marketplace')
              }}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Login
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account? <a href="/signup" className="text-red-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
