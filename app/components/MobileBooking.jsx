"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useBookingStore } from "@/store/store";
import { categories } from "@/data/categories";
import DestinationCard from "./DestinationCard";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CircularProgress } from "@mui/joy";
import { getCookie } from "cookies-next";

const MobileBooking = ({
  isSearchPage = false,
  isBookingPage = false,
  id,
  price,
  guestLimit,
  name,
}) => {
  const token = getCookie("access_token");

  const storeDestination = useBookingStore(
    (state) => state.booking.destination
  );

  const [destination, setDestination] = useState(
    storeDestination !== null ? storeDestination : "Choice of Stay"
  );

  const storeDate = useBookingStore((state) => state.booking.date);
  const setStoreDate = useBookingStore((state) => state.setDate);

  const loading = useBookingStore((state) => state.loading);

  const setStoreDestination = useBookingStore((state) => state.setDestination);

  const storeOptions = useBookingStore((state) => state.booking.options);

  const setAdult = useBookingStore((state) => state.setAdult);
  const setChildren = useBookingStore((state) => state.setChildren);
  const setRoom = useBookingStore((state) => state.setRoom);

  const [date, setDate] = useState({
    from: storeDate[0].startDate,
    to: storeDate[0].endDate,
  });

  const [adultOption, setAdultOption] = useState(storeOptions.adult);
  const [childrenOption, setChildrenOption] = useState(storeOptions.children);

  const router = useRouter();

  //Check Availability
  const handleSubmit = () => {
    setStoreDestination(destination);
    setAdult(adultOption);
    setChildren(childrenOption);
    setStoreDate([
      {
        startDate: date.from,
        endDate: date.to,
      },
    ]);
  };

  const { toast } = useToast();

  const [bookNowLoading, setBookNowLoading] = useState(false);

  //Add Stay to Cart
  const addToCart = async (stayId, dates, rooms) => {
    try {
      setBookNowLoading(true);
      const response = await fetch("https://misty-plum-hare.cyclic.app/api/cart", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stayId, dates, rooms }),
      });

      const data = await response.json();

      if (data.isCartFilled) {
        toast({
          title: "Uh oh!",
          description: data.message,
          className: "bg-red-400 text-white",
        });
        setBookNowLoading(false);
        return;
      }

      setBookNowLoading(false);
      router.push(`/confirm-booking`);
    } catch (error) {
      console.log(error);
    }
  };

  //Continue to Cart
  const bookNow = () => {
    if(!token) {
      router.push("/auth?s=login");
      return;
    }
    if (adultOption + childrenOption > guestLimit) {
      toast({
        title: "Uh oh!",
        description: `You have exceeded the guest limit`,
        className: "bg-red-400 text-white",
      });
      return;
    }
    if (
      new Date(date.from).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    ) {
      toast({
        title: "Uh oh!",
        description: `You can't book a date in the past`,
        className: "bg-red-400 text-white",
      });
      return;
    }
    setStoreDate([
      {
        startDate: date.from,
        endDate: date.to,
      },
    ]);
    addToCart(
      id,
      [{ startDate: date.from, endDate: date.to }],
      storeOptions.room
    );
  };

  return (
    <div className={`flex flex-col gap-6 ${!isSearchPage ? "mt-4" : ""}`}>
      {isBookingPage ? (
        <div className="w-full flex items-center justify-start border-gray-300 text-heading rounded-none bg-transparent border heading-text text-base font-light px-6 py-3">
          <p>{name}</p>
        </div>
      ) : (
        <Select
          onValueChange={(value) => setDestination(value)}
          value={destination}
        >
          <SelectTrigger
            isSearchPage={isSearchPage}
            className={`w-full  ${
              isSearchPage
                ? "text-heading border-gray-300"
                : "text-white border-tertiary"
            }  rounded-none bg-transparent border  heading-text text-base font-light p-6 hover:bg-transparent focus:bg-transparent`}
          >
            <SelectValue
              placeholder={`
              "Choice of Stay"
            `}
            >
              {destination !== null ? destination : "Choice of Stay"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border border-tertiary rounded-none min-w-max ">
            <SelectGroup className="grid grid-cols-1 group">
              {categories.map((category, i) => (
                <SelectItem
                  key={i}
                  value={category.name}
                  className={`rounded-none hover:bg-accent cursor-pointer `}
                >
                  <DestinationCard name={category.name} />
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`w-full flex items-center rounded-none bg-transparent border  heading-text text-base font-light py-3 px-6 hover:bg-transparent focus:bg-transparent ${
              isSearchPage
                ? "text-heading justify-between border-gray-300"
                : "text-white  justify-center border-tertiary"
            }`}
          >
            <div className="flex gap-1 items-center">
              <CalendarIcon
                className={`mr-2 h-4 w-4 ${
                  isSearchPage ? "text-heading" : "text-white"
                }`}
              />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </div>
            <ChevronDownIcon
              className={`h-4 w-4 opacity-50 ${!isSearchPage ? "hidden" : ""}`}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`${
            isSearchPage ? "w-[580px]" : " w-[90vw]"
          } relative rounded-none border border-tertiary`}
          align="center"
          mobilebooking={true}
        >
          <Calendar
            className="w-[500px]"
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`w-full flex items-center rounded-none bg-transparent border heading-text text-base font-light py-3 px-6 hover:bg-transparent focus:bg-transparent ${
              isSearchPage
                ? "text-heading justify-between border-gray-300"
                : "text-white  justify-center border-tertiary"
            }`}
          >
            {isSearchPage ? (
              <p>
                {adultOption} Adult{adultOption > 1 ? "s" : ""} {childrenOption}{" "}
                Child
                {childrenOption > 1 || childrenOption == 0 ? "ren" : ""}{" "}
                {storeOptions.room} Room{storeOptions.room > 1 ? "s" : ""}
              </p>
            ) : (
              <p>Guests</p>
            )}
            <span
              className={`ml-6 text-xs font-body ${
                isSearchPage ? "hidden" : ""
              }`}
            >
              {adultOption} Adult{adultOption > 1 ? "s" : ""} {childrenOption}{" "}
              Child
              {childrenOption > 1 || childrenOption == 0 ? "ren" : ""}{" "}
              {storeOptions.room} Room{storeOptions.room > 1 ? "s" : ""}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="rounded-none p-6 border border-tertiary">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="font-heading text-lg">Adults</p>
              <div className="flex items-center gap-4">
                <PlusIcon
                  className={`h-4 w-4 ${
                    adultOption > 8
                      ? "text-gray-200 cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                  onClick={() =>
                    adultOption < 9 && setAdultOption(adultOption + 1)
                  }
                />
                <p className="tabular-nums">{adultOption}</p>
                <MinusIcon
                  className={`h-4 w-4 ${
                    adultOption < 2
                      ? "text-gray-200 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    adultOption > 1 && setAdultOption(adultOption - 1)
                  }
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-heading text-lg">Children</p>
              <div className="flex items-center gap-4">
                <button></button>
                <PlusIcon
                  className={`h-4 w-4 ${
                    childrenOption > 8
                      ? "text-gray-200 cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                  onClick={() => {
                    childrenOption < 9 && setChildrenOption(childrenOption + 1);
                  }}
                />
                <p className="tabular-nums">{childrenOption}</p>
                <MinusIcon
                  className={`h-4 w-4 ${
                    childrenOption < 1
                      ? "text-gray-200 cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                  onClick={() =>
                    childrenOption > 0 && setChildrenOption(childrenOption - 1)
                  }
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-heading text-lg">Rooms</p>
              <div className="flex items-center gap-4">
                <PlusIcon
                  className={`h-4 w-4 ${
                    storeOptions.room > 3
                      ? "text-gray-200 cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                  onClick={() => {
                    storeOptions.room < 4 && setRoom(storeOptions.room + 1);
                  }}
                />
                <p className="tabular-nums">{storeOptions.room}</p>
                <MinusIcon
                  className={`h-4 w-4 ${
                    storeOptions.room < 2
                      ? "text-gray-200 cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                  onClick={() =>
                    storeOptions.room > 1 && setRoom(storeOptions.room - 1)
                  }
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {isBookingPage && (
        <div className="flex justify-between text-2xl max-md:text-xl border-t border-t-gray-200 pt-10 mt-6 mb-3">
          <h3 className="heading-text">Total Cost</h3>
          <p className="flex items-center">
            £{" "}
            {new Intl.NumberFormat("en-US").format(
              (
                storeOptions.room *
                ((date?.to - date?.from) / (1000 * 60 * 60 * 24)) *
                price
              ).toFixed(2)
            ) || <CircularProgress variant="plain" size="sm" color="neutral" />}
          </p>
        </div>
      )}
      <Button
        onClick={isBookingPage ? bookNow : handleSubmit}
        className={`${
          isBookingPage
            ? "bg-heading hover:bg-tertiary"
            : "bg-tertiary hover:bg-tertiarydark"
        } w-full  text-white rounded-none py-6 heading-text text-base font-light`}
      >
        {loading ? (
          "Checking"
        ) : isBookingPage ? (
          bookNowLoading ? (
            <CircularProgress variant="plain" size="sm" color="neutral" />
          ) : (
            "Book Your Stay Now"
          )
        ) : (
          "Check Availability"
        )}
      </Button>
    </div>
  );
};

export default MobileBooking;
