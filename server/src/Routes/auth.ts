import express, { Request, Response } from "express";
import { loginUser, signUp } from "../Controller/AuthController";
import authenticateUser from "../middleware/authMiddleware";
import UserModel from "../Model/UserModel";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

router.get("/me", authenticateUser, async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.user?._id);
  return res.status(200).json({ success: true, user });
});

export default router;
