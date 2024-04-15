import Image from "next/image";
import React from "react";

const CTA = () => {
  return (
    <div className="boxed relative z-5 lg:pt-28 lg:pb-[500px] max-md:py-20 max-md:max-h-max">
      <div className="flex flex-col items-center gap-6 max-md:gap-5 lg:h-full max-md:h-full ">
        <Image
          src={"/images/tropical.png"}
          width={60}
          height={60}
          alt="cta icon"
          className="max-md:w-12 max-md:h-12 w-[60px]"
        />
        <h3 className="text-white text-sm">UNFORGETTABLE EXPERIENCE</h3>
        <h1 className="text-white heading-text text-6xl max-md:text-4xl font-light  lg:max-w-3xl text-center leading-tight">
          The Pinnacle of Desirable Locations Countrywide
        </h1>
        <p className="text-white max-w-5xl max-md:max-w-[300px] text-center leading-loose">
          From superior 5-star resorts to Homey lux cabins, APT embodies the
          very best of luxury, tranquility & sophistication.
        </p>
      </div>
    </div>
  );
};

export default CTA;
