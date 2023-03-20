import { Request, Response } from "express";

export const invalidRouteHandler = (req: Request, res: Response) => {
  // Invalid request
  res.status(404).json({
    success: false,
    errorCode: 5,
    errorMessage: "Invalid Request. Route does not exist",
  });
};
