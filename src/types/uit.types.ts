import { Request } from "express"
export type ServiceFunctionParams = {
  dbCon: any,
  req: Request,
}

export type ServiceFunctionReturn = {
  success: boolean;
  data: any;
  message: any;
  statusCode: number
}
