"use client"

import { useState } from "react";

const SuggestedProduct = ({ product }) => {
    const [liked, setLiked] = useState(false);
  
    const toggleLike = () => {
      setLiked(!liked);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-8 w-full max-w-md mx-auto">
        {/* Creator Info */}
        <div className="flex items-center mb-4">
          <img
            src={product.creator.profileImage}
            alt={product.creator.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div className="flex-1">
            <h3 className="text-gray-800 font-semibold">{product.creator.name}</h3>
            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-red-600 transition">
              Follow
            </button>
          </div>
        </div>
  
        {/* Product Image */}
        <div className="relative mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
  
        {/* Product Info */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
            <p className="description text-gray-400 text-xs">Lorem ipsum dolor sit, amet 💖🔥💫...</p>
            <p className="text-red-500 font-semibold">${product.price}</p>
          </div>
          <div className="flex space-x-3">
            {/* Like Button */}
            <button
              className={`flex items-center space-x-1 ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
              onClick={toggleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.318 1.318-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{liked ? "Liked" : "Like"}</span>
            </button>
  
            {/* Purchase Button */}
            <button className="bg-black text-white px-3 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
              Purchase
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default SuggestedProduct;