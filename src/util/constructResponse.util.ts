import { Response } from "express";

const constructResponse = (
  res: Response,
  status: number,
  message: string = "Success",
  isSuccess: boolean = true,
  data: any = undefined,
) => {
  res.status(status).json({
    isSuccess,
    message,
    data,
  });
};

export default constructResponse;
