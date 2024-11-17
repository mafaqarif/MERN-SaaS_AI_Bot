import app from "./app";
import { connectToDatabase } from "./db/connection";

const PORT = 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on port " + PORT);
    });
  })
  .catch((err) => console.log(err));
