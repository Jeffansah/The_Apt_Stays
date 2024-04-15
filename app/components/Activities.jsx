import { activities } from "@/data/activities";
import ActivityCard from "./ActivityCard";

const Activities = () => {
  return (
    <div
      className={`flex max-md:flex-col gap-14 lg:absolute left-1/2 lg:-translate-x-1/2  top-1/2 lg:translate-y-[40px] max-md:hidden`}
    >
      {activities.map((activity) => (
        <ActivityCard
          image={activity.image}
          name={activity.name}
          description={activity.description}
          key={activity.name}
          translateY={activity.translate}
        />
      ))}
    </div>
  );
};

export default Activities;
