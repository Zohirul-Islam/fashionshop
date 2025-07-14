import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="bg-gray-100 w-full flex flex-col sm:flex-row ">
      {/* hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex gap-2 items-center">
            <p className="w-8 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrival
          </h1>
          <div className="flex gap-2 items-center">
            <p className="w-8 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
          </div>
        </div>
      </div>
        <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
