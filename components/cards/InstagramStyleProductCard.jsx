'use client'

import { useState } from "react";
import { FaHeart, FaShoppingCart} from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { VscShare } from "react-icons/vsc";

const InstagramStyleProductCard = ({ product, creator }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);

  return (
    <div className="max-w-md bg-white rounded-lg shadow-lg overflow-hidden my-4">
      {/* Creator Info */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-2">
          <img
            src={creator.profileImage}
            alt={creator.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-bold text-gray-800">{creator.name}</h2>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover"
        />
      </div>

      {/* Actions: Like & Purchase */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex space-x-4">
          <button
            onClick={toggleLike}
            className="text-gray-700 focus:outline-none"
          >
            {liked ? (
              <FaHeart className="text-red-500 w-6 h-6" />
            ) : (
              <FiHeart className="w-6 h-6" />
            )}
          </button>
          <button className="text-gray-700 focus:outline-none" >
            <VscShare className="w-6 h-6" />
          </button>
          <button className="bg-red-500 text-white focus:outline-none text-sm p-2 rounded-md">
            Purchase Now
          </button>
        </div>
        <p className="text-sm font-bold text-red-500 italic">${product.price}</p>
      </div>

      {/* Product Info */}
      <div className="px-4 py-4 mb-3">
        <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">
          {product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </p>
      </div>
    </div>
  );
};

export default InstagramStyleProductCard;
