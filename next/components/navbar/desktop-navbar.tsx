"use client";

import { Button } from "@/components/button/Button";
import { Logo } from "@/components/logo";
import { useCart } from "@/context/cart-context";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { BookAppointmentModal } from "@/ui/appointments/BookAppointmentModal";
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

  const { addToCart } = useCart();
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
        "flex justify-between mx-auto px-4 py-3 rounded-md w-full transition duration-200",
        showBackground ? "backdrop-blur-2xl bg-card/65" : "bg-transparent"
      )}
    >
      {/* <AnimatePresence>
        {showBackground && (
          <motion.div
            key={String(showBackground)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1
            }}
            className="absolute inset-0 bg-card rounded-full w-full h-full pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent,white)]"
          />
        )}
      </AnimatePresence> */}
      <div className="flex flex-row items-center gap-2">
        <Logo locale={locale} image={logo?.image} />
        <div className="flex items-center gap-1.5">
          {leftNavbarItems.map((item) => (
            <NavbarItem
              href={`/${locale}${item.URL}` as never}
              key={item.text}
              target={item.target}
            >
              {item.text}
            </NavbarItem>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* <LocaleSwitcher currentLocale={locale} /> */}

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

        <BookAppointmentModal />
      </div>
    </div>
  );
};
