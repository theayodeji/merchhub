import React from "react";

const PromoCard2 = () => {
  return (
    <div className="promo-card md:flex-1 lg:w-[650%] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Promo Image */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D')` }}
      ></div>
      {/* Promo Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Exciting New Features!</h3>
        <p className="text-gray-600 mb-4">
          Discover our latest update that brings a host of new features to make your experience even better. Don't miss out on these exciting enhancements.
        </p>
        <a
          href="#"
          className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default PromoCard2;
