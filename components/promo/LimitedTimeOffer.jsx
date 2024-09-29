"use client";
import { useEffect, useState } from "react";

const LimitedTimeOffer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 59.999);

  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!mounted) {
    return null; // or a placeholder, spinner, etc.
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <div
        key={interval}
        className=" text-white px-4 py-2 rounded-lg mx-1 text-center text-2xl font-bold"
      >
        {timeLeft[interval] < 10 ? '0' + timeLeft[interval] : timeLeft[interval]}
      </div>
    );
  });

  return (
    <div className="promo-card bg-black rounded-lg shadow-lg overflow-hidden text-white flex flex-col md:flex-row my-20 lg:my-32">
      {/* Promo Image */}
      <div className="relative md:w-1/2 h-64 md:h-auto md:max-h-[400px]">
        <img
          src="https://media.istockphoto.com/id/888019344/photo/theres-always-more-shopping-to-do.webp?b=1&s=612x612&w=0&k=20&c=lP0Vv2VxuccY3JoaEJTQMpzk0ssMtWRxGJnKlHzuhQ4="
          alt="Promotion"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Promo Content */}
      <div className="p-6 flex flex-col justify-center lg:text-start md:w-1/2">
        <h3 className="text-3xl font-bold mb-4">Adele Fashion Frenzy!!!</h3>
        <p className="mb-6">
          Hurry up! Don't miss out on our exclusive deals. The offer ends in
        </p>
        <div className="countdown flex mb-6 justify-start">
          {timerComponents.length ? timerComponents : <span>Promotion Ended!</span>}
        </div>
        <a
          href="#"
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition max-w-max"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default LimitedTimeOffer;
