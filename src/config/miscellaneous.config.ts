export default function(env: NodeJS.ProcessEnv) {
  return {
    port: env.PORT,
    jwtSecret: env.JWT_SECRET,
    nodeEnv: env.NODE_ENV || "development",
    jwtExpiry: env.JWT_EXPIRE_TIME || "15m",
    saltRounds: env.SALT_ROUND || 10,
    frontEndUrl: env.FRONTEND_URL || `http://localhost:3000`,
    dbName: env.DB_NAME,
    dbPassword: env.DB_PASSWORD,
    dbUserName: env.DB_USERNAME,
    dbUrl: env.DB_URL,
  };
}
