"use client";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { LoadingWrapper } from "./loading-wrapper";
import { PageLoading } from "./page-loading";
import { useStrapiData } from "@/hooks/useStrapiData";

interface LayoutClientProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export function LayoutClient({
  children,
  locale,
  messages
}: LayoutClientProps) {
  const {
    data: pageData,
    loading,
    error,
    refetch
  } = useStrapiData({
    contentType: "global",
    params: { filters: { locale } },
    spreadData: true
  });

  if (error) {
    console.error("Error loading global data:", error);
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error de conexión</h1>
            <p className="text-gray-600 mb-4">
              No se pudo conectar con el servidor. Por favor, inténtalo de nuevo
              más tarde.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reintentar
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar data={pageData?.navbar || {}} locale={locale} />
      <LoadingWrapper
        loading={loading}
        fullScreen={false}
        fallback={
          <PageLoading
            message="Cargando Iris Natural Shop..."
            submessage="Conectando con el servidor"
          />
        }
      >
        {children}
      </LoadingWrapper>
      <Footer data={pageData?.footer || {}} locale={locale} />
    </>
  );
}
