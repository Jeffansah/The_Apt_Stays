import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

const ServicesView = () => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12 mt-8">
      {services.map(({ name, icon, description }) => (
        <ServiceCard name={name} image={icon} description={description} />
      ))}
    </div>
  );
};

export default ServicesView;
