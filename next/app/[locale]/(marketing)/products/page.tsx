import { Container } from "@/components/container";
import { ProductItems } from "@/components/products/product-items";
import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";

import { Metadata } from "next";
import ClientSlugHandler from "../ClientSlugHandler";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "product-page",
    {
      filters: {
        locale: "en"
      },
      populate: "seo.metaImage"
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Products({
  params
}: {
  params: { locale: string };
}) {
  // Fetch the product-page and products data
  const productPage = await fetchContentType(
    "product-page",
    {
      filters: {
        locale: "en"
      }
    },
    true
  );
  const products = await fetchContentType("products");

  const localizedSlugs = useLocalizedSlugs(
    productPage?.localizations,
    "en",
    "products"
  );

  return (
    <div className="relative w-full overflow-hidden">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />

      <Container className="pt-2 pb-40">
        <ProductItems services={products?.data} locale="en" />
      </Container>
    </div>
  );
}
