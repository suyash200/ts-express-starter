import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Request } from "express";
export type ServiceFunctionParams = {
  dbCon: NodePgDatabase;
  req: Request;
};

export type ServiceFunctionReturn = {
  success: boolean;
  data?: null | any;
  message: any;
  statusCode: number;
};
