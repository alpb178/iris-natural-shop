import { Container } from "@/components/container";
import { AmbientColor } from "@/components/decorations/ambient-color";
import { FeatureIconContainer } from "@/components/dynamic-zone/features/feature-icon-container";
import { Subheading } from "@/components/elements/subheading";
import { Featured } from "@/components/products/featured";
import { ProductItems } from "@/components/products/product-items";
import { Text } from "@/components/text/Text";
import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { UsersIcon } from "lucide-react";
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
        locale: params.locale
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
        locale: params.locale
      }
    },
    true
  );
  const products = await fetchContentType("products");

  const localizedSlugs = useLocalizedSlugs(
    productPage?.localizations,
    params.locale,
    "products"
  );
  const featured = products?.data.filter(
    (product: { featured: boolean }) => product.featured
  );

  return (
    <div className="relative w-full overflow-hidden">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="pt-40 pb-40">
        {featured?.length > 0 && (
          <>
            <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
              <UsersIcon className="size-6 text-foreground" />
            </FeatureIconContainer>
            <Text
              as="title"
              className="pt-4 text-center"
              content={productPage.heading}
            />
            <Subheading className="mx-auto max-w-3xl">
              {productPage.sub_heading}
            </Subheading>
            <Featured products={featured} locale={params.locale} />
          </>
        )}
        <ProductItems services={products?.data} locale={params.locale} />
      </Container>
    </div>
  );
}
