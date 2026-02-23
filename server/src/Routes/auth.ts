import express, { Request, Response } from "express";
// import { loginUser, signOut, signUp } from "../Controller/authController";
// import passport from "passport";
import jwt from "jsonwebtoken";
import { loginUser, signUp } from "../Controller/UserController";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post("/signup", signUp);
router.post("/login", loginUser);
// router.get("/logout", signOut);

router.get("/me", authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
