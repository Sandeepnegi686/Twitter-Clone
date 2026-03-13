import express, { Express, Request, Response } from "express";
import { connect } from "mongoose";
require("dotenv").config();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/auth";
import userRouter from "./Routes/user";
import postRouter from "./Routes/post";
import commentRouter from "./Routes/comment";
import notificationRouter from "./Routes/notification";
import { errorHandler } from "./middleware/errorHandler";
import authenticateUser from "./middleware/authMiddleware";
import connectDB from "./lib/connectDB";
import helmet from "helmet";

const app: Express = express();
const DB_URL = process.env.DB_URL || "";
const PORT = process.env.PORT || 80;
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

const allowedOrigins = [
  "http://localhost:3000",
  "https://twitter-clone-zeta-smoky.vercel.app",
];

//request logger
app.use(function (req, res, next) {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://twitter-clone-zeta-smoky.vercel.app",
    ],
    credentials: true,
  }),
);

app.get("/", (_: Request, res: Response) => res.send("hello from Ts - node"));

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/post/", postRouter);
app.use("/api/v1/comment/", commentRouter);
app.use("/api/v1/notification/", authenticateUser, notificationRouter);

app.use(errorHandler);

async function start() {
  try {
    await connectDB(DB_URL).then(() => console.log("DB connected."));
    app.listen(PORT, function () {
      console.log(`server running at ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
