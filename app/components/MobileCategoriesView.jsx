"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/categoryCarousel";
import LargeStayCard from "./LargeStayCard";
import { categories } from "@/data/categories";

const MobileCategoriesView = () => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index}>
            <LargeStayCard
              name={category.name}
              image={category.image}
              width={400}
              height={615}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
  Copy;
};

export default MobileCategoriesView;
