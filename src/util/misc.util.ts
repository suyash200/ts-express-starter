import { Request, Response } from "express";
import {
  ServiceFunctionParams,
  ServiceFunctionReturn,
} from "../types/uit.types";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import constructResponse from "./constructResponse.util";
import constants from "../constants";
import { Column, eq, SQL } from "drizzle-orm";

export const createControllerFromServices = (
  serviceFunction: (
    dbConn: NodePgDatabase,
    reqData: any,
  ) => Promise<ServiceFunctionReturn>,
  errorMsg: string = "",
  protectedFields: string[] = [],
) => {
  return async function (req: Request, res: Response) {
    try {
      if (protectedFields.length) {
        if (Object.keys(req.body).some((key) => protectedFields.includes(key)))
          return constructResponse(
            res,
            constants.responseConstants.Forbidden.code,
            `${constants.responseConstants.Forbidden.message} Not authorized to update these fields`,
            false,
          );
      }
      const data = await serviceFunction(req.dbCon, {
        body: req.body,
        headers: req.headers,
        params: req.params,
        logger: req.log,
      });
      if (data.success) {
        return constructResponse(
          res,
          data.statusCode,
          data.message,
          data.success,
          data.data,
        );
      }
      return constructResponse(
        res,
        data.statusCode,
        data.message,
        data.success,
      );
    } catch (error: any | Error) {
      req.log.error({
        message: `Failure due to ${error.message}`,
        error: new Error(error),
      });
      return constructResponse(
        res,
        constants.responseConstants.ServerError.code,
        `${constants.responseConstants.ServerError.message}`,
        false,
      );
    }
  };
};

export function getFindQuery(feild: Column, value: any): SQL {
  return eq(feild, value);
}
