"use client";

import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/store/store";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CartIcon = () => {
  const cartIsFilled = useBookingStore((state) => state.cartIsFilled);

  const [showNumber, setShowNumber] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          cache: "no-store",
        });
        const data = await res.json();
        setShowNumber(data.cart.length > 0);
        const user = JSON.parse(localStorage.getItem("userData"));
        setUser(user);
        console.log(showNumber);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, [cartIsFilled]);

  return (
    <Link href={"/confirm-booking"} className="relative">
      <ShoppingCartIcon size={26} className="text-white" />
      {showNumber && user !== null && (
        <div className="absolute -right-1 -top-1 text-xs rounded-full grid place-items-center p-2 bg-tertiary text-white">
          <p className="absolute right-[5.5px] top-[1px]">1</p>
        </div>
      )}
    </Link>
  );
};
