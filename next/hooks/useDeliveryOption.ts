import { useState } from "react";
import { DeliveryOption } from "@/components/products/delivery-options";

export const useDeliveryOption = (
  initialOption: DeliveryOption = "delivery"
) => {
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>(initialOption);

  const handleDeliveryChange = (option: DeliveryOption) => {
    setDeliveryOption(option);
  };

  const getDeliveryText = () => {
    return deliveryOption === "delivery"
      ? "envío a domicilio"
      : "recoger en tienda";
  };

  const getButtonText = () => {
    return deliveryOption === "delivery"
      ? "Comprar con envío"
      : "Comprar para recoger";
  };

  return {
    deliveryOption,
    setDeliveryOption,
    handleDeliveryChange,
    getDeliveryText,
    getButtonText
  };
};
