"use client";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn, formatNumber } from "@/lib/utils";
import { Service } from "@/types/types";
import { BookAppointmentModal } from "@/ui/appointments/BookAppointmentModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const SingleService = ({ service }: { service: Service }) => {
  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(service.images[0].url)
  );

  return (
    <div className="bg-gradient-to-b from-background to-background p-4 md:p-10 rounded-md">
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            key={activeThumbnail}
            className="relative rounded-lg overflow-hidden"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 35
            }}
          >
            <Image
              src={activeThumbnail}
              alt={service.name}
              width={600}
              height={600}
              className="rounded-lg object-cover"
            />
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-4">
            {service.images &&
              service.images.map((image: any, index: number) => (
                <button
                  onClick={() => setActiveThumbnail(strapiImage(image.url))}
                  key={"service-image" + index}
                  className={cn(
                    "border-2 rounded-xl w-20 h-20 transition-colors",
                    activeThumbnail === strapiImage(image.url)
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                  style={{
                    backgroundImage: `url(${strapiImage(image.url)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                ></button>
              ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-foreground text-2xl">
            {service.name}
          </h2>
          <p className="bg-primary/10 mb-6 px-4 py-1 rounded-full w-fit font-medium text-primary text-xs">
            ${formatNumber(service.price)}
          </p>
          <p className="mb-4 font-normal text-muted-foreground text-base leading-relaxed">
            {service.description}
          </p>

          <Divider />

          <BookAppointmentModal />
        </div>
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative my-6">
      <div className="bg-border w-full h-px" />
    </div>
  );
};
