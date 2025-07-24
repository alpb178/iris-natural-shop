import { APPOINTMENTS_BOOK_API_URL } from "@/lib/constants/endpoints";
import { fetcher } from "@/lib/strapi/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { date, time, email, name } = await req.json();

    if (!date || !time || !email || !name) {
      return NextResponse.json(
        { error: "Date, time, email, and name are required" },
        { status: 400 }
      );
    }

    // Call the Strapi bookAppointment endpoint
    const response = await fetcher(APPOINTMENTS_BOOK_API_URL, {
      method: "POST",
      data: { date, time, email, name },
    });

    return NextResponse.json({
      success: true,
      appointment: response.appointment,
    });
  } catch (error: any) {
    console.error("Error booking appointment:", error);

    // Handle specific error responses from Strapi
    if (error.response?.data?.error) {
      const status = error.response?.status || 500;
      return NextResponse.json(
        { error: error.response.data.error },
        { status }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
