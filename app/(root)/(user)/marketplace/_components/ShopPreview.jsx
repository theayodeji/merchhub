"use client"

import React, { useState } from "react";

const ShopPreview = ({ creator }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 w-full ">
      {/* Creator Info */}
      <div className="flex items-center mb-4">
        <img
          src={creator.image}
          alt={creator.name}
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{creator.name}</h2>
          <p className="text-gray-600">{creator.description}</p>
        </div>
      </div>

      {/* Product Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-flow-col  gap-4 mb-4">
        {creator.products.slice(0, 3).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Link to Full Shop */}
      <a
        href={creator.shopLink}
        className="text-red-500 font-semibold hover:underline"
      >
        View Full Shop
      </a>
    </div>
  );
};

// Product Card with Like and Buy Button
const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleFollow = () => setFollowed(!followed);

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-sm relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="text-sm font-semibold text-gray-700 mt-2">{product.name}</h3>
      <p className="text-red-500 font-bold">${product.price}</p>

      {/* Like and Buy Buttons */}
      <div className="flex justify-between mt-2">
        {/* Like Button */}
        <button onClick={toggleLike} className="flex items-center">
          {liked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.318 1.318-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.318 1.318-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>

        {/* Follow/Buy Button */}
        <button
          onClick={toggleFollow}
          className="bg-black text-white px-3 py-1 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {followed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopPreview;
