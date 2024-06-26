import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import SimilarStaysView from "@/app/components/SimilarStaysView";
import SingleStayResult from "@/app/components/SingleStayResult";
import SubscribeView from "@/app/components/SubscribeView";

const page = async ({ params }) => {
  let data = null;

  try {
    const response = await fetch(
      `https://aptapihosted.onrender.com/api/hotels/search/${params.id}`
    );
    data = await response.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="overflow-x-hidden relative">
      <div className="h-[600px] max-md:h-[400px] bg-[url(/images/auth3.jpg)] bg-no-repeat bg-center bg-cover relative flex flex-col ">
        <div className="absolute w-full h-full bg-black/40 z-2" />
        <Navbar />
        <div className="flex flex-grow items-center justify-center px-7">
          <p className="heading-text max-md:text-center max-md:text-5xl text-white text-7xl z-5 relative">
            {data !== null && data.name}
          </p>
        </div>
      </div>
      <div className="boxed flex flex-col py-24 max-md:pt-16 max-md:pb-20">
        {data !== null && (
          <SingleStayResult
            data={data}
            _id={data._id}
            name={data.name}
            type={data.type}
            city={data.city}
            country={data.country}
            address={data.address}
            photos={data.photos}
            title={data.title}
            extract={data.extract}
            description={data.description}
            roomAmenities={data.roomAmenities}
            included={data.included}
            rating={data.rating}
            cheapestPrice={data.cheapestPrice}
            featured={data.featured}
            guestLimit={data.guestLimit}
          />
        )}
        <div className="flex flex-col border-t mt-20 pt-10 gap-10 border-t-gray-300 max-md:px-7">
          <h3 className="heading-text text-2xl">Similar Stays</h3>
          <div className="flex gap-6">
            {data && (
              <SimilarStaysView guestLimit={data.guestLimit} id={data._id} />
            )}
          </div>
        </div>
      </div>
      <SubscribeView />
      <Footer />
    </div>
  );
};

export default page;
