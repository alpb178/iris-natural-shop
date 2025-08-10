import { Metadata } from "next";

import { AmbientColor } from "@/components/decorations/ambient-color";
import { Container } from "@/components/container";
import { ProductItems } from "@/components/products/product-items";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";

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
  const services = await fetchContentType("products");

  console.log(services, "services");

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Container className="pt-10 pb-40">
        <ProductItems services={services?.data} locale={params.locale} />
      </Container>
    </div>
  );
}
