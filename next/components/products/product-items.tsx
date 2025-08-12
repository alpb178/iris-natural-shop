import { Service } from "@/definitions/Service";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { formatNumber, truncate } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

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
      <h2 className="bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground mb-2 font-medium text-transparent text-2xl md:text-4xl">
        {heading}
      </h2>
      <p className="mt-4 mb-10 text-muted-foreground text-lg">{sub_heading}</p>
      <div className="gap-20 grid grid-cols-1 md:grid-cols-3">
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
      className="group block relative"
    >
      <div className="relative bg-card border border-border rounded-md overflow-hidden">
        <div className="z-30 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80 transition-all duration-200" />

        <Image
          src={strapiImage(service.images?.[0]?.url ?? "")}
          alt={service.name}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <span className="font-medium text-foreground text-base">
            {service.name}
          </span>
          <span className="bg-primary/10 shadow-sm px-2 py-1 rounded-full text-foreground text-xs">
            ${formatNumber(service.price)}
          </span>
        </div>
        <p className="mt-4 text-muted-foreground text-sm">
          {truncate(service.description, 100)}
        </p>
      </div>
    </Link>
  );
};
