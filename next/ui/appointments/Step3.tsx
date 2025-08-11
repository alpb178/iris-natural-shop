"use client";

import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import dayjs from "dayjs";
import { StepProps } from "./StepProps";

// Step 3: Summary and Confirmation
export const Step3 = ({
  onBack,
  selectedDate,
  selectedTime,
  name,
  email,
  methods,
  isSubmitting,
  submitResult,
  onSubmit,
  onClose
}: StepProps) => {
  return (
    <div className="slide-in-from-right-4 space-y-6 animate-in duration-300">
      <Text
        as="title"
        content="Resumen de la cita"
        className="text-lg text-center"
      />

      <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between">
          <span className="font-medium">Fecha:</span>
          <span>
            {selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Hora:</span>
          <span>
            {selectedTime
              ? dayjs(`2000-01-01T${selectedTime}`).format("HH:mm")
              : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nombre:</span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{email}</span>
        </div>
        {methods.getValues("phone") && (
          <div className="flex justify-between">
            <span className="font-medium">Teléfono:</span>
            <span>{methods.getValues("phone")}</span>
          </div>
        )}
      </div>

      {submitResult ? (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg text-center ${
              submitResult.success
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitResult.message}
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              label={submitResult.success ? "Cerrar" : "Intentar de nuevo"}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} label="Anterior" />
          <Button
            disabled={isSubmitting}
            onClick={onSubmit}
            label={isSubmitting ? "Enviando..." : "Enviar petición"}
          />
        </div>
      )}
    </div>
  );
};
