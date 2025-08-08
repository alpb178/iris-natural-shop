import { getAppointments } from "@/services/appointments";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

const APPOINTMENT_DURATION_MINUTES = 60;
const WORKING_HOURS = { start: 9, end: 18 };

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  // Fetch appointments for the date
  const { data: appointments } = await getAppointments(date);
  console.log("Taken slots:", appointments);
  // Generate all possible slots
  const slots: string[] = [];
  const start = dayjs(date).hour(WORKING_HOURS.start).minute(0).second(0);
  const end = dayjs(date).hour(WORKING_HOURS.end).minute(0).second(0);

  for (
    let slot = start.clone();
    slot.isBefore(end);
    slot = slot.add(APPOINTMENT_DURATION_MINUTES, "minute")
  ) {
    slots.push(slot.toISOString());
  }

  // Filter out booked slots
  const available = slots.filter((slot) => {
    return !appointments.some((appt: any) => {
      // Skip canceled appointments when determining availability
      if (appt.aStatus === "canceled") {
        return false;
      }

      const apptStart = dayjs(`${appt.date}T${appt.time}`);
      const apptEnd = apptStart.add(APPOINTMENT_DURATION_MINUTES, "minute");
      const slotStart = dayjs(slot);
      const slotEnd = slotStart.add(APPOINTMENT_DURATION_MINUTES, "minute");
      return slotStart.isBefore(apptEnd) && slotEnd.isAfter(apptStart);
    });
  });

  return NextResponse.json({ availableSlots: available });
}
