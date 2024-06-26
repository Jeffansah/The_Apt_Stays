import FeaturedStayCard from "./FeaturedStayCard";
import _ from "lodash";

const FeaturedStayView = async () => {
  const response = await fetch("https://aptapihosted.onrender.com/api/hotels/featured");
  const data = await response.json();

  return (
    <div className="flex max-md:flex-col lg:justify-between flex-wrap w-full gap-y-14 mt-10 max-md:px-">
      {data &&
        _.slice(_.shuffle(data), 0, 3).map((featured) => (
          <FeaturedStayCard
            className={""}
            key={featured._id}
            name={featured.name}
            extract={featured.extract}
            description={featured.description}
            photos={featured.photos}
            price={featured.cheapestPrice}
            type={featured.type}
            id={featured._id}
          />
        ))}
    </div>
  );
};

export default FeaturedStayView;
