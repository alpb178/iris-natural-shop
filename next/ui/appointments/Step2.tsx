"use client";

import { Button } from "@/components/button/Button";
import { TextInput } from "@/components/form/text-input/TextInput";
import { Text } from "@/components/text/Text";
import { StepProps } from "./StepProps";

export const Step2 = ({ onNext, onBack, methods, name, email }: StepProps) => {
  return (
    <div className="slide-in-from-right-4 space-y-6 animate-in duration-300">
      <Text
        as="title"
        content="Información de contacto"
        className="text-lg text-center"
      />

      <div className="space-y-4">
        <TextInput name="name" label="Nombre Completo" required />
        <TextInput name="email" label="Correo electrónico" required />
        <TextInput name="phone" label="Teléfono (opcional)" />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} label="Anterior" />
        <Button disabled={!name || !email} onClick={onNext} label="Siguiente" />
      </div>
    </div>
  );
};
