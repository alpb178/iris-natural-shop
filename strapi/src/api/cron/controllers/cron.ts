/**
 * Cron controller
 */

import { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get all cron jobs status
   */
  async getStatus(ctx) {
    try {
      const cronService = (global as any).cronService;
      if (!cronService) {
        return ctx.badRequest("Cron service not available");
      }

      const status = cronService.getAllJobsStatus();
      ctx.body = {
        success: true,
        data: status,
      };
    } catch (error) {
      ctx.throw(500, "Failed to get cron status", { error });
    }
  },

  /**
   * Start a specific cron job
   */
  async startJob(ctx) {
    try {
      const { name } = ctx.params;

      if (!name) {
        return ctx.badRequest("Job name is required");
      }

      const cronService = (global as any).cronService;
      if (!cronService) {
        return ctx.badRequest("Cron service not available");
      }

      cronService.startJob(name);

      ctx.body = {
        success: true,
        message: `Cron job '${name}' started`,
      };
    } catch (error) {
      ctx.throw(500, "Failed to start cron job", { error });
    }
  },

  /**
   * Stop a specific cron job
   */
  async stopJob(ctx) {
    try {
      const { name } = ctx.params;

      if (!name) {
        return ctx.badRequest("Job name is required");
      }

      const cronService = (global as any).cronService;
      if (!cronService) {
        return ctx.badRequest("Cron service not available");
      }

      cronService.stopJob(name);

      ctx.body = {
        success: true,
        message: `Cron job '${name}' stopped`,
      };
    } catch (error) {
      ctx.throw(500, "Failed to stop cron job", { error });
    }
  },

  /**
   * Execute a custom task
   */
  async executeCustomTask(ctx) {
    try {
      const { taskName, data } = ctx.request.body;

      if (!taskName) {
        return ctx.badRequest("Task name is required");
      }

      const scheduledTaskService = (global as any).scheduledTaskService;
      if (!scheduledTaskService) {
        return ctx.badRequest("Scheduled task service not available");
      }

      await scheduledTaskService.executeCustomTask(taskName, data);

      ctx.body = {
        success: true,
        message: `Custom task '${taskName}' executed`,
      };
    } catch (error) {
      ctx.throw(500, "Failed to execute custom task", { error });
    }
  },

  /**
   * Get cron job logs (simplified)
   */
  async getLogs(ctx) {
    try {
      // En una implementación real, podrías almacenar logs en la base de datos
      const logs = [
        {
          timestamp: new Date().toISOString(),
          level: "info",
          message: "Cron system initialized",
        },
        {
          timestamp: new Date().toISOString(),
          level: "info",
          message: "Scheduled task running every 3 minutes",
        },
      ];

      ctx.body = {
        success: true,
        data: logs,
      };
    } catch (error) {
      ctx.throw(500, "Failed to get logs", { error });
    }
  },
});
