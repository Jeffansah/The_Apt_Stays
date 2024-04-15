import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-screen bg-[#111111] flex flex-col ">
      <div className="w-full grid grid-cols-4 max-md:grid-cols-1 text-white/80">
        <div className="flex flex-col gap-4 items-center justify-center border-[0.5px] border-gray-700/40  py-12">
          <h4 className="text-theme text-xs">ADDRESS</h4>
          <p>123 Oxford Street, London, UK</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center border-[0.5px] border-l-0 border-gray-700/40  py-12">
          <h4 className="text-theme text-xs">PHONE</h4>
          <p>+44 5631 280 464</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center border-[0.5px] border-gray-700/40 border-l-0  py-12">
          <h4 className="text-theme text-xs">EMAIL</h4>
          <p>reservation@apt.com</p>
        </div>
        <div className="flex flex-col items-center justify-center border-[0.5px] border-gray-700/40 border-l-0  py-12 gap-4">
          <h4 className="text-theme text-xs">SOCIAL</h4>
          <div className="flex gap-6">
            <Image
              src={"/images/facebook.png"}
              width={24}
              height={24}
              alt="facebook"
              className="w-4 h-4"
            />
            <Image
              src={"/images/twitter.png"}
              width={24}
              height={24}
              alt="twitter"
              className="w-4 h-4"
            />
            <Image
              src={"/images/pinterest.png"}
              width={24}
              height={24}
              alt="instagram"
              className="w-4 h-4"
            />
            <Image
              src={"/images/youtube.png"}
              width={24}
              height={24}
              alt="instagram"
              className="w-4 h-4"
            />
            <Image
              src={"/images/instagram.png"}
              width={24}
              height={24}
              alt="instagram"
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-14 flex max-md:flex-col max-md:items-center max-md:gap-4  lg:justify-between text-white/80 py-10">
        <p className="text-sm">© Copyright APT. All Rights Reserved.</p>
        <div className="flex gap-4">
          <p className="hover:text-tertiary hover:cursor-pointer text-sm">
            PRIVACY
          </p>
          <p className="hover:text-tertiary hover:cursor-pointer text-sm">
            TERMS & CONDITIONS
          </p>
          <p className="hover:text-tertiary hover:cursor-pointer text-sm">
            POLICY
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
