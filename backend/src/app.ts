import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes";

config();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;

// app.get("/", (req, res, next) => {
//   res.send("Hello");
// });
