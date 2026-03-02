import express, { Request, Response } from "express";
import UserModel from "../Model/UserModel";
import { getUserById, updateBio } from "../Controller/EditController";
import upload from "../config/multer";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return res.status(200).json({ success: true, users });
});

router.post("/update-bio", authenticateUser, upload, updateBio);

router.get("/:id", getUserById);

export default router;
