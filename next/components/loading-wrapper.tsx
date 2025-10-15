"use client";

import { Loader } from "./loader/Loader";

interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactElement | string;
  fullScreen?: boolean;
}

export function LoadingWrapper({
  loading,
  children,
  fallback,
  fullScreen = false
}: LoadingWrapperProps) {
  if (loading) {
    return (
      <Loader fullScreen={fullScreen} size={48}>
        {fallback || (
          <p className="mt-4 text-sm text-gray-600">Cargando contenido...</p>
        )}
      </Loader>
    );
  }

  return <>{children}</>;
}
