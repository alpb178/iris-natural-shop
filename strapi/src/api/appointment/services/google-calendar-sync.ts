import { google } from "googleapis";

interface AppointmentData {
  id: number;
  date: string;
  time: string;
  email: string;
  name: string;
  aStatus: string;
}

export default () => ({
  /**
   * Create Google Calendar events when appointment is confirmed
   */
  async createCalendarEvents(appointment: AppointmentData) {
    try {
      // Only proceed if appointment is confirmed
      if (appointment.aStatus !== "confirmed") {
        return;
      }

      // Get environment variables
      const adminRefreshToken = process.env.GOOGLE_ADMIN_REFRESH_TOKEN;
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

      if (!adminRefreshToken || !clientId || !clientSecret) {
        console.log("Google Calendar not configured, skipping sync");
        return;
      }

      // Create OAuth2 client for admin
      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        "urn:ietf:wg:oauth:2.0:oob", // Not needed for refresh token
      );

      oauth2Client.setCredentials({
        refresh_token: adminRefreshToken,
      });

      // Create calendar instance
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });

      // Prepare event data
      const eventData = this.prepareEventData(appointment);

      // 1. Create event in admin's calendar (alpb17.08@gmail.com)
      const adminEvent = await calendar.events.insert({
        calendarId: "primary",
        requestBody: eventData,
        sendUpdates: "all",
      });

      console.log(`Created admin calendar event: ${adminEvent.data.id}`);

      // 2. Try to create event in client's calendar
      // We'll try to create it in a shared calendar or the client's primary calendar
      try {
        // First, try to find the client's calendar by email
        const calendarList = await calendar.calendarList.list();
        const clientCalendar = calendarList.data.items?.find(
          (cal) =>
            cal.id === appointment.email ||
            cal.summary?.includes(appointment.email),
        );

        if (clientCalendar) {
          // Create event in client's calendar
          const clientEvent = await calendar.events.insert({
            calendarId: clientCalendar.id,
            requestBody: eventData,
            sendUpdates: "all",
          });
          console.log(`Created client calendar event: ${clientEvent.data.id}`);
        } else {
          // If we can't find the client's calendar, create a shared calendar event
          // This will send an invitation to the client's email
          console.log(
            `Client calendar not found, sending invitation to: ${appointment.email}`,
          );

          // The event already includes the client as an attendee, so they'll receive an invitation
          // We could also try to create a calendar for the client if needed
        }
      } catch (clientError) {
        console.log(
          `Could not create event in client calendar: ${clientError.message}`,
        );
        // This is not critical, the client will still receive an invitation
      }
    } catch (error) {
      console.error("Error creating Google Calendar events:", error);
      // Don't throw error to avoid breaking the main appointment flow
    }
  },

  /**
   * Prepare event data for Google Calendar
   */
  prepareEventData(appointment: AppointmentData) {
    const date = new Date(appointment.date);
    const [hours, minutes] = appointment.time.split(":");
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1); // Default 1 hour duration

    return {
      summary: `Cita confirmada con ${appointment.name}`,
      description: `Cita confirmada para ${appointment.name} (${appointment.email})`,
      start: {
        dateTime: date.toISOString(),
        timeZone: "America/Mexico_City", // Adjust to your timezone
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "America/Mexico_City",
      },
      attendees: [
        { email: appointment.email },
        { email: "alpb17.08@gmail.com" },
      ],
      reminders: {
        useDefault: true,
      },
      // Add some styling to make it stand out
      colorId: "1", // Blue color
    };
  },

  /**
   * Test Google Calendar connection
   */
  async testConnection() {
    try {
      const adminRefreshToken = process.env.GOOGLE_ADMIN_REFRESH_TOKEN;
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

      if (!adminRefreshToken || !clientId || !clientSecret) {
        return {
          success: false,
          error: "Missing Google Calendar configuration",
          missing: {
            adminRefreshToken: !adminRefreshToken,
            clientId: !clientId,
            clientSecret: !clientSecret,
          },
        };
      }

      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        "urn:ietf:wg:oauth:2.0:oob",
      );

      oauth2Client.setCredentials({
        refresh_token: adminRefreshToken,
      });

      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const calendars = await calendar.calendarList.list();

      return {
        success: true,
        message: "Google Calendar connection successful!",
        calendars: calendars.data.items?.map((cal) => ({
          id: cal.id,
          summary: cal.summary,
          primary: cal.primary,
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: "Google Calendar connection failed",
        details: error.message,
      };
    }
  },
});
