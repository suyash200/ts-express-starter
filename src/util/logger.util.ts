import winston from "winston";
import { commonConfig } from "../config";

const logger = winston.createLogger(commonConfig.logger)



export default logger
