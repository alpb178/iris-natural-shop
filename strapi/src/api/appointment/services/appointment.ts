/**
 * appointment service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::appointment.appointment",
  ({ strapi }) => ({
    async bookAppointment(data) {
      const { date, time, email, name } = data;
      // Validate required fields
      if (!date || !time || !email || !name) {
        throw new Error("Date, time, email, and name are required");
      }

      // First, check if the slot is still available (not booked by anyone with confirmed status)
      const confirmedAppointmentsForSlot = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          filters: {
            date: date,
            time: time,
            aStatus: "confirmed",
          },
        },
      );

      if (
        confirmedAppointmentsForSlot &&
        confirmedAppointmentsForSlot.length > 0
      ) {
        throw new Error("This time slot is no longer available");
      }

      // Then, check if the user already has a pending appointment
      const userPendingAppointments = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          filters: {
            email: email,
            aStatus: "pending",
          },
        },
      );

      if (userPendingAppointments && userPendingAppointments.length > 0) {
        throw new Error("You already have a pending appointment");
      }

      // Create the appointment
      const appointmentData = {
        date,
        time,
        email,
        name,
        aStatus: "pending" as const,
      };

      const appointment = await strapi.entityService.create(
        "api::appointment.appointment",
        {
          data: appointmentData,
        },
      );

      return appointment;
    },
  }),
);
