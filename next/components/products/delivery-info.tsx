"use client";

import { DeliveryOption } from "./delivery-options";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";

interface DeliveryInfoProps {
  option: DeliveryOption;
  className?: string;
}

export const DeliveryInfo = ({ option, className }: DeliveryInfoProps) => {
  const deliveryInfo = {
    delivery: {
      title: "Envío a domicilio",
      description: "Te llevamos el producto hasta tu casa",
      details: ["Entrega en 24-72 horas", "Costo de envío a cotizar"],
      icon: "🚚",
      locationLink: undefined
    },
    pickup: {
      title: "Recoger en tienda",
      description: "Ven a recoger tu pedido cuando esté listo",
      details: [
        "Listo de 24 a 48 horas",
        "Sin costo adicional",
        "Horario de atención: 10:00 - 18:00",
        "Avenida Santa Cruz 440 entre merchor pinto y Ballivian"
      ],
      icon: "🏪",
      locationLink: process.env.NEXT_PUBLIC_LOCATION_URL
    }
  };

  const info = deliveryInfo[option];

  return (
    <div
      className={cn(
        "bg-muted/50 rounded-lg p-4 border border-border",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{info.icon}</span>
        <h4 className="font-medium text-foreground">{info.title}</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
      <ul className="space-y-1">
        {info.details.map((detail, index) => (
          <li
            key={index}
            className="text-xs text-muted-foreground flex items-center gap-2"
          >
            <span className="w-1 h-1 bg-primary rounded-full"></span>
            {detail}
          </li>
        ))}
      </ul>

      {option === "pickup" && info.locationLink && (
        <div className="mt-3 pt-3 border-t border-border">
          <Link
            href={info.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <IconMapPin className="w-3 h-3" />
            Ver ubicación en el mapa
          </Link>
        </div>
      )}
    </div>
  );
};
