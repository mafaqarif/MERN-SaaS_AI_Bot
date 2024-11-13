import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
