"use client";

import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import type { CalendarSettings } from "@/services/calendar-settings";
import {
  generateAvailableSlots,
  getCalendarSettings,
  getDateBlockReason,
  isDateAvailable
} from "@/services/calendar-settings";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { StepProps } from "./StepProps";

export const Step1 = ({
  onNext,
  methods,
  selectedDate,
  selectedTime,
  availableSlots
}: StepProps) => {
  const [calendarSettings, setCalendarSettings] =
    useState<CalendarSettings | null>(null);
  const [localAvailableSlots, setLocalAvailableSlots] = useState<string[]>([]);
  const [maxDate, setMaxDate] = useState<Date>(new Date());

  // Fetch calendar settings on mount
  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        console.log("Loading calendar data...");
        const settings = await getCalendarSettings();
        console.log("Received calendar settings:", settings);
        console.log("Events found:", settings.events?.length || 0);
        if (settings.events) {
          settings.events.forEach((event, index) => {
            console.log(`Event ${index + 1}:`, {
              title: event.title,
              date: event.date,
              endsAt: event.endsAt,
              repeats: event.repeats,
              recurringDays: event.recurringDays
            });
          });
        }
        setCalendarSettings(settings);

        // Set max date based on calendar settings
        if (settings.maxBookingDays) {
          const max = new Date();
          max.setDate(max.getDate() + settings.maxBookingDays);
          setMaxDate(max);
          console.log("Set max date to:", max);
        }
      } catch (error) {
        console.error("Error loading calendar data:", error);
      }
    };

    loadCalendarData();
  }, []);

  // Update available slots when date or settings change
  useEffect(() => {
    if (selectedDate && calendarSettings) {
      console.log("Generating time slots for date:", selectedDate);

      // Generate available slots for the selected date
      const available = generateAvailableSlots(selectedDate, calendarSettings);
      console.log("Generated available slots:", available);
      setLocalAvailableSlots(available);
    } else {
      setLocalAvailableSlots([]);
    }
  }, [selectedDate, calendarSettings]);

  // Use the service function directly - no duplication
  const isDateDisabled = (date: Date): boolean => {
    if (!calendarSettings) return false;
    return !isDateAvailable(date, calendarSettings);
  };

  // Get the reason why a date is blocked (for display)
  const getDateBlockReasonLocal = (date: Date): string | null => {
    if (!calendarSettings) return null;
    return getDateBlockReason(date, calendarSettings);
  };

  return (
    <div className="slide-in-from-right-4 flex flex-col space-y-6 animate-in duration-300">
      <Text
        content="Selecciona fecha y hora"
        className="font-merriweather font-bold text-3xl"
      />

      <div className="w-full">
        <Calendar
          key={calendarSettings ? "calendar-with-events" : "calendar-loading"}
          onChange={(date) => {
            methods.setValue("date", date as Date);
            methods.setValue("time", null);
          }}
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
                  <div className="mt-1 font-medium text-red-600 text-xs">
                    {blockReason}
                  </div>
                );
              }
            }
            return null;
          }}
        />
      </div>

      <div className="mt-4 w-full">
        {localAvailableSlots.length > 0 && (
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
                  onClick={() => methods.setValue("time", slot)}
                  label={dayjs(`2000-01-01T${slot}`).format("HH:mm")}
                />
              ))}
            </div>
          </>
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
