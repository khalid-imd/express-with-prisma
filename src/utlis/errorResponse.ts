import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors !== undefined && { errors }),
  });
};
