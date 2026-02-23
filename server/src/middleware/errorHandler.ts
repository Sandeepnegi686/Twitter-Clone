import { NextFunction, Request, Response } from "express";

class APIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function errorHandler(
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err.message);
  return res
    .status(err.statusCode || 500)
    .json({ success: false, messsage: err.message });
}

export { APIError, errorHandler };
