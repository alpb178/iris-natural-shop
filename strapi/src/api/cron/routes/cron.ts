/**
 * Cron routes
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/cron/status",
      handler: "cron.getStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/cron/start/:name",
      handler: "cron.startJob",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/cron/stop/:name",
      handler: "cron.stopJob",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/cron/execute",
      handler: "cron.executeCustomTask",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/cron/logs",
      handler: "cron.getLogs",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
