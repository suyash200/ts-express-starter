import { Config, defineConfig } from "drizzle-kit";
import { miscConfig } from "./src/config";

export default defineConfig({
  schema: "./src/models/*",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: miscConfig.dbSchema,
  dbCredentials: {
    url: miscConfig.dbUrl as string,
    host: miscConfig.host,
    port: Number(miscConfig.dbPort),
    user: miscConfig.dbUserName,
    password: miscConfig.dbPassword,
    database: miscConfig.dbName,
    ssl: false,
  },
});
