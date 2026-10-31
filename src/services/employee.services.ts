import prisma from "../config/prisma";

type EmployeeSearchPayload = {
  page: number;
  limit: number;
  department?: string;
  status?: string;
};

export const createEmployeeServices = async (data: any) => {
  const newEmployee = await prisma.employee.create({
    data: data,
  });

  return newEmployee;
};

export const getEmployeesServices = async (payload: EmployeeSearchPayload) => {
  const { page, limit, department, status } = payload;

  const employees = await prisma.employee.findMany({
    where: {
      ...(department && { department }),
      ...(status && { status }),
    },

    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      joinDate: "desc",
    },
  });

  return employees;
};

export const countEmployeeServices = async (filters: EmployeeSearchPayload) => {
  return await prisma.employee.count({
    where: {
      ...(filters.department && { department: filters.department }),
      ...(filters.status && { status: filters.status }),
    },
  });
};

export const getEmployeeByIdServices = async (id: string) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  });

  return employee;
};

export const updateEmployeeService = async (
  id: string,
  data: {
    nik?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    department?: string;
    position?: string;
    salary?: number;
  },
) => {
  return await prisma.employee.update({
    where: { id },
    data,
  });
};

export const deleteEmployeeService = async (id: string) => {
  return await prisma.employee.delete({
    where: { id: id },
  });
};
