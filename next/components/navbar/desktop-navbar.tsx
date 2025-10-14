"use client";

import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MoonIcon, SunIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { IconButton } from "../button/icon-button/IconButton";
import { NavbarItem } from "./navbar-item";

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

  const { theme, toggleTheme } = useTheme();

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
        "w-full transition duration-200",
        showBackground ? "backdrop-blur-xl bg-card/70" : "bg-background"
      )}
    >
      <div className="flex justify-between mx-auto px-4 py-3 max-w-7xl">
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

        <Logo locale={locale} image={logo?.image} />

        <div className="flex justify-end items-center space-x-2 w-full">
          {rightNavbarItems.map((item, index) => (
            <Button
              key={item.text}
              variant={
                index === rightNavbarItems.length - 1 ? "solid" : "outline"
              }
              as={Link}
              href={`/${locale}${item.URL}`}
              label={item.text}
            />
          ))}

          <IconButton
            className="bg-background text-foreground"
            onClick={toggleTheme}
            icon={theme === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </div>
      </div>
    </div>
  );
};
