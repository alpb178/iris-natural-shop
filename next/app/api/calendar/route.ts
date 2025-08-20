import { getCalendarSettings } from "@/services/calendar-settings";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await getCalendarSettings();

  return NextResponse.json({ data: settings });
}
