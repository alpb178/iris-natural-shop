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
    params: { filters: { locale: "en" } },
    spreadData: true
  });

  return (
    <>
      <Navbar data={pageData?.navbar || {}} locale="en" />
      <div className="pt-16">
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
      </div>
      <Footer data={pageData?.footer || {}} locale="en" />
    </>
  );
}
