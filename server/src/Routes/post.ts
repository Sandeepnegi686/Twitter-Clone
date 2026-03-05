import express from "express";
import {
  createPost,
  getPostById,
  getPosts,
  likePost,
  unLikePost,
} from "../Controller/PostController";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateUser, createPost);
router.get("/getPosts", getPosts);
router.get("/getPosts/:userId", getPosts);

router.get("/getPostById/:postId", getPostById);

router.get("like-post", authenticateUser, likePost);
router.get("un-like-post", authenticateUser, unLikePost);

export default router;
