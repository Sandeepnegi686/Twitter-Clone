import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import { createComment } from "../Controller/CommentController";

const router = express.Router();

router.post("/create", createComment);

export default router;
