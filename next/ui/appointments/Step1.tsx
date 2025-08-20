"use client";

import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import type { CalendarSettings } from "@/definitions/Calendar";
import {
  generateAvailableSlots,
  getDateBlockReason,
  isDateAvailable
} from "@/services/calendar-settings";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { StepProps } from "./StepProps";

export const Step1 = ({
  onNext,
  methods,
  selectedDate,
  selectedTime
}: StepProps) => {
  const [calendarSettings, setCalendarSettings] =
    useState<CalendarSettings | null>(null);
  const [localAvailableSlots, setLocalAvailableSlots] = useState<string[]>([]);
  const [maxDate, setMaxDate] = useState<Date>(new Date());
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        const response = await fetch(`/api/calendar`);
        const { data: settings } = await response.json();

        setCalendarSettings(settings);

        if (settings.maxBookingDays) {
          const max = new Date();
          max.setDate(max.getDate() + settings.maxBookingDays);
          setMaxDate(max);
        }
      } catch (error) {
        console.error("Error loading calendar data:", error);
      }
    };

    loadCalendarData();
  }, []);

  useEffect(() => {
    const updateAvailableSlots = async () => {
      if (selectedDate && calendarSettings) {
        setIsLoadingSlots(true);
        try {
          console.log("Generating time slots for date:", selectedDate);
          const available = await generateAvailableSlots(
            selectedDate,
            calendarSettings
          );

          setLocalAvailableSlots(available);
        } catch (error) {
          console.error("Error generating available slots:", error);
          setLocalAvailableSlots([]);
        } finally {
          setIsLoadingSlots(false);
        }
      } else {
        setLocalAvailableSlots([]);
      }
    };

    updateAvailableSlots();
  }, [selectedDate, calendarSettings]);

  // Memoized functions for better performance
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (!calendarSettings) return false;
      return !isDateAvailable(date, calendarSettings);
    },
    [calendarSettings]
  );

  const getDateBlockReasonLocal = useCallback(
    (date: Date): string | null => {
      if (!calendarSettings) return null;
      return getDateBlockReason(date, calendarSettings);
    },
    [calendarSettings]
  );

  const handleCalendarChange = useCallback(
    (date: Date) => {
      methods.setValue("date", date);
      methods.setValue("time", null);
    },
    [methods]
  );

  const handleTimeSlotClick = useCallback(
    (slot: string) => {
      methods.setValue("time", slot);
    },
    [methods]
  );

  return (
    <div className="slide-in-from-right-4 flex flex-col space-y-6 animate-in duration-300">
      <Text
        content="Selecciona fecha y hora"
        className="font-merriweather font-bold text-3xl"
      />

      <div className="w-full">
        <Calendar
          key={calendarSettings ? "calendar-with-events" : "calendar-loading"}
          onChange={handleCalendarChange}
          value={selectedDate}
          minDate={new Date()}
          maxDate={maxDate}
          minDetail="year"
          maxDetail="month"
          tileDisabled={({ date }) => isDateDisabled(date)}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const blockReason = getDateBlockReasonLocal(date);
              if (blockReason) {
                return (
                  <div className="group relative flex justify-center items-center">
                    <div className="bg-primary rounded-full w-2 h-2 cursor-help" />
                    <div className="bottom-full left-1/2 z-10 absolute bg-gray-900 opacity-0 group-hover:opacity-100 mb-2 px-3 py-2 rounded-lg text-white text-xs whitespace-nowrap transition-opacity -translate-x-1/2 duration-200 pointer-events-none transform">
                      <Text content={blockReason} className="text-white" />
                    </div>
                  </div>
                );
              }
            }
            return null;
          }}
        />
      </div>

      <div className="mt-4 w-full">
        {isLoadingSlots && (
          <div className="py-4 text-center">
            <Text
              content="Cargando horarios disponibles..."
              className="text-gray-500"
            />
          </div>
        )}

        {!isLoadingSlots && localAvailableSlots.length > 0 && (
          <>
            <Text
              content="Horarios disponibles"
              className="mb-3 font-semibold text-lg"
            />
            <div className="gap-4 grid grid-cols-2">
              {localAvailableSlots.map((slot: string) => (
                <Button
                  key={slot}
                  type="button"
                  variant={
                    selectedTime?.toString() === slot ? "solid" : "outline"
                  }
                  onClick={() => handleTimeSlotClick(slot)}
                  label={dayjs(`2000-01-01T${slot}`).format("HH:mm")}
                />
              ))}
            </div>
          </>
        )}

        {!isLoadingSlots &&
          localAvailableSlots.length === 0 &&
          selectedDate && (
            <Text
              content="No hay horarios disponibles para esta fecha"
              className="text-gray-500"
            />
          )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
          label="Siguiente"
        />
      </div>
    </div>
  );
};
