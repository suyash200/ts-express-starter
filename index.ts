import { miscConfig } from "./src/config";
import ExpressApp from "./src/server/app";
import logger from "./src/util/logger.util";
import middleware from "./src/middleware";

const app = ExpressApp();
middleware(app);



app.listen(miscConfig.port, () => {
  logger.info(`server started at ${miscConfig.port}`)
})
