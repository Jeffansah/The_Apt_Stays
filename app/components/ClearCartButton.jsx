"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useBookingStore } from "@/store/store";
import { CircularProgress } from "@mui/joy";
import { useState } from "react";

const ClearCartButton = ({ id }) => {
  const setCartIsFilled = useBookingStore((state) => state.setCartIsFilled);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://misty-plum-hare.cyclic.app/api/cart/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      const data = await res.json();
      if (data.deleted) {
        setCartIsFilled(false);
        toast({
          title: "Cart cleared",
          description: `Cart has successfully been cleared`,
          className: "bg-gray-200 text-heading",
        });
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `An error occurred while clearing cart`,
        className: "bg-red-400 text-white",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end">
      <Button
        onClick={handleClick}
        className={`bg-tertiary hover:bg-tertiarydark w-[200px]  text-white rounded-none py-6 heading-text text-base font-light mt-6`}
      >
        {loading ? (
          <CircularProgress size="sm" variant="soft" color="neutral" />
        ) : (
          "Clear Items"
        )}
      </Button>
    </div>
  );
};

export default ClearCartButton;
