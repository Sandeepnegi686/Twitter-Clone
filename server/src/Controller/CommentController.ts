import { Request, Response } from "express";
import CommentModel from "../Model/CommentModel";

async function createComment(
  req: Request<{}, {}, { body: string; postId: string }>,
  res: Response,
) {
  const body = req.body?.body;
  const postId = req.body?.postId;
  if (!body || !postId) {
    return res
      .status(400)
      .json({ success: false, message: "Neccessary fields are missing." });
  }
  const userId = req.user?._id;
  const comment = await CommentModel.create({ body, userId, postId });
  return res
    .status(201)
    .json({ success: true, message: "Comment is created", comment });
}

export { createComment };
