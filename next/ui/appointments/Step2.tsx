"use client";

import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/form/text-input/TextInput";
import { Text } from "@/components/text/Text";
import { StepProps } from "./StepProps";

export const Step2 = ({ onNext, onBack, methods, name, email }: StepProps) => {
  return (
    <div className="slide-in-from-right-4 space-y-6 w-full animate-in duration-300">
      <Text
        content="Información de contacto"
        className="font-merriweather font-bold text-3xl"
      />

      <div className="space-y-4">
        <TextInput
          name="name"
          label="Nombre Completo"
          required
          validation={{
            required: {
              value: true,
              message: "Nombre completo es requerido"
            }
          }}
        />
        <TextInput
          name="email"
          label="Correo electrónico"
          required
          validation={{
            required: {
              value: true,
              message: "Correo electrónico es requerido"
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico inválido"
            }
          }}
        />
        <TextInput
          name="phone"
          label="Teléfono (opcional)"
          validation={{
            pattern: {
              value: /^[\+]?[1-9][\d]{0,15}$/,
              message: "Número de teléfono inválido"
            }
          }}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} label="Anterior" />
        <Button disabled={!name || !email} onClick={onNext} label="Siguiente" />
      </div>
    </div>
  );
};
