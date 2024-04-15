"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between md:hidden items-center relative">
      <Logo />
      <MenuIcon className="text-white w-7 h-7" onClick={() => setOpen(true)} />
      <div
        className={`p-7 fixed inset-0 w-screen h-screen overflow-hidden bg-home z-10 ${
          open ? "flex" : "hidden"
        } `}
      >
        <div className="absolute inset-0 w-full h-full bg-black/40 z-3" />
        <XIcon
          className={`w-8 h-8 text-white inset-0 relative z-5`}
          onClick={() => setOpen(false)}
        />
        <div className="flex flex-col gap-8 text-white relative justify-center z-5 text-5xl">
          <button className="font-heading">
            <p className="text-start">Login</p>
          </button>
          <button className="font-heading">
            <p className="text-start">Register</p>
          </button>
          <button className="font-heading">
            <p className="text-start">My Account</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
