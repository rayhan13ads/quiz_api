import { DataSource } from "typeorm";
import { config } from "./config/config";


console.log(config.db.host);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.db.host,
  port: Number(config.db.port),
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: false,
  cache: {
    duration: 10000,
  },
  entities: ["build/entities/*.entity{.ts,.js}", "src/entities/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});
