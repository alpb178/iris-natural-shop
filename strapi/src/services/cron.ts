/**
 * Cron service for scheduled tasks
 */

import { Core } from "@strapi/strapi";

interface CronJob {
  name: string;
  schedule: string;
  task: () => Promise<void>;
  isRunning: boolean;
  intervalId?: NodeJS.Timeout;
}

class CronService {
  private jobs: Map<string, CronJob> = new Map();
  private strapi: Core.Strapi;

  constructor(strapi: Core.Strapi) {
    this.strapi = strapi;
  }

  /**
   * Add a new cron job
   */
  addJob(name: string, schedule: string, task: () => Promise<void>): void {
    if (this.jobs.has(name)) {
      this.strapi.log.warn(`Cron job '${name}' already exists. Skipping.`);
      return;
    }

    const job: CronJob = {
      name,
      schedule,
      task,
      isRunning: false,
    };

    this.jobs.set(name, job);
    this.strapi.log.info(`Cron job '${name}' added with schedule: ${schedule}`);
  }

  /**
   * Start a specific cron job
   */
  startJob(name: string): void {
    const job = this.jobs.get(name);
    if (!job) {
      this.strapi.log.error(`Cron job '${name}' not found.`);
      return;
    }

    if (job.isRunning) {
      this.strapi.log.warn(`Cron job '${name}' is already running.`);
      return;
    }

    const intervalMs = this.parseSchedule(job.schedule);
    if (intervalMs === 0) {
      this.strapi.log.error(
        `Invalid schedule for job '${name}': ${job.schedule}`,
      );
      return;
    }

    job.intervalId = setInterval(async () => {
      try {
        this.strapi.log.info(`Executing cron job: ${name}`);
        await job.task();
        this.strapi.log.info(`Cron job '${name}' completed successfully`);
      } catch (error) {
        this.strapi.log.error(`Error in cron job '${name}':`, error);
      }
    }, intervalMs);

    job.isRunning = true;
    this.strapi.log.info(`Cron job '${name}' started`);
  }

  /**
   * Stop a specific cron job
   */
  stopJob(name: string): void {
    const job = this.jobs.get(name);
    if (!job) {
      this.strapi.log.error(`Cron job '${name}' not found.`);
      return;
    }

    if (!job.isRunning || !job.intervalId) {
      this.strapi.log.warn(`Cron job '${name}' is not running.`);
      return;
    }

    clearInterval(job.intervalId);
    job.isRunning = false;
    job.intervalId = undefined;
    this.strapi.log.info(`Cron job '${name}' stopped`);
  }

  /**
   * Start all cron jobs
   */
  startAll(): void {
    this.jobs.forEach((job, name) => {
      this.startJob(name);
    });
  }

  /**
   * Stop all cron jobs
   */
  stopAll(): void {
    this.jobs.forEach((job, name) => {
      this.stopJob(name);
    });
  }

  /**
   * Parse schedule string to milliseconds
   * Supports: "3m", "5m", "1h", "30s", etc.
   */
  private parseSchedule(schedule: string): number {
    const match = schedule.match(/^(\d+)([smhd])$/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "s":
        return value * 1000; // seconds
      case "m":
        return value * 60 * 1000; // minutes
      case "h":
        return value * 60 * 60 * 1000; // hours
      case "d":
        return value * 24 * 60 * 60 * 1000; // days
      default:
        return 0;
    }
  }

  /**
   * Get job status
   */
  getJobStatus(name: string): { isRunning: boolean; schedule: string } | null {
    const job = this.jobs.get(name);
    if (!job) return null;

    return {
      isRunning: job.isRunning,
      schedule: job.schedule,
    };
  }

  /**
   * Get all jobs status
   */
  getAllJobsStatus(): Record<string, { isRunning: boolean; schedule: string }> {
    const status: Record<string, { isRunning: boolean; schedule: string }> = {};
    this.jobs.forEach((job, name) => {
      status[name] = {
        isRunning: job.isRunning,
        schedule: job.schedule,
      };
    });
    return status;
  }
}

export default CronService;
