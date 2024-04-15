import { activities } from "@/data/activities";
import ActivityCard from "./ActivityCard";

const MobileActivities = () => {
  return (
    <div className={`flex flex-col gap-14  lg:hidden`}>
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

export default MobileActivities;
