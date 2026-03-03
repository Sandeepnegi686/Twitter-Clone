import { Request, Response } from "express";
import PostModel from "../Model/PostModel";

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

async function getPost(req: Request, res: Response) {
  // const userId = req.body.userId;

  // const userId = req.user?._id;
  const post = await PostModel.find();
  return res
    .status(201)
    .json({ success: true, message: "Post is created", post });
}

export { createPost, getPost };
