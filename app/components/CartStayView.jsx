"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CartStayProduct from "./CartStayProduct";
import Link from "next/link";
import ClearCartButton from "./ClearCartButton";
import { useBookingStore } from "@/store/store";
import { useEffect, useState } from "react";

const CartStayView = ({ data }) => {
  const router = useRouter();

  const cartIsFilled = useBookingStore((state) => state.cartIsFilled);
  const setCartIsFilled = useBookingStore((state) => state.setCartIsFilled);

  useEffect(() => {
    setCartIsFilled(data.cart.length > 0);
  }, []);

  return (
    <div className="flex flex-col w-[70%]">
      {!cartIsFilled ? (
        <div className="flex flex-col items-center">
          <p className="heading-text text-heading text-3xl pt-14 pb-6 text-center">
            No items to check out
          </p>
          <Button
            onClick={() => router.back()}
            className={
              "bg-tertiary hover:bg-tertiarydark w-1/2 text-white rounded-none py-6 heading-text text-base font-light"
            }
          >
            Go back
          </Button>
        </div>
      ) : (
        <>
          <div className="flex font-normal text-sm py-6 border-t border-b border-t-gray-200 border-b-gray-200">
            <p className="w-[40%]">STAY</p>
            <div className="flex gap-44 flex-grow justify-between ">
              <p className="text-nowrap">
                PRICE <span className="text-xs font-light">/night</span>
              </p>
              <p>ROOMS</p>
              <p>SUBTOTAL</p>
            </div>
          </div>
          <div className="py-6 border-b border-b-gray-200">
            <CartStayProduct
              name={data.hotel.name}
              price={data.hotel.cheapestPrice}
              photos={data.hotel.photos}
              rooms={data.cart[0].rooms}
              dates={data.cart[0].dates}
            />
          </div>
          <ClearCartButton id={data.cart[0]._id} />
        </>
      )}
    </div>
  );
};

export default CartStayView;
