import postgres from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import pgConfig from "../../drizzle.config";
import { miscConfig } from "../config";
import logger from "./logger.util";

export let db: NodePgDatabase;
export default async function DbCon() {
  const dbClient = new postgres.Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: miscConfig.dbPassword,
    database: miscConfig.dbName,
  });
  await dbClient.connect((err) => {
    if (err) logger.error(`DbCon failed ${err.message}`, err);
  });
  db = drizzle(dbClient, { logger: true });
  return db

}


