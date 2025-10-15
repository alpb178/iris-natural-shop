"use client";

import { useAppMode, useIsDarkMode, useIsLightMode } from "@/hooks/useAppMode";
import { IconSun, IconMoon } from "@tabler/icons-react";

/**
 * Componente de ejemplo que muestra cómo usar los hooks de modo
 */
export function ModeIndicator() {
  const { mode, isDark, isLight, toggleMode } = useAppMode();
  const isDarkMode = useIsDarkMode();
  const isLightMode = useIsLightMode();

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Información del Modo</h3>

      <div className="space-y-2">
        <p>
          <strong>Modo actual:</strong> {mode}
        </p>
        <p>
          <strong>Es oscuro:</strong> {isDark ? "Sí" : "No"}
        </p>
        <p>
          <strong>Es claro:</strong> {isLight ? "Sí" : "No"}
        </p>
        <p>
          <strong>useIsDarkMode():</strong> {isDarkMode ? "Sí" : "No"}
        </p>
        <p>
          <strong>useIsLightMode():</strong> {isLightMode ? "Sí" : "No"}
        </p>
      </div>

      <button
        onClick={toggleMode}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        {isDark ? (
          <IconSun className="w-4 h-4" />
        ) : (
          <IconMoon className="w-4 h-4" />
        )}
        Cambiar a {isDark ? "modo claro" : "modo oscuro"}
      </button>
    </div>
  );
}
