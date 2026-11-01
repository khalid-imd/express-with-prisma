import { Router } from "express";
import {
  createEmployee,
  deleteEmployeeController,
  getEmployeeById,
  getEmployees,
  restoreEmployeeController,
  updateEmployeeController,
} from "../controllers/employee.controllers";

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
router.post(`/`, createEmployee);
router.post(`/search`, getEmployees);
router.get(`/:id`, getEmployeeById);
router.put(`/:id`, updateEmployeeController);
router.delete(`/:id`, deleteEmployeeController);
router.patch(`/:id/restore`, restoreEmployeeController);

export default router;
