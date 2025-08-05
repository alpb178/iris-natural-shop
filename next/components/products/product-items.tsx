import React from "react";
import { Service } from "@/types/types";
import Image from "next/image";
import { formatNumber, truncate } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const ProductItems = ({
  heading = "Servicios",
  sub_heading = "Recently rose to popularity",
  services,
  locale
}: {
  heading?: string;
  sub_heading?: string;
  services: Service[];
  locale: string;
}) => {
  return (
    <div className="py-20">
      <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground mb-2">
        {heading}
      </h2>
      <p className="text-neutral-500 text-lg mt-4 mb-10">{sub_heading}</p>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-20">
        {services &&
          services.length > 0 &&
          services.map((service) => (
            <ProductItem
              key={"regular-product-item" + service.id}
              service={service}
              locale={locale}
            />
          ))}
      </div>
    </div>
  );
};

const ProductItem = ({
  service,
  locale
}: {
  service: Service;
  locale: string;
}) => {
  return (
    <Link
      href={`/${locale}/services/${service.slug}` as never}
      className="group relative block"
    >
      <div className="relative border border-foreground  rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground transition-all duration-200 z-30" />

        <Image
          src={strapiImage(service.images?.[0]?.url ?? "")}
          alt={service.name}
          width={600}
          height={600}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-200"
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <span className="text-foreground text-base font-medium">
            {service.name}
          </span>
          <span className="bg-foreground text-foreground shadow-derek text-xs px-2 py-1 rounded-full">
            ${formatNumber(service.price)}
          </span>
        </div>
        <p className="text-foreground text-sm mt-4">
          {truncate(service.description, 100)}
        </p>
      </div>
    </Link>
  );
};
