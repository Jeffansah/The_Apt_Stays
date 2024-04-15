import SimilarStayCard from "./SimilarStayCard";

const SimilarStaysView = async ({ guestLimit, id }) => {
  let data = null;
  try {
    const response = await fetch(
      `http://localhost:5000/api/hotels/similar?guests=${guestLimit}&id=${id}`
    );
    const responseData = await response.json();
    data = responseData;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex max-md:flex-col gap-6">
      {data !== null &&
        data.filteredHotels.map((data) => (
          <div className="max-md:w-[87vw]">
            <SimilarStayCard
              name={data.name}
              photos={data.photos}
              _id={data._id}
              description={data.description}
              cheapestPrice={data.cheapestPrice}
              title={data.title}
              type={data.type}
            />
          </div>
        ))}
    </div>
  );
};

export default SimilarStaysView;
