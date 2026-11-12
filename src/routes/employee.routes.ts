import { Router } from "express";
import {
  createEmployee,
  deleteEmployeeController,
  getEmployeeById,
  getEmployees,
  restoreEmployeeController,
  updateEmployeeController,
} from "../controllers/employee.controllers";
import { authtenticateToken } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     description: Create a new employee record.
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: NIK or email already exists
 */
router.post(`/`, authtenticateToken, createEmployee);
router.post(`/search`, authtenticateToken, getEmployees);
router.get(`/:id`, authtenticateToken, getEmployeeById);
router.put(`/:id`, authtenticateToken, updateEmployeeController);
router.delete(`/:id`, authtenticateToken, deleteEmployeeController);
router.patch(`/:id/restore`, authtenticateToken, restoreEmployeeController);

export default router;
