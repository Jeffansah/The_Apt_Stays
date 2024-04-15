import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SimilarStayCard = ({
  name,
  photos,
  _id,
  description,
  cheapestPrice,
  title,
  type,
}) => {
  return (
    <div
      className={`w-[400px] h-[400px] max-md:w-full max-md:h-[350px] max-md:flex-1 gap-6 max-md:gap-5 group relative overflow-hidden text-white cursor-pointer`}
    >
      <div className="absolute w-full h-full bg-black/20 z-2 z-[2] inset-0 transition group-hover:bg-theme/90 duration-500 ease-in-out" />

      <Image
        src={photos[0]}
        alt={name}
        layout="fill"
        className={`absolute x-[1]  w-full h-full object-cover object center group-hover:scale-110 transition-transform duration-500 ease-in-out`}
      />
      <p className="absolute top-4 left-4 bg-white rounded-none p-3 text-xs text-content z-[3]">
        £{cheapestPrice} / NIGHT
      </p>
      <div className="absolute z-[3] flex flex-col gap-4 left-7 bottom-8 transition group-hover:opacity-0 duration-500 ease-in-out">
        <h3 className="heading-text text-3xl max-md:text-2xl max-w-xs">
          {name}
        </h3>
        <p className="text-sm">{title}</p>
      </div>
      <div className="absolute z-[3] bottom-0 left-7 group-hover:flex flex-col gap-6 opacity-0 transition group-hover:opacity-100 group-hover:-translate-y-7 duration-500 ease-in-out">
        <p className=" line-clamp-4 text-sm max-w-xs">{description}</p>
        <Link
          href={`/stays/${type}/${_id}`}
          className="flex items-center gap-2 max-w-max text-sm"
        >
          <button className="pb-1 border-b border-b-tertiary">
            Discover more
          </button>
          <ChevronRightIcon className=" w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default SimilarStayCard;
