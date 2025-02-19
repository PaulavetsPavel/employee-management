import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./router/auth.js";
import errorMiddleware from "./middleware/error-middleware.js";
import { employeesRouter } from "./router/employees.js";
import { logRouter } from "./router/logs.js";

const PORT = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", employeesRouter);
app.use("/api", logRouter);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
