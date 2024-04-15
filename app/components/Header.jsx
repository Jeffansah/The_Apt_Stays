import { Button } from "@/components/ui/button";
import MobileBookingView from "./MobileBookingView";

const Header = () => {
  return (
    <div className="max-w-[900px] max-md:max-w-xs mx-auto flex flex-col justify-center flex-grow items-center relative gap-8 max-md:gap-5 z-3">
      <h1 className="text-white text-8xl max-md:text-5xl heading-text text-center ">
        Exquisite Boutique Resort Living
      </h1>
      <p className="text-gray-200 text-xl max-md:text-center max-md:text-base max-md:max-w-[250px]">
        Find your next haven of warmth, tranquility and restoration
      </p>
      <MobileBookingView />
    </div>
  );
};

export default Header;
