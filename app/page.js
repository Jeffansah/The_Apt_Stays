import Booking from "./components/Booking";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { categories } from "@/data/categories";
import LargeStayCard from "./components/LargeStayCard";
import MobileCategoriesView from "./components/MobileCategoriesView";
import { Button } from "@/components/ui/button";
import FeaturedStayView from "./components/FeaturedStayView";
import CTA from "./components/CTA";
import Activities from "./components/Activities";
import LargeStayView from "./components/LargeStayView";
import ServicesView from "./components/ServicesView";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import MobileActivities from "./components/MobileActivities";
import SubscribeView from "./components/SubscribeView";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden relative">
        <div className="h-[93vh] max-md:h-screen bg-home bg-no-repeat bg-center bg-cover relative flex flex-col">
          <div className="absolute w-full h-full bg-black/40 z-2" />
          <Navbar />
          <Header />
          <Booking />
        </div>
        <div className="relative bg-[#F3F3F0] lg:pt-40 lg:h-[950px] max-md:pb-20 max-md:max-h-max">
          <div className="flex flex-col items-center gap-6 max-md:gap-5 lg:h-full max-md:h-full  max-md:pt-20 max-md:pb-14 max-md:px-7">
            <Image
              src={"/images/resort.png"}
              width={60}
              height={60}
              alt="resort header icon"
              className="max-md:w-12 max-md:h-12"
            />
            <h3 className="text-subtitle text-sm">WELCOME TO APT</h3>
            <h1 className="text-heading/90 heading-text text-6xl max-md:text-4xl font-light max-w-4xl text-center leading-tight">
              Explore Outstanding Views all around the Globe
            </h1>
            <p className="text-content max-w-3xl text-center leading-loose">
              Welcome to APT, where luxury meets serenity, and elegance
              intertwines with comfort. As your premier destination for
              exquisite hotels and resorts, we invite you to embark on a journey
              of unparalleled hospitality. Embark on a journey of discovery as
              you explore our diverse portfolio of accommodations.
            </p>
            <LargeStayView />
            <p className="w-full max-w-7xl cursive-text text-tertiary text-start max-md:text-center text-xl">
              Inspired by our history, surrounded by nature and designed to{" "}
              <br />
              offer a different experience
            </p>
          </div>

          <div className="lg:hidden grid place-items-center bg-[#F3F3F0]">
            <MobileCategoriesView />
          </div>
        </div>
        <div className="pt-[500px] max-md:py-20 lg:pb-40">
          <div className="boxed flex flex-col gap-6 max-md:items-center">
            <p className="text-subtitle max-md:text-center text-sm">
              ENJOY WORLD-CLASS STAY EXPERIENCE
            </p>
            <div className="flex max-md:flex-col max-md:items-center max-md:gap-6 lg:justify-between items-end">
              <h3 className="heading-text text-heading text-5xl max-md:text-4xl">
                Premier Stays
              </h3>
              <Button className="bg-tertiary hover:bg-tertiarydark text-white rounded-none py-6 px-10 heading-text text-base font-light">
                Explore more
              </Button>
            </div>
            <FeaturedStayView />
          </div>
        </div>
        <div className="lg:w-screen max-md:min-h-max bg-[url(/images/cta3.jpg)] bg-center bg-cover relative max-md:px-7">
          <div className="absolute w-full h-full bg-black/40 z-2 inset-0" />
          <CTA />
          <Activities />
        </div>
        <div className="pt-[500px] max-md:pt-14 lg:pb-40 max-md:px-7 max-md:min-h-max">
          <MobileActivities />
          <div className="relative boxed max-md:pb-20 max-md:pt-32">
            <div className="grid grid-cols-2 gri max-md:flex max-md:flex-col-reverse gap-10">
              <div className="flex flex-col gap-4 max-md:mt-6">
                <Image
                  src={"/images/servicehero1.jpg"}
                  width={600}
                  height={600}
                  alt="service hero"
                  className="rounded-none"
                />
                <p className="cursive-text text-tertiary text-center text-xl">
                  Inspired by our history, surrounded by nature and designed to{" "}
                  <br />
                  offer a different experience
                </p>
              </div>
              <div className="flex justify-center flex-col gap-6">
                <h3 className="text-subtitle text-sm">OUR SERVICES</h3>
                <h1 className="text-heading/90 heading-text text-5xl max-md:text-4xl font-light max-w-4xl leading-tight">
                  All the Essentials for a Cozy and Comfortable Stay
                </h1>
                <ServicesView />
                <Button className="bg-tertiary max-md:hidden hover:bg-tertiarydark text-white rounded-none py-6 px-10 heading-text text-base font-light max-w-max mt-8">
                  Book now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <SubscribeView />
        <Footer />
      </div>
    </>
  );
}
