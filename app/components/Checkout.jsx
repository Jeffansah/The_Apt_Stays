"use client";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Checkout = ({}) => {
  const cartIsFilled = useBookingStore((state) => state.cartIsFilled);
  const [data, setData] = useState(null);
  const router = useRouter();
  const [nights, setNights] = useState(1);
  const [userId, setUserId] = useState(null);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/stripe/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          stayId: data.cart[0].stayId,
          dates: data.cart[0].dates,
          price: data.hotel.cheapestPrice,
          name: data.hotel.name,
          rooms: data.cart[0].rooms,
          nights,
        }),
      });
      const session = await response.json();
      router.push(session.sessionUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          cache: "no-store",
        });
        const data = await res.json();
        setData(data);
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUserId(userData._id);
        setNights(
          (new Date(data.cart[0].dates[0].endDate).setHours(0, 0, 0, 0) -
            new Date(data.cart[0].dates[0].startDate).setHours(0, 0, 0, 0)) /
            86400000
        );

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCart();
  }, []);

  return (
    <>
      {data !== null && (
        <div className="bg-[#f9f9f9] w-[30%] min-w-max flex flex-col px-6 py-10 rounded-none">
          <h3 className="heading-text text-heading text-3xl mb-6">Totals</h3>
          <div className="flex flex-col">
            <div className="border-t flex justify-between border-gray-200 py-4">
              <p className="">Nights</p>
              <p className="">{cartIsFilled ? nights : 0}</p>
            </div>
            <div className="border-t flex justify-between border-b border-gray-200 py-4">
              <p className="">Subtotal</p>
              <p className="">
                £
                {cartIsFilled
                  ? new Intl.NumberFormat("en-US").format(
                      data.cart[0].rooms * data.hotel.cheapestPrice
                    )
                  : 0}
              </p>
            </div>

            <div className="border-b flex justify-between border-b-gray-200 py-4">
              <p className="">Total</p>
              <p className="text-lg font-bold">
                £
                {cartIsFilled
                  ? new Intl.NumberFormat("en-US").format(
                      data.cart[0].rooms * data.hotel.cheapestPrice * nights
                    )
                  : 0}
              </p>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className={`${
              cartIsFilled
                ? "bg-heading"
                : "bg-heading/30 cursor-not-allowed hover:bg-heading/30"
            } w-full  text-white rounded-none py-6 heading-text text-base font-light mt-6`}
          >
            Proceed to checkout
          </Button>
        </div>
      )}
    </>
  );
};

export default Checkout;
