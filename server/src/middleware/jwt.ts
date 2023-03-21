import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import createError from "../utils/createError";


interface JwtPayload {
  id: string;
  isSeller: boolean;
}

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
    if (!token) return next(createError(401, 3, "You are not authenticated!"));

  try {
    const decoded = jwt.verify(token, jwtSecret!) as JwtPayload;
    res.locals.userId = decoded.id;
    res.locals.isSeller = decoded.isSeller;
    next();
  } catch (error) {
    next(createError(403, 3, "You are not authorized!"));
  }
};
