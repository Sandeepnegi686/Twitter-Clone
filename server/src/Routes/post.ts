import express from "express";
import { createPost, getPost } from "../Controller/PostController";

const router = express.Router();

router.post("/create", createPost);
router.get("/getPosts", getPost);

export default router;
