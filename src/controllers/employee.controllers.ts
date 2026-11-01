import { NextFunction, Request, Response } from "express";
import z, { success } from "zod";

import {
  countEmployeeServices,
  createEmployeeServices,
  deleteEmployeeService,
  getEmployeeByIdServices,
  getEmployeesServices,
  restroreEmployeeService,
  updateEmployeeService,
} from "../services/employee.services";

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

const employeeSearchSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(20).default(5),
  department: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validateData = employeeSchema.parse(req.body);

    const employee = await createEmployeeServices({
      ...validateData,
      birthDate: validateData.birthDate
        ? new Date(validateData.birthDate)
        : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Employee berhasil ditambahkan",
      data: employee,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, limit, department, status } = employeeSearchSchema.parse(
      req.body,
    );

    const payload = {
      page,
      limit,
      department,
      status,
    };

    const employees = await getEmployeesServices(payload);

    const totalEmployees = await countEmployeeServices(payload);
    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      success: true,
      message: "Data employee berhasil diambil",
      data: employees,
      pagination: {
        currentPage: page,
        limit,
        totalEmployees,
        totalPages,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return next(new Error("Invalid employee ID"));
    }

    const employee = await getEmployeeByIdServices(id);

    if (!employee) {
      res.status(404).json({
        success: false,
        error: "Employee tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data employee berhasil diambil",
      data: employee,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return next(new Error("Invalid employee ID"));
  }

  try {
    const validateData = employeeUpdateSchema.parse(req.body);

    const employee = await updateEmployeeService(id, validateData);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(error);
  }
};

export const restoreEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return next(new Error("Invalid employee ID"));
  }

  try {
    const employee = await restroreEmployeeService(id);

    res.status(200).json({
      success: true,
      message: "Employee restored successfully",
      data: employee,
    });
  } catch (error: unknown) {
    next(error);
  }
};
