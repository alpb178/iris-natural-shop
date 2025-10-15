"use client";

import { ProductItems } from "@/components/products/product-items";

export const RelatedProducts = ({
  products,
  locale
}: {
  products: any[];
  locale: string;
}) => {
  return (
    <div className="mt-10">
      <ProductItems services={products} locale={locale} />
    </div>
  );
};
