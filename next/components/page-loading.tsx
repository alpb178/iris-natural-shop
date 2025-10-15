"use client";

import Image from "next/image";
import { Loader } from "./loader/Loader";

interface PageLoadingProps {
  message?: string;
  submessage?: string;
}

export function PageLoading({
  message = "Cargando Iris Natural Shop...",
  submessage = "Preparando tu experiencia"
}: PageLoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Image src="/logo.jpeg" alt="Error" width={100} height={100} />
      <div className="text-center">
        <Loader size={64} />
        <div className="mt-6">
          <p className="text-xl font-medium text-foreground">{message}</p>
          <p className="text-sm text-muted-foreground mt-2">{submessage}</p>
        </div>
      </div>
    </div>
  );
}
