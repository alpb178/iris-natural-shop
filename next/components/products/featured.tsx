import { Service } from "@/definitions/Service";
import { formatPrice } from "@/lib/price";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Text } from "../text/Text";

export const Featured = ({
  products,
  locale
}: {
  products: Service[];
  locale: string;
}) => {
  return (
    <div className="py-20">
      {/* <h2 className="bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground mb-2 font-medium text-transparent text-2xl md:text-4xl">
        Featured
      </h2>
      <p className="mt-4 mb-10 text-foreground text-lg">
        Pick from our most popular collection
      </p> */}
      <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <FeaturedItem product={products[0]} locale={locale} />
        </div>
        <div className="gap-10 grid">
          {products[1] && (
            <FeaturedItem product={products[1]} locale={locale} />
          )}
          {products[2] && (
            <FeaturedItem product={products[2]} locale={locale} />
          )}
        </div>
      </div>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-3"></div>
    </div>
  );
};

const FeaturedItem = ({
  product,
  locale
}: {
  product: Service;
  locale: string;
}) => {
  return (
    <Link
      href={`/${locale}/services/${product?.slug}` as never}
      className="group block relative border border-foreground rounded overflow-hidden"
    >
      <div className="z-30 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground transition-all duration-200" />
      <div className="top-4 md:top-10 right-2 md:right-10 z-40 absolute flex items-center gap-4 bg-foreground/30 backdrop-blur-md py-1 pr-1 pl-4 border border-card rounded-full font-semibold text-card">
        <Text as="span" content={product?.name} />
        <Text
          as="span"
          className="bg-gradient-to-r from-accent to-primary px-2 py-1 rounded-full text-foreground"
          content={formatPrice({ price: product?.price ?? 0 }).toString()}
        />
      </div>
      <Image
        src={strapiImage(product?.images[0]?.url)}
        alt={product?.name}
        width={1000}
        height={1000}
        className="w-full object-cover aspect-square group-hover:scale-105 transition duration-200"
      />
    </Link>
  );
};
