import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      ((statusCode = httpStatus.BAD_REQUEST),
        (errorMessage = "Duplicate Key Error"));
    } else if (err.code === "P2003") {
      ((statusCode = httpStatus.BAD_REQUEST),
        (errorMessage = "Foreign key constraint failed"));
    } else if (err.code === "2025") {
      ((statusCode = httpStatus.BAD_REQUEST),
        (errorMessage =
          "An  operation failed because it depends on one or more records that were required but not found."));
    }
  }

  res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    error: err.stack,
  });
};
