import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  logger.info("Connected to Database");
} catch (error) {
  logger.error("Failed to connect to Database:", error.message);
  app.use((req, res, next) => {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  });
}

export default app;
