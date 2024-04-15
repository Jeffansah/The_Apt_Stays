"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/galleryDialog";

const Gallery = ({ photos, name }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {photos.map((photo) => (
        <Dialog>
          <DialogTrigger asChild className="cursor-pointer">
            <Image
              src={photo}
              alt={name}
              width={400}
              height={400}
              className="object-center object-cover h-[250px] max-md:h-[120px] full"
            />
          </DialogTrigger>
          <DialogContent className="p-0">
            <Image
              src={photo}
              alt={name}
              width={1000}
              height={800}
              className="object-center object-cover h-[80vh] max-md:h-[30vh] w-[80vw] max-md:w-full"
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default Gallery;
