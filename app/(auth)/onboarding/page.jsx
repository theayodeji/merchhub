"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OnboardingScreen = () => {
  const [selectedOption, setSelectedOption] = useState("user");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  const handleOptionChange = (option) => {
    if (option === "creator") return; // Prevent selection of "Creator"
    setSelectedOption(option);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className=" w-1/2 flex items-start justify-start p-8 lg:p-20">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Complete Your Profile
          </h2>
          <form className="space-y-4">
            {/* Registration Type Selection */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Register As
              </label>
              <div className="flex gap-4 mt-2">
                {/* User Option */}
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 rounded-lg ${
                    selectedOption === "user"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                  onClick={() => handleOptionChange("user")}
                >
                  User
                </button>

                {/* Creator Option (Unavailable) */}
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  Creator (Unavailable)
                </button>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <div className="flex items-center">
                {/* Image Preview */}
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-36 h-36 rounded-full object-cover mr-4 cursor-pointer border-2 border-red-500 hover:opacity-80 transition-opacity"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    } // Trigger file input on image click
                  />
                ) : (
                  <div className="flex items-center gap-10"> 
                    <div
                      className="w-36 h-36 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500 cursor-pointer border-2 border-dashed border-gray-400 hover:bg-gray-300 transition-colors"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      } // Trigger file input on placeholder click
                    >
                      No Image
                    </div>
                    <span className="text-xl">Choose your profile picture</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-input" // Set an ID for the input to reference it
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your address"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Payment Information */}
            <div>
              <label
                htmlFor="payment-info"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Information
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="card-number"
                  className="w-full border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                  placeholder="Card Number"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    id="expiry-date"
                    className="flex-1 border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    id="cvv"
                    className="flex-1 border border-solid border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>

            {/* Payment Partners */}
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Supported Payment Methods
              </label>
              <div className="flex space-x-4">
                <img
                  src="https://e7.pngegg.com/pngimages/651/814/png-clipart-logo-visa-credit-card-wordmark-atm-card-visa-blue-text.png"
                  alt="Visa"
                  className="w-12 h-8 object-contain"
                />
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Emblem.png"
                  alt="MasterCard"
                  className="w-12 h-8 object-contain"
                />
                <img
                  src="https://download.logo.wine/logo/PayPal/PayPal-Logo.wine.png"
                  alt="PayPal"
                  className="w-12 h-8 object-contain"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                router.push('/')
              }}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-6"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-100 bg-[url('/assets/onboarding.jpg')] bg-no-repeat bg-cover bg-center"></div>
    </div>
  );
};

export default OnboardingScreen;
