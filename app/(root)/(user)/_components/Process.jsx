import React from 'react';

// HowItWorks Component: Displays the steps for placing an order, making a payment, and picking up the order.
const HowItWorks = () => {
  return (
    <div className="how-it-works-section py-20  relative">
      <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
      <div className="steps-container flex flex-col md:flex-row gap-10 md:gap-0 justify-around items-center">
        {/* Step 1: Place Order */}
        <div className="step text-center max-w-xs">
          <div className="icon-container relative">
            <img 
              src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2015/10/mouse-scroll-wheel-browsing-tricks.jpg" 
              alt="Place Order" 
              className="w-36 aspect-square object-cover rounded-full mx-auto"
            />
            <div className="icon absolute top-0 bg-blue-500 text-white w-16 h-16 flex items-center justify-center rounded-full animate-bounce mt-4">
              1
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-4">Place Order</h3>
          <p className="text-gray-700">Select your favorite items and place your order.</p>
        </div>

        {/* Step 2: Make Payment */}
        <div className="step text-center max-w-xs">
          <div className="icon-container relative">
            <img 
              src="https://img.freepik.com/premium-photo/woman-holding-credit-card-shopping_42256-1355.jpg" 
              alt="Make Payment" 
              className="w-36 aspect-square object-cover rounded-full mx-auto"
            />
            <div className="icon top-[50%] absolute bg-green-500 text-white w-16 h-16 flex items-center justify-center rounded-full animate-bounce delay-1 mt-4">
              2
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-4">Make Payment</h3>
          <p className="text-gray-700">Pay securely through our payment gateway.</p>
        </div>

        {/* Step 3: Pick Up Your Order */}
        <div className="step text-center max-w-xs">
          <div className="icon-container relative">
            <img 
              src="https://media.licdn.com/dms/image/C4D12AQFRataCX3DWWg/article-cover_image-shrink_720_1280/0/1613504284982?e=2147483647&v=beta&t=ApqqvlWgS0sMTQ1QddwKVHmPDHvaxRIIkHhufvDtr8o" 
              alt="Pick Up Your Order" 
              className="w-36 aspect-square object-cover rounded-full mx-auto"
            />
            <div className="icon absolute top-0 bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-full animate-bounce delay-2 mt-4">
              3
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-4">Pick Up Your Order</h3>
          <p className="text-gray-700">Your Creator ships your order to you.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
