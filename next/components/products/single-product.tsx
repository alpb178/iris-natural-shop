"use client";

import { Service } from "@/definitions/Service";
import { formatPrice } from "@/lib/price";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FormattedText } from "../formatted-text";
import { Link } from "next-view-transitions";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export const SingleService = ({ service }: { service: Service }) => {
  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(service.images[0].url)
  );

  console.log("service - single-product", service);

  return (
    <div className="">
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            key={activeThumbnail}
            className="relative rounded overflow-hidden"
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
              className="rounded border-2 border-primary object-cover"
            />
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-4">
            {service.images &&
              service.images.map((image: any, index: number) => (
                <button
                  onClick={() => setActiveThumbnail(strapiImage(image.url))}
                  key={"service-image" + index}
                  className={cn(
                    "border-2 rounded w-20 h-20 transition-colors",
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
          {service.price !== null && service.price > 0 && (
            <p className="bg-primary/10 mb-6 px-4 py-1 rounded-full w-fit font-medium text-primary text-sm">
              {formatPrice({
                price: service.price ?? 0,
                currency: service.currency ?? "BOB"
              }).toString()}
            </p>
          )}
          <FormattedText
            content={service.description}
            className="mb-4 font-normal text-base"
          />

          <Divider />

          <WhatsappLink service={service} />
        </div>
      </div>
    </div>
  );
};

const WhatsappLink = ({ service }: { service: Service }) => {
  return (
    <Link
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola, quiero comprar el producto ${service.name} de ${service?.price} ${service?.currency}`}
      className="flex justify-center items-center gap-2 border border-primary rounded-full px-4 py-2"
    >
      <IconBrandWhatsapp className="w-6 h-6 text-primary" />
      <span className="text-lg">Comprar ahora</span>
    </Link>
  );
};

const Divider = () => {
  return (
    <div className="relative my-6">
      <div className="bg-border w-full h-px" />
    </div>
  );
};
