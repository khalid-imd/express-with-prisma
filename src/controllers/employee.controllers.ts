import {
  createEmployeeServices,
  deleteEmployeeService,
  getEmployeeByIdServices,
  getEmployeesServices,
  updateEmployeeService,
} from "../services/employee.services";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import z from "zod";
import { sendErrorResponse } from "../utlis/errorResponse";

const employeeSchema = z.object({
  nik: z.string().min(5, "NIK minimal 5 character"),
  firstName: z.string().min(1, "nama depan wajib diisi"),
  lastName: z.string().optional(),
  email: z.email("Format email tidak valid"),
  phone: z.string().optional(),
  gender: z.string(),
  birthDate: z.string().optional(),
  address: z.string().optional(),
  department: z.string(),
  position: z.string(),
  salary: z.number().min(0, "gaji tidak boleh minus"),
  status: z.string().optional(),
});

const employeeUpdateSchema = employeeSchema.partial();

export const createEmployee = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const validateData = employeeSchema.parse(req.body);

    const employee = await createEmployeeServices({
      ...validateData,
      birthDate: validateData.birthDate
        ? new Date(validateData.birthDate)
        : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Employee berhasil ditambahkan",
      data: employee,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendErrorResponse(res, 400, "Validasi gagal", error.issues);
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return sendErrorResponse(res, 400, "NIK atau email sudah digunakan");
    }

    return sendErrorResponse(res, 500, "Terjadi kesalahan pada server");
  }
};

export const getEmployees = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const employees = await getEmployeesServices();

    return res.status(200).json({
      success: true,
      message: "Data employee berhasil diambil",
      data: employees,
    });
  } catch (error: any) {
    sendErrorResponse(res, 500, "Terjadi kesalahan pada server", error.issues);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendErrorResponse(res, 400, "Invalid employee ID");
    }

    const employee = await getEmployeeByIdServices(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data employee berhasil diambil",
      data: employee,
    });
  } catch (error: any) {
    return sendErrorResponse(res, 500, "Terjadi kesalahan pada server");
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return sendErrorResponse(res, 400, "Invalid employee ID");
  }

  try {
    const validateData = employeeUpdateSchema.parse(req.body);

    const employee = await updateEmployeeService(id, validateData);

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return sendErrorResponse(res, 400, "Validasi data gagal", error.issues);
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return sendErrorResponse(res, 404, "Employee not found");
    }

    return sendErrorResponse(res, 500, "Internal server error");
  }
};

export const deleteEmployeeController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return sendErrorResponse(res, 400, "Invalid employee ID");
  }

  try {
    await deleteEmployeeService(id);

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return sendErrorResponse(res, 404, "Employee not found");
    }

    return sendErrorResponse(res, 500, "Internal server error");
  }
};
