import { Metadata } from "next";

import { AmbientColor } from "@/components/decorations/ambient-color";
import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProductItems } from "@/components/products/product-items";
import { Subheading } from "@/components/elements/subheading";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";
import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";

import ClientSlugHandler from "../ClientSlugHandler";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "product-page",
    {
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
  const servicePage = await fetchContentType("product-pages", {}, true);
  const services = await fetchContentType("products");

  const localizedSlugs = useLocalizedSlugs(
    servicePage?.localizations,
    params.locale,
    "products"
  );

  return (
    <div className="relative overflow-hidden w-full">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="pt-10 pb-40">
        <Heading as="h1" className="pt-4">
          {servicePage?.heading}
        </Heading>
        <Subheading className="max-w-3xl mx-auto">
          {servicePage?.sub_heading}
        </Subheading>
        <ProductItems services={services?.data} locale={params.locale} />
      </Container>
    </div>
  );
}
