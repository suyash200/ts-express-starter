import postgres from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import pgConfig from "../../drizzle.config";
import { miscConfig } from "../config";
import logger from "./logger.util";

export let db: NodePgDatabase;
export default async function DbCon() {
  try {
    const dbClient = new postgres.Client({
      host: miscConfig.host,
      port: Number(miscConfig.dbPort),
      user: miscConfig.dbUserName,
      password: miscConfig.dbPassword,
      database: miscConfig.dbName,
    });
    await dbClient.connect();
    db = drizzle(dbClient, { logger: true });
    logger.info("DB connected");
    return db;
  } catch (error: any | Error) {
    logger.destroy(error);
    throw new Error("DB CON error");
  }
}
