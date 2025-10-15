import { HOME_PAGE } from "@/lib/constants/pages";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Metadata } from "next";
import { HomeClient } from "./home-client";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: HOME_PAGE,
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

export default async function HomePage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  return <HomeClient locale={locale} />;
}
