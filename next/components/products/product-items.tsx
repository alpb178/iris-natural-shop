import { Service } from "@/definitions/Service";
import { formatPrice } from "@/lib/price";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { truncate } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Text } from "../text/Text";
import RichTextRenderer from "../rich-text";

const groupServicesByCategory = (services: Service[]) => {
  const grouped: { [key: string]: Service[] } = {};
  const withoutCategory: Service[] = [];

  services?.forEach((service) => {
    const categoryName = service?.categories?.name || "";

    if (categoryName && categoryName.trim() !== "") {
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(service);
    } else {
      withoutCategory.push(service);
    }
  });

  if (withoutCategory.length > 0) {
    grouped["withoutCategory"] = withoutCategory;
  }

  return grouped;
};

export const ProductItems = ({
  services,
  locale
}: {
  services: Service[];
  locale: string;
}) => {
  const groupedServices = groupServicesByCategory(services);
  const categoryNames = Object.keys(groupedServices);

  return (
    <div className="py-20">
      {categoryNames.map((categoryName) => (
        <div key={categoryName} className="mb-20">
          {categoryName !== "withoutCategory" && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {categoryName}
              </h3>

              <div className="w-20 h-1 bg-gradient-to-r from-pink  to-pink/50 rounded-full"></div>
            </div>
          )}

          <div className="gap-20 grid grid-cols-1 md:grid-cols-3">
            {groupedServices[categoryName].map((service) => (
              <ProductItem
                key={`${categoryName}-${service.id}`}
                service={service}
                locale={locale}
              />
            ))}
          </div>
        </div>
      ))}
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
      href={`/${locale}/products/${service.slug}` as never}
      className="group block relative"
    >
      <div className="relative bg-card border border-border rounded overflow-hidden">
        <div className="z-30 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 transition-all duration-200" />

        <Image
          src={strapiImage(service.images?.[0]?.url ?? "")}
          alt={service.name}
          width={500}
          height={500}
          className="w-full h-80 object-cover border-2 border-pink rounded-lg   group-hover:scale-105 transition duration-200"
        />
      </div>

      <div className="mt-8">
        <div className="flex justify-between">
          <span className="font-medium text-foreground text-base">
            {service.name}
          </span>
          {service.price !== null && service.price > 0 && (
            <span className="bg-primary/10 shadow-sm px-2 py-1 rounded-full text-primary text-sm">
              {formatPrice({
                price: service.price ?? 0,
                currency: service.currency ?? "BOB"
              }).toString()}
            </span>
          )}
        </div>
        <p className="mt-4 text-muted-foreground text-sm">
          {truncate(service.description, 100)}
        </p>
      </div>
    </Link>
  );
};
