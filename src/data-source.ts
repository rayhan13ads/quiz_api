import { DataSource } from "typeorm";
import { config } from "./config/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.db.host,
  port: Number(config.db.prot),
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  cache: {
    duration: 10000,
  },
  entities: ["build/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});
