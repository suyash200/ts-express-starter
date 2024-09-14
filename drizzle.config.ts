import { Config, defineConfig } from 'drizzle-kit'
import { miscConfig } from './src/config'

export default defineConfig({
  schema: './src/models/*',
  out: './drizzle',
  dialect: "postgresql",
  dbCredentials: {
    url: miscConfig.dbUrl as string,
    host: "192.168.0.103",
    port: 5432,
    user: "postgres",
    password: miscConfig.dbPassword,
    database: miscConfig.dbName,
  }
})
