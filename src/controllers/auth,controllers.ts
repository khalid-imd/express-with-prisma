import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth,services";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User berhasil didaftarkan",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
