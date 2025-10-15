"use client";

import PageContent from "../lib/shared/PageContent";
import { LoadingWrapper } from "./loading-wrapper";
import { useStrapiData } from "@/hooks/useStrapiData";

interface PageContentWrapperProps {
  contentType: string;
  params: Record<string, unknown>;
  locale: string;
  children?: React.ReactNode;
}

export function PageContentWrapper({
  contentType,
  params,
  locale,
  children
}: PageContentWrapperProps) {
  const {
    data: pageData,
    loading,
    error
  } = useStrapiData({
    contentType,
    params,
    spreadData: true
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Error al cargar el contenido
          </h1>
          <p className="text-gray-600 mb-4">
            No se pudo cargar la información de la página. Por favor, inténtalo
            de nuevo.
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
    <LoadingWrapper
      loading={loading}
      fallback={
        <div className="text-center">
          <p className="text-lg font-medium">Cargando contenido...</p>
          <p className="text-sm text-gray-500 mt-2">Preparando la página</p>
        </div>
      }
    >
      {pageData ? <PageContent pageData={pageData} /> : children}
    </LoadingWrapper>
  );
}
