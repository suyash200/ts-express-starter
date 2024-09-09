import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import { miscConfig } from "../config";
import requestContext from "./requestContext.middleware";
const corsOptions: CorsOptions = {
  origin: [miscConfig.frontEndUrl, "*"],
  credentials: true,

}


export default function(app: Application) {
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestContext)
}
