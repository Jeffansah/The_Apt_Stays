import MobileBooking from "./MobileBooking";

const ConfirmBooking = ({
  data: {
    _id,
    name,
    type,
    city,
    country,
    address,
    photos,
    title,
    extract,
    description,
    roomAmenities,
    included,
    rating,
    cheapestPrice,
    featured,
    guestLimit,
    isSearchPage = false,
  },
}) => {
  return (
    <div className="flex flex-col gap-10 py-14 w-[35%] max-md:w-full px-10 shadow-xl max-h-[600px]">
      <div className="flex justify-between items-end max-md:items-center">
        <h3 className="heading-text text-heading text-3xl max-md:text-2xl">
          RESERVE
        </h3>
        <p className="text-content text-sm">
          From <span className="text-heading">£{cheapestPrice} /night</span>
        </p>
      </div>
      <MobileBooking
        isSearchPage={true}
        isBookingPage={true}
        id={_id}
        price={cheapestPrice}
        guestLimit={guestLimit}
        name={name}
      />
    </div>
  );
};

export default ConfirmBooking;
