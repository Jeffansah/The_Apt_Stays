import { people, bed, bath, scale } from "../../data/extractIcons.js";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link.js";

const SearchStayCard = ({
  name,
  extract,
  description,
  photos,
  price,
  className,
  type,
  id,
}) => {
  return (
    <div
      className={`grid grid-cols-2  max-md:w-full gap-6 max-md:gap-5 group ${className}`}
    >
      <div className="overflow-hidden rounded-none w-full h-[300px] relative">
        <Image
          src={photos[0]}
          alt={name}
          layout="responsive"
          width={400}
          height={300}
          className="max-w-[400px] min-w-[400px] max-h-[300px] min-h-[300px] object-cover object center group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <p className="absolute top-4 left-4 bg-white rounded-none p-3 text-xs text-content">
          FROM £{price}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <h4 className="heading-text text-heading text-2xl">{name}</h4>
        <div className="flex gap-6 items-center">
          {extract[0].map((item) => {
            if (item.includes("m2"))
              return (
                <div className="flex gap-3 items-center">
                  <Image src={scale} width={20} height={20} alt="scale icon" />
                  <p className="text-content text-sm">
                    {item.split("m")[0]}m<sup>2</sup>
                  </p>
                </div>
              );
            if (item.includes("Guest"))
              return (
                <div className="flex gap-3 items-center">
                  <Image
                    src={people}
                    width={20}
                    height={20}
                    alt="people icon"
                  />
                  <p className="text-content text-sm">{item}</p>
                </div>
              );
            if (item.includes("Bed"))
              return (
                <div className="flex gap-3 items-center">
                  <Image src={bed} width={20} height={20} alt="bed icon" />

                  <p className="text-content text-sm">{item}</p>
                </div>
              );
          })}
        </div>
        <p className="text-content line-clamp-4 max-w-xs">{description}</p>
        <Link
          href={`/stays/${type}/${id}`}
          className="flex items-center gap-2 max-w-max"
        >
          <button className="pb-1 border-b border-b-tertiary">
            Discover more
          </button>
          <ChevronRightIcon className="text-content w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default SearchStayCard;
