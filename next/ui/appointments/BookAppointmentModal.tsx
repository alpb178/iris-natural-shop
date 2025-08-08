"use client";

import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/form/text-input/TextInput";
import { Text } from "@/components/text/Text";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from "@/components/ui/animated-modal";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";

export function BookAppointmentModal({ onClick }: { onClick: () => void }) {
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  const methods = useForm();

  const selectedDate = methods.watch("date");
  const selectedTime = methods.watch("time");

  useEffect(() => {
    if (selectedDate) {
      const date = dayjs(selectedDate).format("YYYY-MM-DD");
      // Fetch available slots from the new API endpoint
      fetch(`/api/available-slots?date=${date}`)
        .then((res) => res.json())
        .then((data) => {
          // Convert ISO strings to Date objects
          setAvailableSlots(
            data.availableSlots.map((iso: string) => new Date(iso))
          );
        });
    }
  }, [selectedDate]);

  const handleSubmit = async (values: any) => {
    try {
      const appointmentData = {
        date: dayjs(values.date).format("YYYY-MM-DD"),
        time: values.time,
        email: values.email,
        name: values.username
      };

      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          // Handle conflict (appointment already exists or slot unavailable)
          alert(result.error);
        } else {
          alert("Error booking appointment. Please try again.");
        }
        return;
      }

      console.log("Appointment response:", result);
      alert("Appointment booked successfully!");
      // close modal
      onClick();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment. Please try again.");
    }
  };

  return (
    <Modal>
      <ModalTrigger onClick={onClick}>Pide una cita</ModalTrigger>

      <ModalBody>
        <ModalContent>
          <Text
            as="title"
            content="Pide una cita"
            className="mb-6 text-lg text-center"
          />

          <FormProvider {...methods}>
            <div className="flex gap-6 mb-6">
              <div className="w-full">
                <Calendar
                  onChange={(date) => {
                    methods.setValue("date", date as Date);
                    methods.setValue("time", null);
                  }}
                  value={selectedDate}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 30))
                  }
                  minDetail="year"
                  maxDetail="month"
                />
              </div>

              <div className="w-full">
                {availableSlots.length > 0 && (
                  <div className="gap-2 grid grid-cols-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.toString()}
                        type="button"
                        className={`px-3 py-2 rounded-lg border ${
                          selectedTime?.toString() ===
                          dayjs(slot).format("HH:mm:ss.SSS")
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                        onClick={() =>
                          methods.setValue(
                            "time",
                            dayjs(slot).format("HH:mm:ss.SSS")
                          )
                        }
                      >
                        {dayjs(slot).format("HH:mm")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <TextInput name="username" label="Nombre Completo" required />

            <TextInput name="email" label="Correo electrónico" required />

            <Button
              variant="muted"
              disabled={!selectedTime}
              onClick={methods.handleSubmit(handleSubmit)}
            >
              Reservar cita
            </Button>
          </FormProvider>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
