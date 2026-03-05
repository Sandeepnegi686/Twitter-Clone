import express from "express";
import { createPost, getPost } from "../Controller/PostController";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateUser, createPost);
router.get("/getPosts", getPost);
router.get("/getPosts/:userId", getPost);

export default router;
