import { cn } from "@/lib/utils";
import { LinkProps } from "next/link"; // Or from your routing library
import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "simple" | "outline" | "primary" | "muted";
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  href?: LinkProps["href"];
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  as: Tag = "button",
  className,
  children,
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "bg-transparent relative z-10 hover:border-border hover:bg-muted/10 border border-transparent text-foreground  transition font-medium duration-200  px-4 py-2 flex items-center justify-center"
      : variant === "outline"
      ? "bg-background relative z-10 hover:bg-muted hover:shadow-xl text-foreground border  hover:text-foreground  transition font-medium duration-200  px-4 py-2 flex items-center justify-center"
      : variant === "primary"
      ? "bg-primary relative z-10 hover:bg-primary/90 border border-primary text-primary-foreground  transition font-medium duration-200 px-4 py-2 flex items-center justify-center hover:-translate-y-1 active:-translate-y-0"
      : variant === "muted"
      ? "bg-muted relative z-10 hover:bg-muted/80 border border-transparent text-muted-foreground  transition font-medium duration-200  px-4 py-2 flex items-center justify-center shadow-[0px_1px_0px_0px_#FFFFFF20_inset]"
      : "";
  return (
    <Tag
      className={cn(
        "z-10 relative flex justify-center items-center px-4 py-2 border font-medium transition duration-200",
        variantClass,
        className,
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
