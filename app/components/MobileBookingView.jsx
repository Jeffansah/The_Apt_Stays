"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/mobilebookingdialog.jsx";
import MobileBooking from "./MobileBooking";

const MobileBookingView = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="lg:hidden heading-text text-lg bg-tertiary rounded-none px-10 py-6 mt-2 focus:bg-tertiarydark data-[state=open]:bg-tertiarydark">
          Book Your Stay
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen p-0 b-0 overflow-y-scroll">
        <DialogHeader>
          <DialogDescription>
            <div className="flex flex-col">
              <div className="h-36 bg-[url(/images/mobileheaderbg.jpeg)] bg-center bg-cover" />
              <div className="px-6 py-24 flex flex-col gap-6">
                <h1 className="heading-text text-4xl text-white">
                  Book Your Stay
                </h1>
                <p className="text-base font-light leading-loose text-white/80 max-w-sm">
                  Welcome to APT, Your one stop for elegant hotels and resorts.
                  Explore stays on the edge of a tranquil and beautiful Garden
                  Islands, to cozy urban hotels. APT is your source of havens of
                  warmth, tranquility and rejuvenation.{" "}
                </p>
                <MobileBooking />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MobileBookingView;
