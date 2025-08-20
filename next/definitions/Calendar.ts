export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  start: string;
  end: string;
  repeats: "daily" | "weekly" | "biweekly" | "monthly";
  recurringDays?: number[];
  endsAt?: string;
}

export interface CalendarSettings {
  startHour: number;
  endHour: number;
  appointmentDuration: number;
  minBookingDays: number;
  maxBookingDays: number;
  events: CalendarEvent[];
}
