"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { fetcher } from "@/lib/strapi/fetcher";
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
    const { date, time } = values;
    const data = { date, time };

    const response = await fetcher(`/api/appointments`, {
      method: "POST",
      data: { data },
    });

    console.log(response);
    // close modal
    onClick();
  };

  return (
    <Modal>
      <ModalTrigger onClick={onClick}>Book appointment</ModalTrigger>

      <ModalBody className="w-full max-w-4xl">
        <ModalContent>
          <h4 className="mb-8 font-bold text-neutral-600 text-lg md:text-2xl text-center">
            Book appointment
          </h4>

          <FormProvider {...methods}>
            <div className="flex items-center gap-6">
              <div className="w-1/2">
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

              <div className="w-1/2">
                {availableSlots.length > 0 && (
                  <div className="gap-2 grid grid-cols-2 mt-4">
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

            <button
              className="bg-black disabled:opacity-50 mt-4 px-4 py-2 rounded-md text-white text-sm disabled:cursor-not-allowed"
              disabled={!selectedTime}
              onClick={methods.handleSubmit(handleSubmit)}
            >
              Confirm Appointment
            </button>
          </FormProvider>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
