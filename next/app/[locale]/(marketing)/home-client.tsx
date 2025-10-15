"use client";

import { useLocalizedSlugs } from "@/hooks/useLocalizedSlugs";
import { useStrapiData } from "@/hooks/useStrapiData";
import { HOME_PAGE } from "@/lib/constants/pages";
import { LoadingWrapper } from "@/components/loading-wrapper";
import { PageLoading } from "@/components/page-loading";
import PageContent from "@/lib/shared/PageContent";
import ClientSlugHandler from "./ClientSlugHandler";

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
        locale: locale
      }
    },
    spreadData: true
  });

  const localizedSlugs = useLocalizedSlugs(pageData?.localizations, locale, "");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error al cargar la página</h1>
          <p className="text-gray-600 mb-4">
            No se pudo cargar el contenido de la página principal. Por favor,
            inténtalo de nuevo.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
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
