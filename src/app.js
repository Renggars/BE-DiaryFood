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
import {
  jwtStrategy,
  googleStrategy,
  // facebookStrategy,
} from "./config/passport.js";
import setupSwagger from "./docs/swaggerConfig.js";

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
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

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);
// passport.use("facebook", facebookStrategy);

// Swagger route
setupSwagger(app);

// v1 api routes
app.use("/v1", routes);

// send 404 error jika route tidak ada
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error jadi Instance API Error jika ada error yang tidak ketangkap
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
