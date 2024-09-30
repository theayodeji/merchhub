'use client'
import { useRouter } from "next/navigation";
import React from "react";

const SignupPage = () => {

  const router = useRouter();

  async function handleSubmit(e){
    e.preventDefault();

    try{
      const formdata = new FormData(e.currentTarget);

      const username = formdata.get('username');
      const password = formdata.get('password');
      const email = formdata.get('email');

      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username, email, password
        })
      })
      
      res.status === 201 && router.push('/onboarding')
      

    }catch(e){
       console.log(e.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div
        className="lg:w-1/2 w-full bg-cover bg-center relative h-64 lg:h-auto"
        style={{ backgroundImage: "url('/assets/signup.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 lg:hidden"></div> {/* Overlay */}
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-md">
          <img src="/assets/logo.png" alt="" width={300} className="mx-auto"/>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create Your Account
          </h2>
          <form 
          onSubmit={handleSubmit}
          className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name='username'
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your preferred username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name='email'
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name='password'
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Confirm your password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-red-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
