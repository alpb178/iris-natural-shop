import { Metadata } from "next";

import { Container } from "@/components/container";
import { AmbientColor } from "@/components/decorations/ambient-color";
import { ProductItems } from "@/components/products/product-items";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";

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

export default async function Services({
  params
}: {
  params: { locale: string };
}) {
  const services = await fetchContentType("products");

  return (
    <div className="relative w-full overflow-hidden">
      <AmbientColor />
      <Container className="pt-10 pb-40">
        <ProductItems
          services={services?.data}
          locale={params.locale}
          heading="Nuestros Servicios"
          sub_heading="Descubre lo que podemos hacer por ti"
        />
      </Container>
    </div>
  );
}
