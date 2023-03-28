import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const getErrorMessage = (arr: Array<any>) => {
  let errorMessage = "";
  for (const obj of arr) {
    errorMessage = errorMessage + " \n " + obj.message;
  }
  return errorMessage;
};

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res
        .status(400)
        .json({
          success: false,
          errorCode: 2,
          errorMessage: getErrorMessage(e.errors),
        });
    }
  };

export default validate;
