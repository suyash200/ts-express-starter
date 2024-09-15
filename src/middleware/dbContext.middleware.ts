import { NextFunction, Request, Response } from "express";
import { db } from "../util/db.util";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    req.dbCon = db;
    next();
  } catch (err: any | Error) {
    res.status(200);
    throw new Error(err);
  }
}
