import { CalendarEvent, CalendarSettings } from "@/definitions/Calendar";
import dayjs from "dayjs";

const CALENDAR_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/calendar`;

let calendarSettingsCache: CalendarSettings | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCalendarSettings = async (): Promise<CalendarSettings> => {
  const now = Date.now();

  if (calendarSettingsCache && now - cacheTimestamp < CACHE_DURATION) {
    return calendarSettingsCache;
  }

  try {
    const response = await fetch(`${CALENDAR_API_URL}?populate=*`);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar settings: ${response.status}`);
    }

    const { data } = await response.json();
    calendarSettingsCache = data;
    cacheTimestamp = now;
    return data;
  } catch (error) {
    console.error("Error fetching calendar settings:", error);
    return calendarSettingsCache || getDefaultCalendarSettings();
  }
};

export const getDefaultCalendarSettings = (): CalendarSettings => ({
  startHour: 9,
  endHour: 18,
  appointmentDuration: 60,
  minBookingDays: 1,
  maxBookingDays: 30,
  events: [
    {
      id: 1,
      title: "Weekend",
      date: "2024-01-01",
      start: "00:00:00",
      end: "23:59:59",
      repeats: "weekly",
      recurringDays: [0, 6],
      endsAt: "2024-12-31"
    }
  ]
});

const isDateBlockedByEvent = (date: Date, event: CalendarEvent): boolean => {
  const dayOfWeek = date.getDay();
  const dateString = date.toISOString().split("T")[0];

  if (!event.repeats) {
    return dateString === event.date;
  }

  const eventStartDate = event.date;
  const eventEndDate = event.endsAt || event.date;

  if (dateString < eventStartDate || dateString > eventEndDate) {
    return false;
  }

  switch (event.repeats) {
    case "daily":
      return true;

    case "weekly":
      if (event.recurringDays?.length) {
        return event.recurringDays.includes(dayOfWeek);
      }
      const weeklyDaysDiff = Math.floor(
        (new Date(dateString).getTime() - new Date(eventStartDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return weeklyDaysDiff % 7 === 0;

    case "biweekly":
      const biweeklyDaysDiff = Math.floor(
        (new Date(dateString).getTime() - new Date(eventStartDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return biweeklyDaysDiff % 14 === 0;

    case "monthly":
      return (
        new Date(eventStartDate).getDate() === new Date(dateString).getDate()
      );

    default:
      return true;
  }
};

export const isDateAvailable = (
  date: Date,
  settings: CalendarSettings
): boolean => {
  if (!settings?.events) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(
    today.getTime() + settings.minBookingDays * 24 * 60 * 60 * 1000
  );
  const maxDate = new Date(
    today.getTime() + settings.maxBookingDays * 24 * 60 * 60 * 1000
  );

  if (date < minDate || date > maxDate) {
    return false;
  }

  return !settings.events.some((event) => isDateBlockedByEvent(date, event));
};

export const generateAvailableSlots = async (
  date: Date,
  settings: CalendarSettings
): Promise<string[]> => {
  try {
    if (!isDateAvailable(date, settings)) {
      return [];
    }

    const { startHour, endHour, appointmentDuration: duration } = settings;

    if (!duration || duration <= 0 || duration > 60) {
      console.warn(
        "Invalid appointment duration:",
        duration,
        "using default 60 minutes"
      );
      return [];
    }

    const slots: string[] = [];
    const blockedHours = new Set<number>();

    const dateString = dayjs(date).format("YYYY-MM-DD");
    // Fetch available slots from the new API endpoint
    const { data: appointments } = await fetch(
      `/api/available-slots?date=${dateString}`
    ).then((res) => res.json());

    appointments.forEach((iso: { time: string }) => {
      blockedHours.add(parseInt(iso.time.split(":")[0]));
    });

    settings.events?.forEach((event) => {
      if (isDateBlockedByEvent(date, event)) {
        const eventStartHour = parseInt(event.start.split(":")[0]);
        const eventEndHour = parseInt(event.end.split(":")[0]);

        for (let hour = eventStartHour; hour < eventEndHour; hour++) {
          blockedHours.add(hour);
        }
      }
    });

    for (let hour = startHour; hour < endHour; hour++) {
      if (blockedHours.has(hour)) continue;

      for (let minute = 0; minute < 60; minute += duration) {
        if (hour === endHour - 1 && minute + duration > 60) break;

        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;

        slots.push(timeString);
      }
    }

    return slots;
  } catch (error) {
    console.error("Error generating available slots:", error);
    return [];
  }
};

export const getDateBlockReason = (
  date: Date,
  settings: CalendarSettings
): string | null => {
  if (!settings?.events) return null;

  for (const event of settings.events) {
    if (isDateBlockedByEvent(date, event)) {
      return event.title;
    }
  }

  return null;
};
