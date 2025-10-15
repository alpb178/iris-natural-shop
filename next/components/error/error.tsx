"use client";

import Image from "next/image";

export function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/logo.jpeg"
          alt="Error"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
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
