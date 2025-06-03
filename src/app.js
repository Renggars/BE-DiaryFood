import express from "express";
import httpStatus from "http-status";
import routes from "./routes/v1/index.js";
import config from "./config/config.js";
import morgan from "./config/morgan.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/ApiError.js";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import { jwtStrategy, googleStrategy } from "./config/passport.js";
import setupSwagger from "./docs/swaggerConfig.js";

let app;

try {
  app = express();

  if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(xss());
  app.use(compression());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.options("*", cors());

  app.use((req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (!contentType.startsWith("multipart/form-data")) {
      express.json()(req, res, (err) => {
        if (err) return next(err);
        express.urlencoded({ extended: true })(req, res, next);
      });
    } else {
      next();
    }
  });

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);
  passport.use("google", googleStrategy);

  setupSwagger(app);
  app.use("/v1", routes);

  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  });

  app.use(errorConverter);
  app.use(errorHandler);

  console.log("App initialization completed successfully");
} catch (error) {
  console.error("Error initializing app.js:", error.message);
  throw new ApiError(
    httpStatus.INTERNAL_SERVER_ERROR,
    "Application initialization failed"
  );
}

export default app;
