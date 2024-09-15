import miscellaneousConfig from "./miscellaneous.config";
import { configDotenv } from "dotenv";
import commonConfig from "./common.config";
configDotenv();

const miscConfig = miscellaneousConfig(process.env);

export { miscConfig, commonConfig };
