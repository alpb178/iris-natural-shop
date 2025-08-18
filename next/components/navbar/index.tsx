"use client";

import { useMediaQuery } from "@/hooks/useMediaContext";
import { motion } from "framer-motion";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

export function Navbar({ data, locale }: { data: any; locale: string }) {
  const { from, to } = useMediaQuery();

  return (
    <motion.nav className="top-0 z-50 fixed inset-x-0 mx-auto w-full">
      {from("lg") && (
        <div className="hidden lg:block w-full">
          {data?.left_navbar_items && (
            <DesktopNavbar
              locale={locale}
              leftNavbarItems={data?.left_navbar_items}
              rightNavbarItems={data?.right_navbar_items}
              logo={data?.logo}
            />
          )}
        </div>
      )}

      {from("xs") && to("lg") && (
        <div className="lg:hidden flex items-center w-full h-full">
          {data?.left_navbar_items && (
            <MobileNavbar
              locale={locale}
              leftNavbarItems={data?.left_navbar_items}
              rightNavbarItems={data?.right_navbar_items}
              logo={data?.logo}
            />
          )}
        </div>
      )}
    </motion.nav>
  );
}
