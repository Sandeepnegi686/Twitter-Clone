import express, { Request, Response } from "express";
import { Types } from "mongoose";
import UserModel from "../Model/UserModel";
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/uploadMedia";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        name: string;
      };
    }
  }
}

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

async function updateBio(req: Request, res: Response) {
  const name = req?.body?.name;
  const bio = req?.body?.bio;
  let profileImageResult: any;
  let coverImageResult: any;
  if (!name || !bio) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  const user = await UserModel.findById(req.user?._id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const files = req.files as {
    profileImage?: Express.Multer.File[];
    coverImage?: Express.Multer.File[];
  };

  if (files?.profileImage) {
    if (user.profileImagePublicId)
      await deleteMediaFromCloudinary(user.profileImagePublicId);
    profileImageResult = await uploadMediaToCloudinary(
      files.profileImage[0],
      "users/profileImage",
    );
    user.profileImage = profileImageResult?.secure_url;
    user.profileImagePublicId = profileImageResult?.public_id;
  }
  if (files?.coverImage) {
    if (user.coverImagePublicId)
      await deleteMediaFromCloudinary(user.coverImagePublicId);
    coverImageResult = await uploadMediaToCloudinary(
      files.coverImage[0],
      "users/coverImage",
    );
    user.coverImage = coverImageResult?.secure_url;
    user.coverImagePublicId = coverImageResult?.public_id;
  }

  user.name = name;
  user.bio = bio;

  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Data updated successfully", user });
}

export { updateBio, getUserById };
