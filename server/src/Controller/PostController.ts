import { Request, Response } from "express";
import PostModel from "../Model/PostModel";
import UserModel from "../Model/UserModel";

async function createPost(
  req: Request<{}, {}, { body: string }>,
  res: Response,
) {
  const body = req.body.body;
  if (!body) {
    return res
      .status(400)
      .json({ success: false, message: "Body is neccessary" });
  }
  const userId = req.user?._id;
  const post = await PostModel.create({ body, userId });
  return res
    .status(201)
    .json({ success: true, message: "Post is created", post });
}

async function getPost(req: Request<{ userId: string }>, res: Response) {
  const userId = req.params.userId;
  if (userId) {
    const posts = await PostModel.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, posts });
  }
  const posts = await PostModel.find({})
    .populate("userId")
    .sort({ createdAt: -1 });
  return res.status(200).json({ success: true, posts });
}

export { createPost, getPost };
