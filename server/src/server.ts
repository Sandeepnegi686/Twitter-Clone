import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/auth";
import { errorHandler } from "./middleware/errorHandler";
// import "./config/passport";

const app: Express = express();
const DB = process.env.DB_URL || "";
const PORT = process.env.PORT || 0;
const CLIENT_URL = process.env.CLIENT_URL || "";

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => res.send("hello from Ts - node"));

app.use("/api/v1/auth/", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started at port :", PORT);
  connect(DB)
    .then(() => console.log("Database Connected."))
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
});
