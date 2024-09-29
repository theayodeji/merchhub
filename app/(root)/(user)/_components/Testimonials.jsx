"use client"

import React from "react";
import dynamic from "next/dynamic";  // Import dynamically to avoid SSR issues

// Dynamically import react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// SVG Star Component for ratings
const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={`w-6 h-6 ${filled ? "text-yellow-500" : "text-gray-300"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.09 6.43h6.769c.967 0 1.371 1.24.588 1.81l-5.49 3.993 2.09 6.43c.3.922-.755 1.688-1.54 1.118l-5.49-3.993-5.49 3.993c-.784.57-1.84-.196-1.54-1.118l2.09-6.43-5.49-3.993c-.784-.57-.379-1.81.588-1.81h6.769l2.09-6.43z"
    />
  </svg>
);

// Testimonial Component
const Testimonial = ({ testimonial }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center mx-4 flex flex-col justify-center items-center min-h-[330px]">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg"
      />
      <div className="flex justify-center mb-4 gap-1">
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star key={i} filled={i < testimonial.rating} />
          ))}
      </div>
      <p className="text-gray-600 italic text-xs md:text-sm">"{testimonial.text}"</p>
      <h3 className="text-lg font-bold mt-4 text-gray-800">{testimonial.name}</h3>
      <p className="text-gray-500">{testimonial.role}</p>
    </div>
  );
};

// Testimonial Slider
const TestimonialSlider = () => {
  const testimonials = [
    {
      name: "Lhaby Kame",
      role: "Tiktoker",
      text: "This platform has transformed how I sell my products!",
      rating: 5,
      image: "https://i.ytimg.com/vi/mVUvv-bKAII/mqdefault.jpg", // Example portrait image
    },
    {
      name: "Hogan Peter",
      role: "Content Creator",
      text: "Incredible support and smooth user experience. Highly recommend!",
      rating: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-q_1zl355RgvUelLQLQ_YlP2htt-qE5pMRw&s", // Example portrait image
    },
    {
      name: "Madison Ray",
      role: "Songwriter",
      text: "I've seen significant growth in my shop's sales. Thank you!",
      rating: 5,
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRwjrptymp8ijt6u0wapbjzFu6dDs6NbuIAzy78XZnLfW5lepgW", // Example portrait image
    },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (
    <div className="my-16">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">What Our Creators Say</h2>
      <Slider className="align-items-stretch" {...settings}>
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} testimonial={testimonial}/>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
