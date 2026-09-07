import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    error: err.stack,
  });
};
