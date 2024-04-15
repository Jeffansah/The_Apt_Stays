import MobileBooking from "./MobileBooking";
import SearchStayView from "./SearchStayView";

const BookingResults = async () => {
  return (
    <div className="flex lg:min-h-[60vh] max-md:flex-col-reverse max-md:items-center w-full boxed gap-20 max-md:gap-14 max-md:px-7">
      <div className="w-[30%] max-md:w-full">
        <MobileBooking isSearchPage={true} />
      </div>
      <SearchStayView />
    </div>
  );
};

export default BookingResults;
