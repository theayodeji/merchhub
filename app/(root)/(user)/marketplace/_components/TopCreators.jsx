"use client"

import { useState } from "react";

const TopCreatorsCarousel = ({ creators }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full overflow-hidden mt-10">
      <div className="flex space-x-6 overflow-x-scroll snap-x snap-mandatory">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="relative w-80 h-96 flex-shrink-0 snap-center rounded-lg overflow-hidden shadow-lg group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url(${
                  hoveredIndex === index ? creator.hoverImage : creator.image
                })`,
              }}
            ></div>

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Creator Details */}
            <div className="absolute left-4 bottom-4 z-10">
              <h2 className="text-white text-lg font-semibold">{creator.name}</h2>
              <p className="text-white text-sm">{creator.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCreatorsCarousel;
