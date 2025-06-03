import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import prisma from "../prisma/index.js";

if (prisma) {
  logger.info("Connected to Database");
} else {
  logger.error("Failed to connect to Database");
}

export default app;
