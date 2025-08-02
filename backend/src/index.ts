import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectToDatabase } from "./db/connection";

const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Open and Connected To DataBase", PORT)
    );
  })
  .catch((err) => console.log(err));
