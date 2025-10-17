"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { Fragment, useState } from "react";
import { CloseButton } from "../button/close-button/CloseButton";
import { Modal } from "../modal/Modal";
import { useTheme } from "@/context/theme-context";
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

export const MobileNavbar = ({
  leftNavbarItems,
  rightNavbarItems,
  logo,
  locale
}: Props) => {
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  const { isDark } = useAppMode();
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
        "flex justify-between items-center bg-transparent px-4 py-3 w-full transition duration-200",
        showBackground ? "backdrop-blur-xl bg-card/70" : "bg-background"
      )}
    >
      <Logo image={logo?.image} />

      <MenuIcon
        className="size-6 text-foreground"
        onClick={() => setOpen(!open)}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        hideCloseButton
        position="right"
        className="bg-card/60"
      >
        <>
          <div className="flex justify-between items-center p-6 pt-4 w-full">
            <Logo locale={locale} image={logo?.image} />
            <div className="flex items-center space-x-2">
              {/* <LocaleSwitcher currentLocale={locale} /> */}
              <CloseButton onClick={() => setOpen(false)} />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-4 px-6">
            {leftNavbarItems.map((navItem: any, idx: number) => (
              <Fragment key={navItem.URL}>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map((childNavItem: any, idx: number) => (
                      <Link
                        key={childNavItem.URL}
                        href={`/${locale}${childNavItem.URL}`}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem] text-xl"
                      >
                        <span className="block text-foreground">
                          {childNavItem.text}
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={`/${locale}${navItem.URL}`}
                    onClick={() => setOpen(false)}
                    className="relative"
                  >
                    <span className="block text-foreground text-xl">
                      {navItem.text}
                    </span>
                  </Link>
                )}
              </Fragment>
            ))}
          </div>

          <div className="flex flex-row items-start gap-2.5 px-6 py-8 w-full">
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
        </>
      </Modal>
    </div>
  );
};
