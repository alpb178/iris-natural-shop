import { getAppointments } from "@/services/appointments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const { data: appointments } = await getAppointments(date);

  return NextResponse.json({ data: appointments });
}
