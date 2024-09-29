import React from "react";
import Button from "../shared/Button";

const PromoBanner = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white rounded-lg shadow-lg relative">
      <div className="p-12 md:max-w-[70%]">
        <h2 className="text-3xl font-bold mb-4">Limited Time Offer!</h2>
        <p className="mb-6 text-sm lg:text-base">Get 30% off on all products. Don't miss out on this exclusive deal! Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa officia cumque?</p>
        <div>
            <Button variant="primary">
            Shop Now
            </Button>
            <Button variant="outline-light" otherStyles={'ml-3'}>
            Find Deals
            </Button>

        </div>
      </div>
      <div className="flex-1">
        <img
          src="assets/promo2.png"
          alt="Person"
          className="rounded-lg absolute bottom-0 right-0 md:right-[3%] lg:right-20%] w-0 md:w-[75%] lg:w-[inherit]"
        />
      </div>
    </div>
  );
};

export default PromoBanner;
