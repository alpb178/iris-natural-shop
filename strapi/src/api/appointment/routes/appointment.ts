/**
 * appointment router
 */

export default {
  routes: [
    // Custom route for booking appointments
    {
      method: "POST",
      path: "/appointments/book",
      handler: "appointment.bookAppointment",
      config: {
        auth: false, // Allow public access for booking
        policies: [],
        middlewares: [],
      },
    },
    // Default CRUD routes
    {
      method: "GET",
      path: "/appointments",
      handler: "appointment.find",
    },
    {
      method: "GET",
      path: "/appointments/:id",
      handler: "appointment.findOne",
    },
    {
      method: "POST",
      path: "/appointments",
      handler: "appointment.create",
    },
    {
      method: "PUT",
      path: "/appointments/:id",
      handler: "appointment.update",
    },
    {
      method: "DELETE",
      path: "/appointments/:id",
      handler: "appointment.delete",
    },
  ],
};
