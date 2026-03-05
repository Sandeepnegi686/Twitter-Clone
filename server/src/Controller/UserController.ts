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
  const userId = new Types.ObjectId(req.params.id);
  const user = await UserModel.findById(userId);
  if (!user)
    return res.status(400).json({ success: false, message: "user not found" });
  const followersCount = await UserModel.countDocuments({
    followingIds: userId,
  });
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

async function followUser(
  req: Request<{}, {}, { userId: string }>,
  res: Response,
) {
  console.log(req.body);
  const userId = req.body?.userId;
  if (!userId || !Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "userId is not present" });
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user?._id,
    { $addToSet: { followingIds: userId } },
    { new: true },
  );

  return res.status(200).json({ success: true, user: updatedUser });
}

async function unFollowUser(
  req: Request<{}, {}, { userId: string }>,
  res: Response,
) {
  const userId = req.body?.userId;
  if (!userId || !Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "userId is not present" });
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user?._id,
    { $pull: { followingIds: userId } },
    { new: true },
  );
  return res.status(200).json({ success: true, user: updatedUser });
}

export { updateBio, getUserById, followUser, unFollowUser };
