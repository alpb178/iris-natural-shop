"use client";

import { ProductItems } from "@/components/products/product-items";

export const RelatedProducts = ({
  heading,
  sub_heading,
  products,
  locale
}: {
  heading: string;
  sub_heading: string;
  products: any[];
  locale: string;
}) => {
  return (
    <div className="mt-10">
      <ProductItems
        heading={heading}
        sub_heading={sub_heading}
        services={products}
        locale={locale}
      />
    </div>
  );
};
