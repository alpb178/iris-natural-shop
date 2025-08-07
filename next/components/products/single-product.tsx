"use client";

import { useCart } from "@/context/cart-context";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn, formatNumber } from "@/lib/utils";
import { Service } from "@/types/types";
import { BookAppointmentModal } from "@/ui/appointments/BookAppointmentModal";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

export const SingleProduct = ({ product }: { product: Service }) => {
  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(product.images[0].url)
  );
  const { addToCart } = useCart();

  return (
    <div className="bg-gradient-to-b from-background to-background p-4 md:p-10 rounded-md">
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
        <div>
          {/* <AnimatePresence initial={false} mode="popLayout"> */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            key={activeThumbnail}
            className="relative rounded-lg overflow-hidden"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 35
            }}
          >
            <Image
              src={activeThumbnail}
              alt={product.name}
              width={600}
              height={600}
              // fill
              className="rounded-lg object-cover"
            />
          </motion.div>
          {/* </AnimatePresence> */}
          <div className="flex justify-center items-center gap-4 mt-4">
            {product.images &&
              product.images.map((image: any, index: number) => (
                <button
                  onClick={() => setActiveThumbnail(strapiImage(image.url))}
                  key={"product-image" + index}
                  className={cn(
                    "rounded-xl w-20 h-20",
                    activeThumbnail === image
                      ? "border-2 border-neutral-200"
                      : "border-2 border-transparent"
                  )}
                  style={{
                    backgroundImage: `url(${strapiImage(image.url)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                ></button>
              ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-semibold text-2xl">{product.name}</h2>
          <p className=" mb-6 px-4 py-1 rounded-full w-fit text-foreground text-xs">
            ${formatNumber(product.price)}
          </p>
          <p className="mb-4 font-normal text-foreground text-base">
            {product.description}
          </p>

          <Divider />

          <BookAppointmentModal onClick={() => addToCart(product)} />
        </div>
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative">
      <div className="bg-background w-full h-px" />
      <div className="bg-background w-full h-px" />
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-start items-start gap-2 my-4">
      <div className="flex flex-shrink-0 justify-center items-center bg-foreground mt-0.5 rounded-full w-4 h-4">
        <IconCheck className="w-3 h-3 text-foreground [stroke-width:4px]" />
      </div>
      <div className="font-medium text-foreground text-sm">{children}</div>
    </div>
  );
};
