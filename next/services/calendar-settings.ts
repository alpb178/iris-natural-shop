const CALENDAR_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/calendar`;

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // Date string (e.g., "2024-01-01")
  start: string; // Time string (e.g., "09:00:00")
  end: string; // Time string (e.g., "17:00:00")
  repeats: "daily" | "weekly" | "biweekly" | "monthly";
  recurringDays?: number[];
  endsAt?: string; // End date for recurring events (e.g., "2024-12-31")
}

export interface CalendarSettings {
  startHour: number;
  endHour: number;
  appointmentDuration: number;
  minBookingDays: number;
  maxBookingDays: number;
  events: CalendarEvent[];
}

// Cache for calendar settings
let calendarSettingsCache: CalendarSettings | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get calendar settings from Strapi with caching
 */
export const getCalendarSettings = async (): Promise<CalendarSettings> => {
  const now = Date.now();

  // Return cached data if still valid
  if (calendarSettingsCache && now - cacheTimestamp < CACHE_DURATION) {
    return calendarSettingsCache;
  }

  try {
    const response = await fetch(`${CALENDAR_API_URL}?populate=*`);

    if (!response.ok) {
      throw new Error(`Failed to fetch calendar settings: ${response.status}`);
    }

    const { data } = await response.json();

    // Cache the result
    calendarSettingsCache = data;
    cacheTimestamp = now;

    return data;
  } catch (error) {
    console.error("Error fetching calendar settings:", error);
    // Return cached data if available, otherwise return default
    return calendarSettingsCache || getDefaultCalendarSettings();
  }
};

/**
 * Get default calendar settings
 */
export const getDefaultCalendarSettings = (): CalendarSettings => {
  return {
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
        recurringDays: [0, 6], // Sunday and Saturday
        endsAt: "2024-12-31"
      }
    ]
  };
};

/**
 * Check if a date is blocked by any event
 */
const isDateBlockedByEvent = (date: Date, event: CalendarEvent): boolean => {
  const dayOfWeek = date.getDay();
  const dateString = date.toISOString().split("T")[0];

  // For recurring events, check if current date is within the recurring range
  if (!!event.repeats) {
    const eventStartDate = event.date;
    const eventEndDate = event.endsAt || event.date;

    // Check if current date falls within event date range
    if (dateString >= eventStartDate && dateString <= eventEndDate) {
      // Handle recurring events based on their pattern
      switch (event.repeats) {
        case "daily":
          return true;

        case "weekly":
          if (event.recurringDays && event.recurringDays.length > 0) {
            // Weekly with specific days (e.g., weekends)
            return event.recurringDays.includes(dayOfWeek);
          } else {
            // Weekly without specific days - block every 7 days from start
            const weeklyDaysDiff = Math.floor(
              (new Date(dateString).getTime() -
                new Date(eventStartDate).getTime()) /
                (1000 * 60 * 60 * 24)
            );
            return weeklyDaysDiff % 7 === 0;
          }

        case "biweekly":
          // Biweekly - block every 14 days from start
          const biweeklyDaysDiff = Math.floor(
            (new Date(dateString).getTime() -
              new Date(eventStartDate).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          return biweeklyDaysDiff % 14 === 0;

        case "monthly":
          // Monthly - block same day of month
          const eventStartDay = new Date(eventStartDate).getDate();
          const currentDay = new Date(dateString).getDate();
          return eventStartDay === currentDay;

        default:
          return true;
      }
    }
  } else {
    // Handle one-time events - check if current date matches event date
    return dateString === event.date;
  }

  return false;
};

/**
 * Check if a date is available for booking
 */
export const isDateAvailable = (
  date: Date,
  settings: CalendarSettings
): boolean => {
  if (!settings || !settings.events) return true;

  // Check if the date is within advance booking range
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date();
  minDate.setDate(today.getDate() + settings.minBookingDays);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + settings.maxBookingDays);
  maxDate.setHours(23, 59, 59, 999);

  if (date < minDate || date > maxDate) {
    return false;
  }

  // Check if the date is blocked by any event
  return !settings.events.some((event) => isDateBlockedByEvent(date, event));
};

/**
 * Generate available time slots for a specific date
 */
export const generateAvailableSlots = (
  date: Date,
  settings: CalendarSettings
): string[] => {
  const slots: string[] = [];

  // Check if the date is available
  if (!isDateAvailable(date, settings)) {
    return slots;
  }

  // Get working hours and duration
  const { startHour, endHour, appointmentDuration: duration } = settings;

  // Validate duration
  if (!duration || duration <= 0 || duration > 60) {
    console.warn(
      "Invalid appointment duration:",
      duration,
      "using default 60 minutes"
    );
    return slots;
  }

  // Pre-calculate blocked hours from events
  const blockedHours = new Set<number>();
  const dateString = date.toISOString().split("T")[0];

  // Check events for this date
  settings.events?.forEach((event) => {
    if (isDateBlockedByEvent(date, event)) {
      const eventStartHour = parseInt(event.start.split(":")[0]);
      const eventEndHour = parseInt(event.end.split(":")[0]);

      // Block all hours within the event time range
      for (let hour = eventStartHour; hour < eventEndHour; hour++) {
        blockedHours.add(hour);
      }
    }
  });

  // Generate available time slots
  for (let hour = startHour; hour < endHour; hour++) {
    // Skip if this hour is completely blocked
    if (blockedHours.has(hour)) {
      continue;
    }

    // Generate time slots for this hour
    for (let minute = 0; minute < 60; minute += duration) {
      if (hour === endHour - 1 && minute + duration > 60) {
        break; // Don't create slots that extend beyond end hour
      }

      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`;

      slots.push(timeString);
    }
  }

  return slots;
};

/**
 * Get the reason why a date is blocked (for display)
 */
export const getDateBlockReason = (
  date: Date,
  settings: CalendarSettings
): string | null => {
  if (!settings?.events) return null;

  // Find the first event that blocks this date
  for (const event of settings.events) {
    if (isDateBlockedByEvent(date, event)) {
      return event.title;
    }
  }

  return null;
};
