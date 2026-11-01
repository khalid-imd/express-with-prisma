import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: error.issues,
    });
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    res.status(409).json({
      success: false,
      message: "NIK atau email sudah digunakan",
    });
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    return;
  }

  if (error instanceof Error && error.message === "Employee tidak ditemukan") {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (
    error instanceof Error &&
    error.message === "Deleted employee tidak ditemukan"
  ) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
};
