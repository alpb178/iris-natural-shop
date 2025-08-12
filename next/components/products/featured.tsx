import { Service } from "@/definitions/Service";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { formatNumber } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

export const Featured = ({
  products,
  locale
}: {
  products: Service[];
  locale: string;
}) => {
  return (
    <div className="py-20">
      <h2 className="bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground mb-2 font-medium text-transparent text-2xl md:text-4xl">
        Featured
      </h2>
      <p className="mt-4 mb-10 text-foreground text-lg">
        Pick from our most popular collection
      </p>
      <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <FeaturedItem product={products[0]} locale={locale} />
        </div>
        <div className="gap-10 grid">
          <FeaturedItem product={products[1]} locale={locale} />
          <FeaturedItem product={products[2]} locale={locale} />
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
      href={`/${locale}/products/${product.slug}` as never}
      className="group block relative border border-foreground rounded-md overflow-hidden"
    >
      <div className="z-30 absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground transition-all duration-200" />
      <div className="top-4 md:top-10 right-2 md:right-10 z-40 absolute flex items-center gap-4 bg-foreground py-1 pr-1 pl-4 rounded-full font-medium text-foreground text-sm">
        <span>{product.name}</span>
        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-2 py-1 rounded-full text-foreground">
          ${formatNumber(product.price)}
        </span>
      </div>
      <Image
        src={strapiImage(product.images[0].url)}
        alt={product.name}
        width={1000}
        height={1000}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
      />
    </Link>
  );
};
