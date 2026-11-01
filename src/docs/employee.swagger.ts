/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     description: Create a new employee record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nik:
 *                 type: string
 *                 example: "EMP001"
 *               firstName:
 *                 type: string
 *                 example: "Budi"
 *               email:
 *                 type: string
 *                 example: "budi@example.com"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: NIK or email already exists
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee UUID
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee tidak ditemukan
 */

/**
 * @swagger
 * /api/employees/search:
 *   post:
 *     summary: Search employees
 *     tags: [Employees]
 *     description: Search employees with pagination and filters.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 example: 10
 *               department:
 *                 type: string
 *                 example: Engineering
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       400:
 *         description: Validation failed
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     description: Update an existing active employee.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nik:
 *                 type: string
 *                 example: EMP001
 *               firstName:
 *                 type: string
 *                 example: Budi
 *               lastName:
 *                 type: string
 *                 example: Santoso
 *               email:
 *                 type: string
 *                 format: email
 *                 example: budi.santoso@example.com
 *               phone:
 *                 type: string
 *                 example: "081234567890"
 *               gender:
 *                 type: string
 *                 example: MALE
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 example: "1995-05-20T00:00:00.000Z"
 *               address:
 *                 type: string
 *                 example: Jakarta Selatan
 *               department:
 *                 type: string
 *                 example: Engineering
 *               position:
 *                 type: string
 *                 example: Senior Frontend Developer
 *               salary:
 *                 type: integer
 *                 example: 15000000
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Employee tidak ditemukan
 *       409:
 *         description: NIK or email already exists
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Soft delete employee
 *     tags: [Employees]
 *     description: Mark an employee as deleted without removing the record from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee UUID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee tidak ditemukan
 */

/**
 * @swagger
 * /api/employees/{id}/restore:
 *   patch:
 *     summary: Restore deleted employee
 *     tags: [Employees]
 *     description: Restore a soft-deleted employee and make it active again.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee UUID
 *     responses:
 *       200:
 *         description: Employee restored successfully
 *       404:
 *         description: Deleted employee tidak ditemukan
 */
