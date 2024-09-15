import { Application } from "express";
import indexRouter from "../router/index";
export default function (app: Application) {
  app.use("/api", indexRouter);
}
