const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Federal Police Garage System API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      { url: "http://localhost:8000" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      { bearerAuth: [] }
    ],
  },
  apis: ["./routes/*.js", "./app.js"],
};

module.exports = swaggerJsdoc(options);
