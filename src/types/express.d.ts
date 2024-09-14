import { DrizzleEntity } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Request, Response } from "express";
import { Client } from "pg";
import { Logger } from "winston";


export interface ResponseBody {
  isSuccess: boolean;
  message: string;
  data?: any;
}

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      log: Logger,
      dbCon: NodePgDatabase,
    }
    interface Response {
      body: ResponseBody
    }
  }
} 
