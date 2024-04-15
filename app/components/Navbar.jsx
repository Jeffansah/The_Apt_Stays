"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { getCookie, deleteCookie } from "cookies-next";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const navlinks = [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "MY ACCOUNT",
      url: "/account",
    },
  ];

  const [user, setUser] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    const getSessionData = () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const token = getCookie("access_token");
      setUser(user);
      setToken(token);

      console.log(user, token);
    };

    getSessionData();
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    deleteCookie("access_token");
    localStorage.removeItem("userData");
    setUser(null);
    setToken();
    router.refresh();
  };

  return (
    <div className=" px-14 py-6 max-md:px-7 max-md:py-6  border-b border-b-gray-200/30 relative z-3">
      <div className="grid grid-cols-3 items-center max-md:hidden">
        <div className="flex items-center gap-4 font-base text-sm">
          <Link
            href={"/"}
            className={`text-white ${
              pathname === "/"
                ? "relative after:absolute after:w-full after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-white"
                : ""
            }`}
          >
            HOME
          </Link>
          {navlinks.map((link) => (
            <NavigationMenu className={`${!token ? "hidden" : ""}`}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    linkname={link.name}
                    className={`bg-transparent p-0 text-white ${
                      link.name === "HOME" ? "hidden" : ""
                    }`}
                  >
                    {link.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    className={`${
                      link.name === "HOME" ? "hidden" : ""
                    }  flex flex-col gap-10 min-w-max p-6 rounded-none bg-heading border-none text-gray-200`}
                  >
                    <NavigationMenuLink>
                      {link.name === "MY ACCOUNT" && (
                        <>
                          <p className="py-4 border-b cursor-pointer border-gray-400 hover:text-tertiary transition-colors duration-200 ease-in-out">
                            Account details
                          </p>
                          <p
                            className={`py-4 cursor-pointer ${
                              token ? "border-b" : "border-none"
                            } border-gray-400 hover:text-tertiary transition-colors duration-200 ease-in-out`}
                          >
                            My Bookings
                          </p>
                          <p
                            onClick={logout}
                            className={`py-4 ${
                              !token ? "hidden" : ""
                            } cursor-pointer hover:text-tertiary transition-colors duration-200 ease-in-out`}
                          >
                            Logout
                          </p>
                        </>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex justify-end gap-10 items-center text-white ">
          <CartIcon />
          <p className="font-light">Tel: +44 346 273 602</p>
          {token ? (
            user !== null && (
              <Badge className="py-3 px-6 bg-transparent border border-white text-white text-base hover:bg-white rounded-none hover:text-black cursor-default">
                Hi, {user.isAdmin ? "Admin" : user.firstname}!
              </Badge>
            )
          ) : (
            <>
              <Link href={"/auth?s=login"}>
                <button className="border border-white bg-transparent px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300">
                  Login
                </button>
              </Link>
              <Link href={"/auth?s=register"}>
                <button className="border border-white bg-white text-black px-6 py-3 hover:bg-transparent hover:text-white transition-colors duration-200">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Navbar;
