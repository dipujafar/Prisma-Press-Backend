import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

type TMeta = {
  page: number;
  limit: number;
  total: number;
}

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
}

const sendResponse = <T>(res: Response, data: TResponseData<T>) =>{
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data
  });
}

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
        error: (error as Error).message,
      });
    }
  };
};
