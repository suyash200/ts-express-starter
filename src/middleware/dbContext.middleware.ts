import { Request, Response } from "express";
import DbCon from "../util/db.util";

export default async function(req: Request, res: Response) {
  const logger = req.log;
  try {
    const db = await DbCon();
    req.dbCon = db;
  } catch (err: any | Error) {
    logger.error(`Error arised due to ${err.message}`, err);
    throw new Error(err);
  }
}
