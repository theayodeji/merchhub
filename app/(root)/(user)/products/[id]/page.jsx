"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductComments from "../_components/ProductComments"

const ProductPage = ({}) => {
  const product = {
    item: {
      id: 1,
      name: "Awesome Sneakers",
      price: 150,
      description:
        "These sneakers are super comfortable and stylish. Made with premium materials, they are perfect for all-day wear.",
      images: [
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/97/8770911/1.jpg?2332",
        "https://m.media-amazon.com/images/I/814+CWj1sQL._AC_SL1500_.jpg",
        "https://img.ltwebstatic.com/images3_spmp/2023/05/19/168448883297e75abdf8dab9d18f8454e1efe67e94_thumbnail_750x.webp",
      ],
      sizes: ["38", "40", "42", "44"],
      colors: ["Red", "Black", "White"],
    },
    creator: {
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
      storeLink: "john-doe-store",
    },
  };

  const { item, creator } = product;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(item.colors[0]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="item-carousel"
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
            initialSlide={selectedImage}
          >
            {item.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            {item.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer p-1 border-2 rounded-md ${
                  selectedImage === index ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedImage(index);
                  swiperInstance?.slideTo(index);
                }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <p className="text-gray-700 mt-4">{item.description}</p>
          {/* Size Selection */}

          <div className="space-y-2">
            <div className="flex space-x-2">
              {item.sizes.map((size) => (
                <div
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-10 flex items-center justify-center cursor-pointer rounded-md transition duration-200 ease-in-out shadow-md ${
                    selectedSize === size
                      ? "bg-red-500 "
                      : "bg-white"
                  }`}
                >
                  <span className={`text-${selectedSize === size ? 'white': 'gray-700'  } font-semibold`}>{size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-gray-700">Color</label>
            <div className="flex space-x-2">
              {item.colors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor:
                      color === "Red"
                        ? "#ff0000"
                        : color === "Black"
                        ? "#000000"
                        : "#ffffff",
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => alert("Added to Cart")}
            >
              Buy Now
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              onClick={() => alert("Added to Wishlist")}
            >
              Add to Wishlist
            </button>
          </div>
          {/* Creator Info */}
          <div className="flex items-center space-x-4">
            <img
              src={creator.profileImage}
              alt={`${creator.name}'s profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {creator.name}
              </h3>
              <a
                href={`/creators/${creator.storeLink}`}
                className="text-red-500 hover:underline"
              >
                Visit Store
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for Fullscreen Image Preview */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <img
            src={item.images[selectedImage]}
            alt={`Product Image ${selectedImage + 1}`}
            className="max-w-3xl w-full object-cover"
          />
        </div>
      )}
      <ProductComments />
    </div>
  );
};

export default ProductPage;
