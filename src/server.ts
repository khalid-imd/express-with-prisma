import express, { Request, Response } from "express";
import employeeRoutes from "./routes/employee.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Halo! Server HRIS saya sudah menyala.");
});

app.use(`/api/employees`, employeeRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
