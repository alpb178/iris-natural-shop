import path from "path";

export default ({ env }) => {
  const client = env("DB_CLIENT", "sqlite");

  const connections = {
    mysql: {
      connection: {
        host: env("DB_HOST", "localhost"),
        port: env.int("DB_PORT", 3306),
        database: env("DB_NAME", "strapi"),
        user: env("DB_USERNAME", "strapi"),
        password: env("DB_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) && {
          key: env("DATABASE_SSL_KEY", undefined),
          cert: env("DATABASE_SSL_CERT", undefined),
          ca: env("DATABASE_SSL_CA", undefined),
          capath: env("DATABASE_SSL_CAPATH", undefined),
          cipher: env("DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    postgres: {
      connection: {
        // connectionString: env("DATABASE_URL"),
        host: env("DB_HOST", "localhost"),
        port: env.int("DB_PORT", 5432),
        database: env("DB_NAME", "strapi"),
        user: env("DB_USERNAME", "strapi"),
        password: env("DB_PASSWORD", "strapi"),
        ssl: env.bool("DATABASE_SSL", false) ? {
          rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false),
          ...(env("DATABASE_SSL_KEY") && { key: env("DATABASE_SSL_KEY") }),
          ...(env("DATABASE_SSL_CERT") && { cert: env("DATABASE_SSL_CERT") }),
          ...(env("DATABASE_SSL_CA") && { ca: env("DATABASE_SSL_CA") }),
          ...(env("DATABASE_SSL_CAPATH") && { capath: env("DATABASE_SSL_CAPATH") }),
          ...(env("DATABASE_SSL_CIPHER") && { cipher: env("DATABASE_SSL_CIPHER") }),
        } : false,
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
