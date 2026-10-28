import prisma from "../config/prisma";

export const createEmployeeServices = async (data: any) => {
  const newEmployee = await prisma.employee.create({
    data: data,
  });

  return newEmployee;
};

export const getEmployeesServices = async () => {
  const employees = await prisma.employee.findMany();

  return employees;
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
