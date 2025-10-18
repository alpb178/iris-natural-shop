"use client";

import { Service } from "@/definitions/Service";
import { formatPrice } from "@/lib/price";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FormattedText } from "../formatted-text";
import { Link } from "next-view-transitions";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { QuantitySelector } from "./quantity-selector";
import { DeliveryOptions, DeliveryOption } from "./delivery-options";
import { useDeliveryOption } from "@/hooks/useDeliveryOption";

export const SingleService = ({ service }: { service: Service }) => {
  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(service.images[0].url)
  );
  const [quantity, setQuantity] = useState(1);
  const {
    deliveryOption,
    handleDeliveryChange,
    getDeliveryText,
    getButtonText
  } = useDeliveryOption();

  return (
    <div className="">
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            key={activeThumbnail}
            className="relative rounded overflow-hidden"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 35
            }}
          >
            <Image
              src={activeThumbnail}
              alt={service.name}
              width={600}
              height={600}
              className="rounded border-2 border-pink object-cover  md:h-[800px] h-[400px]"
            />
          </motion.div>

          <div className="flex justify-center items-center gap-4 mt-4">
            {service.images &&
              service.images.map((image: any, index: number) => (
                <button
                  onClick={() => setActiveThumbnail(strapiImage(image.url))}
                  key={"service-image" + index}
                  className={cn(
                    "border-2 rounded w-20 h-20 transition-colors",
                    activeThumbnail === strapiImage(image.url)
                      ? "border-pink ring-2 ring-pink/20"
                      : "border-border hover:border-pink/50"
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
          <div className="flex justify-between items-center">
            <h2 className="mb-4 font-semibold text-foreground text-2xl">
              {service.name}
            </h2>
            {service.price !== null && service.price > 0 && (
              <p className="bg-primary/10 mb-6 px-4 py-1 rounded-full w-fit font-medium text-primary text-sm">
                {formatPrice({
                  price: service.price ?? 0,
                  currency: service.currency ?? "BOB"
                }).toString()}
              </p>
            )}
          </div>

          <FormattedText
            content={service.description}
            className="mb-4 font-normal text-base"
          />

          <div className="mb-6">
            <QuantitySelector
              min={1}
              max={20}
              initialValue={quantity}
              onQuantityChange={setQuantity}
              className="mb-4"
            />

            {/* Opciones de entrega */}
            <DeliveryOptions
              value={deliveryOption}
              onChange={handleDeliveryChange}
              className="mb-4"
            />

            {quantity > 1 && service.price && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">
                    Total ({quantity} {quantity === 1 ? "unidad" : "unidades"}):
                  </span>
                  <span className="font-semibold text-primary">
                    {formatPrice({
                      price: service.price * quantity,
                      currency: service.currency ?? "BOB"
                    }).toString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Divider />

          <WhatsappLink
            service={service}
            quantity={quantity}
            deliveryOption={deliveryOption}
            getDeliveryText={getDeliveryText}
            getButtonText={getButtonText}
          />
        </div>
      </div>
    </div>
  );
};

const WhatsappLink = ({
  service,
  quantity,
  deliveryOption,
  getDeliveryText,
  getButtonText
}: {
  service: Service;
  quantity: number;
  deliveryOption: DeliveryOption;
  getDeliveryText: () => string;
  getButtonText: () => string;
}) => {
  const totalPrice = service.price ? service.price * quantity : 0;

  const message = `Hola, quiero comprar ${quantity} ${
    quantity === 1 ? "unidad" : "unidades"
  } del producto ${service.name}${
    service.price ? ` a ${service.price} ${service.currency} cada uno` : ""
  }${
    totalPrice > 0 ? ` (Total: ${totalPrice} ${service.currency})` : ""
  }. Prefiero ${getDeliveryText()}.`;

  return (
    <Link
      href={`https://wa.me/${
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
      }?text=${encodeURIComponent(message)}`}
      className="flex justify-center items-center gap-2 border border-primary rounded-full px-4 py-2 hover:bg-primary text-primary hover:text-foreground hover:border-foreground"
    >
      <IconBrandWhatsapp className="w-6 h-6 " />
      <span className="text-lg hover:text-foreground">{getButtonText()}</span>
    </Link>
  );
};

const Divider = () => {
  return (
    <div className="relative my-6">
      <div className="bg-border w-full h-px" />
    </div>
  );
};
