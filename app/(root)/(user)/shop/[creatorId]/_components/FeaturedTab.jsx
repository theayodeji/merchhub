"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import InstagramStyledProductCard from "@/components/cards/InstagramStyleProductCard"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const FeaturedTab = () => {


    const products = {
      products:[
        {
          name: "Vintage Leather Jacket",
          image:
            "https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=600",
          price: 120.0,
          description:
            "A timeless and classic leather jacket with a vintage look. This piece pairs well with any casual outfit, providing style and warmth.",
        },
        {
          name: "Vintage Leather Jacket",
          image:
            "https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=600",
          price: 120.0,
          description:
            "A timeless and classic leather jacket with a vintage look. This piece pairs well with any casual outfit, providing style and warmth.",
        },
        {
          name: "Vintage Leather Jacket",
          image:
            "https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=600",
          price: 120.0,
          description:
            "A timeless and classic leather jacket with a vintage look. This piece pairs well with any casual outfit, providing style and warmth.",
        },
        {
          name: "Vintage Leather Jacket",
          image:
            "https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=600",
          price: 120.0,
          description:
            "A timeless and classic leather jacket with a vintage look. This piece pairs well with any casual outfit, providing style and warmth.",
        }
      ],
      creator: {
        name: "Alex Johnson",
        profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
        description: "Fashion Enthusiast",
        id: 7,
      },
    };
      

  const Slider = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        navigation
        style={{ height: 300, borderRadius: 16 }}
        autoplay
      >
        <SwiperSlide className="h-full text-white">
          <div className="bg-[url('https://images.pexels.com/photos/812871/pexels-photo-812871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] rounded-2xl overflow-hidden h-full flex items-start justify-end flex-col p-10 relative isolate bg-no-repeat bg-cover">
            <h1 className="font-bold text-lg mb-2">Splice Gazelle Kicks</h1>
            <p className="max-w-[480px] text-sm ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
              aliquid itaque commodi incidunt suscipit illum eligendi veniam,
              similique quod laborum.
            </p>
            <div className="overlay w-full h-full absolute top-0 left-0 bg-gradient-to-tr from-[#000000a9] to-[#fff0] z-[-1]"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="h-full text-white">
          <div className="bg-[url('https://modernmoney.ca/wp-content/uploads/2022/02/shutterstock_2100781357-scaled.jpg')] rounded-2xl overflow-hidden h-full flex items-start justify-end flex-col p-10 relative isolate bg-no-repeat bg-cover">
            <h1 className="font-bold text-lg mb-2">
              BAYC Collectible Cards
            </h1>
            <p className="max-w-[480px] text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
              aliquid itaque commodi incidunt suscipit illum eligendi veniam,
              similique quod laborum.
            </p>
            <div className="overlay w-full h-full absolute top-0 left-0 bg-gradient-to-tr from-[#000000a9] to-[#fff0] z-[-1]"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    );
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Featured Merch</h2>
      <Slider />
      <div className="feed ">
        <h2 className="text-2xl font-bold mb-4 mt-10">Creator's Feed</h2>
        {
          products.products.map((product, i) =>{
            return(
              <InstagramStyledProductCard product={product} key={i} creator={products.creator}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default FeaturedTab;
