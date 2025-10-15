"use client";

import { useTheme } from "@/context/theme-context";
import { useEffect, useState } from "react";

export type AppMode = "light" | "dark";

interface UseAppModeReturn {
  mode: AppMode;
  isDark: boolean;
  isLight: boolean;
  toggleMode: () => void;
  setMode: (mode: AppMode) => void;
}

/**
 * Hook personalizado para obtener información sobre el modo de la aplicación
 * @returns Objeto con información del modo actual y funciones para cambiarlo
 */
export function useAppMode(): UseAppModeReturn {
  const { theme, toggleTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Verificar si estamos en el cliente para evitar hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Si no estamos en el cliente, devolver valores por defecto
  if (!isClient) {
    return {
      mode: "light",
      isDark: false,
      isLight: true,
      toggleMode: () => {},
      setMode: () => {}
    };
  }

  return {
    mode: theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleMode: toggleTheme,
    setMode: (newMode: AppMode) => {
      if (newMode !== theme) {
        toggleTheme();
      }
    }
  };
}

/**
 * Hook simplificado que solo devuelve si está en modo oscuro
 * @returns true si está en modo oscuro, false si está en modo claro
 */
export function useIsDarkMode(): boolean {
  const { isDark } = useAppMode();
  return isDark;
}

/**
 * Hook simplificado que solo devuelve si está en modo claro
 * @returns true si está en modo claro, false si está en modo oscuro
 */
export function useIsLightMode(): boolean {
  const { isLight } = useAppMode();
  return isLight;
}
