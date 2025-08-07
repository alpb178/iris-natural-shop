import { cn } from "@/lib/utils";
import React from "react";

export const FeatureIconContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="[perspective:400px] [transform-style:preserve-3d]">
      <div
        className={cn(
          "relative bg-gradient-to-b from-muted to-muted/80 mx-auto p-[4px] rounded-md w-14 h-14"
        )}
        style={{
          transform: "rotateX(25deg)",
          transformOrigin: "center"
        }}
      >
        <div
          className={cn(
            "z-20 relative bg-card rounded-[5px] w-full h-full",
            className
          )}
        >
          {children}
        </div>
        <div className="bottom-0 z-30 absolute inset-x-0 bg-primary opacity-50 blur-lg mx-auto rounded-full w-full h-4"></div>
        <div className="bottom-0 absolute inset-x-0 bg-gradient-to-r from-transparent to-transparent mx-auto via-border w-[60%] h-px"></div>
        <div className="bottom-0 absolute inset-x-0 bg-gradient-to-r from-transparent to-transparent blur-sm mx-auto via-border w-[60%] h-[8px]"></div>
      </div>
    </div>
  );
};
