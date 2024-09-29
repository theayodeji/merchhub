import Button from "@/components/shared/Button";
import Stats from './Stats'
import Link from "next/link";


const Hero = () => {
  return (
    <div>
      <div className="hero flex flex-col-reverse lg:flex-row items-center lg:justify-between lg:mt-10 2xl:justify-center relative px-5 isolate">
        <div className="max-w-[800px]">
          <h1 className="font-bold text-4xl lg:text-6xl mb-3 ">
            Lets's take your <span className="italic text-red-500">Aura</span> Shopping
          </h1>
          <p className="mb-3 text-sm lg:text-base ">
            With merch from the{" "}
            <span className="font-semibold italic text-red-500">
              BIGGEST CREATORS
            </span>{" "}
            in the space, lorem ipsum dolor sit amet consectetur adipisicing
            elit. At soluta, necessitatibus aspernatur repudiandae reiciendis
            et, minima.
          </p>
          <div>
            <Button otherStyles={"w-max"} variant="primary">
                Get Started
            </Button>
            <Link href={'/marketplace'} className="w-max ml-3">
              <Button otherStyles={""} variant="secondary">
                  View Marketplace
              </Button>
            </Link>
          </div>
        <img src="assets/line.png" alt="" className="absolute z-[0]"/>
        </div>
        <div className="w-fit lg:w-[100%] lg:max-w-[max-content] relative">
            <Stats />
            <img
            src="/assets/hero-main.png"
            alt=""
            className="w-[100%] max-w-[512px] lg:w-[100%] "
            />
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
