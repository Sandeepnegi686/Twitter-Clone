import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import {
  createComment,
  getCommentsByPost,
} from "../Controller/CommentController";

const router = express.Router();

router.post("/create", authenticateUser, createComment);

router.get("/getCommentsByPostId/:postId", getCommentsByPost);

export default router;
