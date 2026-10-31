import { Router } from "express";
import {
  createEmployee,
  deleteEmployeeController,
  getEmployeeById,
  getEmployees,
  updateEmployeeController,
} from "../controllers/employee.controllers";

const router = Router();

router.post(`/`, createEmployee);
router.post(`/search`, getEmployees);
router.get(`/:id`, getEmployeeById);
router.put(`/:id`, updateEmployeeController);
router.delete(`/:id`, deleteEmployeeController);

export default router;
