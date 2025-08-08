"use client";
import { Button } from "@/components/elements/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

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
        "flex justify-between items-center bg-transparent px-2.5 py-1.5 rounded-md w-full transition duration-200",
        showBackground &&
          " bg-card shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
      )}
    >
      <Logo image={logo?.image} />

      <IoIosMenu
        className="w-6 h-6 text-foreground"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="z-50 fixed inset-0 flex flex-col justify-start items-start space-y-10 bg-background/95 backdrop-blur-2xl pt-5 text-xl transition duration-200">
          <div className="flex justify-between items-center px-5 w-full">
            <Logo locale={locale} image={logo?.image} />
            <div className="flex items-center space-x-2">
              {/* <LocaleSwitcher currentLocale={locale} /> */}
              <IoIosClose
                className="w-8 h-8 text-foreground"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-[14px] px-8">
            {leftNavbarItems.map((navItem: any, idx: number) => (
              <>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map((childNavItem: any, idx: number) => (
                      <Link
                        key={`link=${idx}`}
                        href={`/${locale}${childNavItem.URL}`}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem] text-2xl text-left"
                      >
                        <span className="block text-foreground">
                          {childNavItem.text}
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    key={`link=${idx}`}
                    href={`/${locale}${navItem.URL}`}
                    onClick={() => setOpen(false)}
                    className="relative"
                  >
                    <span className="block text-[26px] text-foreground">
                      {navItem.text}
                    </span>
                  </Link>
                )}
              </>
            ))}
          </div>
          <div className="flex flex-row items-start gap-2.5 px-8 py-4 w-full">
            {rightNavbarItems.map((item, index) => (
              <Button
                key={item.text}
                variant={
                  index === rightNavbarItems.length - 1 ? "primary" : "simple"
                }
                as={Link}
                href={`/${locale}${item.URL}`}
              >
                {item.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
