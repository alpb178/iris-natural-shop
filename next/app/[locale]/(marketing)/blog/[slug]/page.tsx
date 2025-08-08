import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlogLayout } from "@/ui/blog/blog-layout";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import ClientSlugHandler from "../../ClientSlugHandler";

export default async function SingleArticlePage({
  params
}: {
  params: { slug: string; locale: string };
}) {
  const article = await fetchContentType(
    "articles",
    {
      filters: {
        slug: params.slug,
        locale: params.locale
      }
    },
    true
  );

  const localizedSlugs = useLocalizedSlugs(
    article?.localizations,
    params.locale,
    params.slug
  );

  if (!article) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogLayout article={article} locale={params.locale}>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
