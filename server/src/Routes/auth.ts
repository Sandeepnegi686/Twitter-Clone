import express, { Request, Response } from "express";
import { loginUser, signUp } from "../Controller/AuthController";
import authenticateUser from "../middleware/authMiddleware";
import UserModel from "../Model/UserModel";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

router.get("/me", authenticateUser, async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user?._id);
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ success: true, user });
});

router.get("/logout", async (req: Request, res: Response) => {
  res.cookie("access-token", "", {
    expires: new Date(0),
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    path: "/",
  });
  return res.status(200).json({ success: true });
});

export default router;
