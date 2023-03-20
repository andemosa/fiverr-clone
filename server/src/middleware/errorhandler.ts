import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorStatus = err.status || 500;
  const errorCode = err.code || 0;
  const errorMessage = err.message || "Something went wrong!";
  logger.error(err);
  return res.status(errorStatus).json({
    success: false,
    errorCode,
    errorMessage: errorMessage,
  });
};
