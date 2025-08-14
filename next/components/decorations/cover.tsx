"use client";
import { motion } from "framer-motion";
import React from "react";
export const Cover = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="inline-block relative bg-card px-2 py-1">
      <span className="text-card-foreground">{children}</span>
      <CircleIcon className="-top-[2px] -right-[2px] absolute" />
      <CircleIcon className="-right-[2px] -bottom-[2px] absolute" delay={0.4} />
      <CircleIcon className="-top-[2px] -left-[2px] absolute" delay={0.8} />
      <CircleIcon className="-bottom-[2px] -left-[2px] absolute" delay={1.6} />
    </div>
  );
};

export const CircleIcon = ({
  className,
  delay
}: {
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0.2
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{
        duration: 1,
        delay: delay ?? 0,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
        repeatDelay: delay
      }}
      className={`pointer-events-none h-2 w-2 rounded-full bg-foreground opacity-20 ${className}`}
    ></motion.div>
  );
};
