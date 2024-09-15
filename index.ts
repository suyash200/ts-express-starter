import { miscConfig } from "./src/config";
import ExpressApp from "./src/server/app";
import logger from "./src/util/logger.util";
import middleware from "./src/middleware";
import DbCon from "./src/util/db.util";
import routerMiddleware from "./src/middleware/router.middleware";

const app = ExpressApp();
middleware(app);
routerMiddleware(app);

app.listen(miscConfig.port, async () => {
  await DbCon();
  logger.info(`server started at ${miscConfig.port}`);
});
