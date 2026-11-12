import swaggerJSDoc from "swagger-jsdoc";

const option: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HRIS Employee Management API",
      version: "1.0.0",
      description: "API documentation for HRIS Employee Management",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Masukkan JWT token hasil login",
        },
      },
    },
  },
  apis: ["src/docs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(option);

export default swaggerSpec;
