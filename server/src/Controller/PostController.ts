import { Request, Response } from "express";
import PostModel from "../Model/PostModel";
import { Types } from "mongoose";

async function createPost(
  req: Request<{}, {}, { body: string }>,
  res: Response,
) {
  const body = req.body.body;
  console.log(req.body);
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

async function getPosts(req: Request<{ userId: string }>, res: Response) {
  const userId = req?.params?.userId;
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

async function getPostById(req: Request<{ postId: string }>, res: Response) {
  const postId = req.params.postId;
  if (!postId || !Types.ObjectId.isValid(postId)) {
    return res
      .status(400)
      .json({ success: false, message: "post id is not defined" });
  }
  const post = await PostModel.findById(postId).populate("userId comments");

  if (!post) {
    return res
      .status(400)
      .json({ success: false, message: "post id is invalid" });
  }
  return res.status(200).json({ success: true, post });
}

async function likePost(
  req: Request<{}, {}, { postId: string }>,
  res: Response,
) {
  const postId = req.body?.postId;
  if (!postId || !Types.ObjectId.isValid(postId)) {
    return res
      .status(400)
      .json({ success: false, message: "postId is not present" });
  }
  const updatedPost = await PostModel.findByIdAndUpdate(
    postId,
    { $addToSet: { likedId: req.user?._id } },
    { new: true },
  );

  return res.status(200).json({ success: true, post: updatedPost });
}

async function unLikePost(
  req: Request<{}, {}, { postId: string }>,
  res: Response,
) {
  const postId = req.body?.postId;
  if (!postId || !Types.ObjectId.isValid(postId)) {
    return res
      .status(400)
      .json({ success: false, message: "postId is not present" });
  }
  const updatedPost = await PostModel.findByIdAndUpdate(
    postId,
    { $pull: { likedId: req.user?._id } },
    { new: true },
  );

  return res.status(200).json({ success: true, post: updatedPost });
}

export { createPost, getPosts, getPostById, likePost, unLikePost };
