import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
require("dotenv").config();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/auth";
import userRouter from "./Routes/user";
import postRouter from "./Routes/post";
import commentRouter from "./Routes/comment";
import { errorHandler } from "./middleware/errorHandler";
import authenticateUser from "./middleware/authMiddleware";

const app: Express = express();
const DB = process.env.DB_URL || "";
const PORT = process.env.PORT || 0;
const CLIENT_URL = process.env.CLIENT_URL || "";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
      };
    }
  }
}

//request logger
app.use(function (req, res, next) {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => res.send("hello from Ts - node"));

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/post/", postRouter);
app.use("/api/v1/comment/", authenticateUser, commentRouter);

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
