"use client";

import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import { useStrapiData } from "@/hooks/useStrapiData";
import { HOME_PAGE } from "@/lib/constants/pages";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { PageLoading } from "@/components/page-loading";
import PageContent from "@/lib/shared/PageContent";
import ClientSlugHandler from "./ClientSlugHandler";
import { Error } from "@/components/error/error";

interface HomeClientProps {
  locale: string;
}

export function HomeClient({ locale }: HomeClientProps) {
  const {
    data: pageData,
    loading,
    error
  } = useStrapiData({
    contentType: "pages",
    params: {
      filters: {
        slug: HOME_PAGE,
        locale: "en"
      }
    },
    spreadData: true
  });

  const localizedSlugs = useLocalizedSlugs(pageData?.localizations, "en", "");

  if (error) {
    return <Error />;
  }

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <LoadingWrapper
        loading={loading}
        fallback={
          <PageLoading
            message="Cargando Iris Natural Shop..."
            submessage="Preparando tu experiencia"
          />
        }
      >
        <PageContent pageData={pageData} />
      </LoadingWrapper>
    </>
  );
}
