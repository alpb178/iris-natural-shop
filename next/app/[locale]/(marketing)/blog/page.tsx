import { Container } from "@/components/container";
import { AmbientColor } from "@/components/decorations/ambient-color";
import { FeatureIconContainer } from "@/components/dynamic-zone/features/feature-icon-container";
import { Subheading } from "@/components/elements/subheading";
import { Text } from "@/components/text/Text";
import { Article } from "@/definitions/Article";
import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import { generateMetadataObject } from "@/lib/shared/metadata";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlogCard } from "@/ui/blog/blog-card";
import { BlogPostRows } from "@/ui/blog/blog-post-rows";
import { IconClipboardText } from "@tabler/icons-react";
import { type Metadata } from "next";
import ClientSlugHandler from "../ClientSlugHandler";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    "blog-page",
    {
      filters: { locale: params.locale },
      populate: "seo.metaImage"
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Blog({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const blogPage = await fetchContentType(
    "blog-page",
    {
      filters: { locale: params.locale }
    },
    true
  );
  const articles = await fetchContentType(
    "articles",
    {
      filters: { locale: params.locale }
    },
    false
  );

  const localizedSlugs = useLocalizedSlugs(
    blogPage?.localizations,
    params.locale,
    "blog"
  );

  return (
    <div className="relative py-20 md:py-0 overflow-hidden">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <AmbientColor />
      <Container className="flex flex-col justify-between items-center pb-20">
        <div className="z-20 relative py-10 md:pt-40">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconClipboardText className="w-6 h-6 text-foreground" />
          </FeatureIconContainer>
          <Text
            as="title"
            className="mt-4 text-center"
            content={blogPage.heading}
          />

          <Subheading className="mx-auto max-w-3xl">
            {blogPage.sub_heading}
          </Subheading>
        </div>

        {articles.data.slice(0, 1).map((article: Article) => (
          <BlogCard
            article={article}
            locale={params.locale}
            key={article.title}
          />
        ))}

        <BlogPostRows articles={articles.data} />
      </Container>
    </div>
  );
}
