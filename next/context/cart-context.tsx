"use client";

import { Service } from "@/types/types";
import React, { createContext, useCallback, useContext, useState } from "react";

type CartItem = {
  service: Service;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  updateQuantity: (service: Service, quantity: number) => void;
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((service: Service) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.service.id === service.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { service, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((serviceId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.service.id !== serviceId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const updateQuantity = useCallback((service: Service, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.service.id === service.id ? { ...item, quantity } : item
      )
    );
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.service.price * item.quantity,
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
