import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { connect } from "mongoose";
import { populateDB, dropDB } from "./utils/populate.js";
import garageApi from "./routes/garageApi.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(path.resolve(__dirname, "../client")));
app.use("/public", express.static(path.resolve(__dirname, "../node_modules")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", garageApi);

const PORT = process.env.PORT || 4200;
try {
  await connect(`${process.env.MONGO_URI}`);
  console.log("connected to DB successfully ...");
  // await dropDB();
  // await populateDB();
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT} `);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
