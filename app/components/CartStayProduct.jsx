import Image from "next/image";
import { format } from "date-fns";

const CartStayProduct = ({ name, price, photos, rooms, dates }) => {
  return (
    <div className="flex">
      <div className="flex items-center gap-4 w-[40%]">
        <Image
          className="w-[100px] h-[100px] rounded-none object-center object-fit"
          width={100}
          height={100}
          src={photos[0]}
          alt={name}
        />
        <div className="flex flex-col">
          <p className="font-normal max-w-[200px]">{name}</p>
          <p className="text-content text-xs">
            <span className="text-heading">Date: </span>
            {format(new Date(dates[0].startDate), "dd MMM yy")} -{" "}
            {format(new Date(dates[0].endDate), "dd MMM yy")}
          </p>
        </div>
      </div>
      <div className="flex-grow items-center justify-between flex">
        <p>£{price}</p>
        <p>{rooms}</p>
        <p>£{new Intl.NumberFormat("en-US").format(price * rooms)}</p>
      </div>
    </div>
  );
};

export default CartStayProduct;
