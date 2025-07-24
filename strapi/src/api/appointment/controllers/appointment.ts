/**
 * appointment controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::appointment.appointment",
  ({ strapi }) => ({
    async bookAppointment(ctx) {
      try {
        const { date, time, email, name } = ctx.request.body;

        // Call the service method
        const appointment = await strapi
          .service("api::appointment.appointment")
          .bookAppointment({
            date,
            time,
            email,
            name,
          });

        // Return success response
        ctx.body = {
          success: true,
          appointment,
        };
      } catch (error) {
        console.error("Error in bookAppointment controller:", error);

        // Handle validation errors
        if (error.message === "Date, time, email, and name are required") {
          ctx.status = 400;
          ctx.body = {
            error: error.message,
          };
          return;
        }

        if (error.message === "This time slot is no longer available") {
          ctx.status = 409;
          ctx.body = {
            error: error.message,
          };
          return;
        }

        if (error.message === "You already have a pending appointment") {
          ctx.status = 409;
          ctx.body = {
            error: error.message,
          };
          return;
        }

        // Handle other errors
        ctx.status = 500;
        ctx.body = {
          error: "Internal server error",
          details: error.message,
        };
      }
    },
  }),
);
