import type { Core } from "@strapi/strapi";
import CronService from "./services/cron";
import ScheduledTaskService from "./services/scheduled-task";

let cronService: CronService;
let scheduledTaskService: ScheduledTaskService;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Initialize services
    cronService = new CronService(strapi);
    scheduledTaskService = new ScheduledTaskService(strapi);

    // Store services globally for access
    (global as any).cronService = cronService;
    (global as any).scheduledTaskService = scheduledTaskService;
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Add the scheduled task that runs every 3 minutes
      cronService.addJob(
        "scheduled-task-3min",
        "3m", // Every 3 minutes
        () => scheduledTaskService.executeTask(),
      );

      // Start all cron jobs
      cronService.startAll();

      strapi.log.info("Cron jobs initialized and started");
    } catch (error) {
      strapi.log.error("Failed to initialize cron jobs:", error);
    }
  },
};
