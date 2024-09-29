'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { TbHeartPlus } from 'react-icons/tb';
import { Heart } from 'lucide-react';

const ProductCard = ({ product,  }) => {
  const [liked, setLiked] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const handlePurchase = () => {
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group isolate">
      <Link href={`/products/${product.id}`} className="block group">
        {/* Product Image with Hover Effect */}
        <div
          className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 relative"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          {/* Overlay for Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        </div>
      </Link>

      {/* Stock Badge */}
      <span
        className={`absolute top-4 right-2 px-2 py-1 text-xs font-bold uppercase rounded-full ${
          product.stock > 0 ? 'bg-red-500 text-white' : 'bg-black text-white'
        }`}
      >
        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
      </span>

      {/* Like Button */}
      <button
        onClick={toggleLike}
        className={`absolute top-4 left-4 p-2 rounded-full bg-white shadow-lg text-gray-600 ${
          liked ? 'text-red-500' : 'text-gray-400'
        }`}
      >
        <Heart fill={liked ? 'red' : 'none'}/>
      </button>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <h6 className="text-sm font-semibold text-gray-800">
            {product.creator}{' '}
            <span>
              <img
                className="w-5 inline"
                src="/assets/verified-badge.svg"
                alt="verified"
              />
            </span>{' '}
          </h6>
          <p className="text-gray-600">${product.price}</p>
        </Link>

        {/* Product Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.554h4.797c.967 0 1.37 1.24.588 1.81l-3.884 2.827 1.478 4.554c.3.921-.755 1.688-1.54 1.124L10 14.768l-3.87 2.728c-.785.565-1.84-.203-1.54-1.124l1.478-4.554-3.884-2.827c-.782-.57-.38-1.81.588-1.81h4.797l1.478-4.554z" />
            </svg>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            className={`flex items-center gap-1 text-sm font-semibold ${
              inWishlist ?  'text-green-600': 'text-red-500'
            }`}
          >
            {inWishlist ? (
              <>
                <TbHeartPlus fill='green' color='green'/>
                In Wishlist
              </>
            ) : (
              <>
                <TbHeartPlus />
                Add to Wishlist
              </>
            )}
          </button>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
