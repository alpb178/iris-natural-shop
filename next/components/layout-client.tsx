"use client";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { LoadingWrapper } from "./loading-wrapper";
import { PageLoading } from "./page-loading";
import { useStrapiData } from "@/hooks/useStrapiData";
import { Error } from "./error/error";
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

  console.log("pageData - layout-client", pageData);

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
