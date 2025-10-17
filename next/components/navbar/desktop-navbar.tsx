"use client";

import { Button } from "@/components/button/Button";
import { Logo, LogoNavbar } from "@/components/logo";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { IconButton } from "../button/icon-button/IconButton";
import { NavbarItem } from "./navbar-item";
import { useAppMode } from "@/hooks/useAppMode";

type Props = {
  leftNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  rightNavbarItems: {
    URL: string;
    text: string;
    target?: string;
  }[];
  logo: any;
  locale: string;
};

export const DesktopNavbar = ({
  leftNavbarItems,
  rightNavbarItems,
  logo,
  locale
}: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  const { isDark } = useAppMode();
  const { theme, toggleTheme } = useTheme();

  const logoIcon = !isDark ? logo?.imageDark : logo?.image;

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });
  return (
    <div
      className={cn(
        "w-full transition duration-200 ",
        showBackground ? "backdrop-blur-xl bg-card/70" : "bg-background"
      )}
    >
      <div className="flex justify-between mx-auto px-4 py-3 max-w-7xl gap-4">
        <LogoNavbar locale={locale} image={logoIcon} />
        <div className="flex flex-row items-center gap-2 w-full">
          {leftNavbarItems && (
            <div className="flex items-center gap-6 w-full">
              {leftNavbarItems.map((item) => (
                <NavbarItem
                  href={`/${locale}${item.URL}` as never}
                  key={item.URL}
                  target={item.target}
                >
                  {item.text}
                </NavbarItem>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end  w-full">
          <button
            onClick={toggleTheme}
            className=" flex flex-row items-center gap-2"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            {theme === "light"
              ? "Cambiar a modo oscuro"
              : "Cambiar a modo claro"}
          </button>
        </div>
      </div>
    </div>
  );
};
