import { Request, Response } from "express";
import { Types } from "mongoose";
import UserModel from "../Model/UserModel";

async function getUserById(req: Request<{ id: string }>, res: Response) {
  if (!req.params.id || !Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success: false, message: "id is invalid" });
  }
  const user = await UserModel.findById(req.params.id);
  const followersCount = await UserModel.countDocuments({
    followingIds: req.params.id,
  });
  if (!user)
    return res.status(400).json({ success: false, message: "user not found" });
  return res.status(200).json({ success: true, user, followersCount });
}

function updateBio(req: Request, res: Response) {
  return 1;
}

export { updateBio, getUserById };
