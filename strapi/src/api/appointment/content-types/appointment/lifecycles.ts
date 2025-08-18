/**
 * Lifecycle hooks for appointment content type
 * Automatically syncs with Google Calendar when status changes
 */

export default {
  /**
   * After create - check if appointment is confirmed and sync
   */
  async afterCreate(event) {
    const { result } = event;

    // Only sync if appointment is confirmed
    if (result.aStatus === "confirmed") {
      try {
        const googleCalendarService = strapi.service(
          "api::appointment.google-calendar-sync",
        );
        await googleCalendarService.createCalendarEvents(result);
        console.log(
          `Appointment ${result.id} synced with Google Calendar after creation`,
        );
      } catch (error) {
        console.error(
          "Error syncing with Google Calendar after creation:",
          error,
        );
      }
    }
  },

  /**
   * After update - check if status changed to confirmed and sync
   */
  async afterUpdate(event) {
    const { result, params } = event;

    // Check if this is a status update
    if (params.data && params.data.aStatus === "confirmed") {
      try {
        const googleCalendarService = strapi.service(
          "api::appointment.google-calendar-sync",
        );
        await googleCalendarService.createCalendarEvents(result);
        console.log(
          `Appointment ${result.id} synced with Google Calendar after status update`,
        );
      } catch (error) {
        console.error(
          "Error syncing with Google Calendar after status update:",
          error,
        );
      }
    }
  },

  /**
   * After delete - could be used to remove events from Google Calendar if needed
   */
  async afterDelete(event) {
    const { result } = event;

    // If you want to remove events from Google Calendar when appointments are deleted
    // You could implement that logic here
    console.log(`Appointment ${result.id} was deleted`);
  },
};
