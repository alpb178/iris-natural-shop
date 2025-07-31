"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: never;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: string;
};

export function NavbarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md transition duration-200",
        "text-foreground hover:text-foreground/80",
        "hover:bg-neutral-800/10 dark:hover:bg-neutral-800",
        "hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset]",
        (active || pathname?.includes(href)) &&
          "bg-transparent text-foreground",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  );
}
