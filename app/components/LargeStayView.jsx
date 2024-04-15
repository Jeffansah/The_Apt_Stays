"use client";

import LargeStayCard from "./LargeStayCard";
import { categories } from "@/data/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/largeStayCarousel";

const LargeStayView = () => {
  return (
    <div className=" flex gap-10 max-md:hidden mt-12">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-7xl"
      >
        <CarouselContent className="gap-4">
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <LargeStayCard
                image={category.image}
                name={category.name}
                key={category.name}
                width={"310"}
                height={"615"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="" />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LargeStayView;
