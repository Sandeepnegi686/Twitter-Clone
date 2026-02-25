import express, { Request, Response } from "express";
// import { loginUser, signOut, signUp } from "../Controller/authController";
// import passport from "passport";
import jwt from "jsonwebtoken";
import { loginUser, signUp } from "../Controller/UserController";
import authenticateUser from "../middleware/authMiddleware";
import UserModel from "../Model/UserModel";
import { Types } from "mongoose";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post("/signup", signUp);
router.post("/login", loginUser);
// router.get("/logout", signOut);

router.get("/me", authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json({ success: true, user: req.user });
});

router.get("/user/:id", async (req: Request<{ id: string }>, res: Response) => {
  if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: "id is invalid" });
  }
  const user = await UserModel.findById(req.params.id);
  if (!user)
    return res.status(400).json({ success: false, message: "user not found" });
  return res.status(200).json({ success: true, user });
});
router.get("/users", async (req: Request, res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return res.status(200).json({ success: true, users });
});

export default router;
