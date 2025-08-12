import { APPOINTMENTS_API_URL } from "@/lib/constants/endpoints";
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

    // First, check if the slot is still available (not booked by anyone with confirmed status)
    const confirmedAppointmentsForSlot = await fetcher(
      `${APPOINTMENTS_API_URL}?populate=*&filters[date][$eq]=${date}&filters[time][$eq]=${time}&filters[aStatus][$eq]=confirmed`
    );

    if (
      confirmedAppointmentsForSlot.data &&
      confirmedAppointmentsForSlot.data.length > 0
    ) {
      return NextResponse.json(
        { error: "This time slot is no longer available" },
        { status: 409 }
      );
    }

    // Then, check if the user already has a pending appointment
    const userPendingAppointments = await fetcher(
      `${APPOINTMENTS_API_URL}?populate=*&filters[email][$eq]=${encodeURIComponent(
        email
      )}&filters[aStatus][$eq]=pending`
    );

    if (
      userPendingAppointments.data &&
      userPendingAppointments.data.length > 0
    ) {
      return NextResponse.json(
        {
          error: "You already have a pending appointment",
          existingAppointment: userPendingAppointments.data[0]
        },
        { status: 409 }
      );
    }

    // Create the appointment
    const appointmentData = {
      date,
      time,
      email,
      name,
      aStatus: "pending"
    };

    const response = await fetcher(APPOINTMENTS_API_URL, {
      method: "POST",
      data: { data: appointmentData }
    });

    return NextResponse.json({
      success: true,
      appointment: response.data
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
