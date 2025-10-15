import { Container } from "@/components/container";
import { AmbientColor } from "@/components/decorations/ambient-color";
import DynamicZoneManager from "@/components/dynamic-zone/manager";
import { SingleService } from "@/components/products/single-product";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "products",
    {
      filters: { slug: params.slug },
      populate: "seo.metaImage"
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function SingleProductPage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  const service = await fetchContentType(
    "products",
    {
      filters: { slug: params.slug }
    },
    true
  );

  if (!service) {
    redirect("/products");
  }

  return (
    <div className="relative w-full overflow-hidden">
      <AmbientColor />
      <Container className="py-20 md:py-40">
        <SingleService service={service} />
        {service?.dynamic_zone && (
          <DynamicZoneManager dynamicZone={service?.dynamic_zone} locale="en" />
        )}
      </Container>
    </div>
  );
}
