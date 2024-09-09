import { Request, Response } from "express";
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
      log: Logger
    }
    interface Response {
      body: ResponseBody
    }
  }
} 
