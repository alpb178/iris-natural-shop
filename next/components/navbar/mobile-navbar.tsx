"use client";
import { Button } from "@/components/elements/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { CloseButton } from "../button/close-button/CloseButton";
import { Modal } from "../modal/Modal";

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
        "flex justify-between items-center bg-transparent px-2.5 py-2 rounded-md w-full transition duration-200",
        showBackground && "bg-card/60 backdrop-blur-2xl"
      )}
    >
      <Logo image={logo?.image} />

      <MenuIcon
        className="w-8 h-8 text-foreground"
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
              <>
                {navItem.children && navItem.children.length > 0 ? (
                  <>
                    {navItem.children.map((childNavItem: any, idx: number) => (
                      <Link
                        key={`link=${idx}`}
                        href={`/${locale}${childNavItem.URL}`}
                        onClick={() => setOpen(false)}
                        className="relative max-w-[15rem] text-2xl"
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
        </>
      </Modal>
    </div>
  );
};
