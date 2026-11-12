import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authtenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "token is not found",
      });

      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string" || !decoded.id || !decoded.role) {
      res.status(401).json({
        success: false,
        message: "Payload token is not valid",
      });
      return;
    }

    req.user = {
      id: decoded.id as string,
      role: decoded.role as string,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token is not valid or expired",
    });
  }
};
