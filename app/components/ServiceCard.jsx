import Image from "next/image";

const ServiceCard = ({ name, image, description }) => {
  return (
    <div className="flex gap-6 w-full items-start">
      <Image
        src={image}
        width={36}
        height={36}
        alt={name}
        className=" w-10 h-10"
      />
      <div className="flex flex-col gap-2">
        <h4 className="text-heading heading-text text-lg">{name}</h4>
        <p className="text-content">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
