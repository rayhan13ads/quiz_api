import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    type: process.env.DB_TYPE_DEV,
    host: process.env.DB_HOST_DEV,
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
    port: process.env.DB_PORT_DEV,
  },
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};
