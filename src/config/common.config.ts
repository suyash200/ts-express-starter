import winston from "winston";

const commonConfig = {
  logger: {
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  },
};

export default commonConfig;
