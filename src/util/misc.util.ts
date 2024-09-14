import { Request } from "express";
import { ServiceFunctionParams, ServiceFunctionReturn } from "../types/uit.types";


export function CreateControllerFromServices(
  serviceFunction: (
    { dbCon, req }: ServiceFunctionParams
  ) => Promise<ServiceFunctionReturn>,
  errorMsg: string = "",
  protectedFields: string[] = []

) {
  return async function(req: Request, res: Response) {
    try {
      return await serviceFunction({ dbCon: "", req: req })
    } catch (error) {

    }
  }
}
