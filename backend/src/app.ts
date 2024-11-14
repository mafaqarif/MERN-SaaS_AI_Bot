import express from "express";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

export default app;
