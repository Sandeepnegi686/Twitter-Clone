import express, { Request, Response } from "express";
import { loginUser, signUp } from "../Controller/AuthController";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", loginUser);

router.get("/me", authenticateUser, (req: Request, res: Response) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
