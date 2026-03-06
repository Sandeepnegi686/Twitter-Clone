import { Request, Response } from "express";
import NotificationsModel from "../Model/NotificationsModel";
import UserModel from "../Model/UserModel";

async function createNotification(
  req: Request<{}, {}, { body: string; userId: string }>,
  res: Response,
) {
  const body = req.body?.body;
  const userId = req.body?.userId;
  if (!body || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Neccessary fields are missing." });
  }
  const notification = await NotificationsModel.create({ body, userId });
  await UserModel.findByIdAndUpdate(
    userId,
    { hasNotifications: true },
    { new: true },
  );
  return res
    .status(201)
    .json({ success: true, message: "Notification is created", notification });
}

async function getNotificationByUser(req: Request, res: Response) {
  const userId = req.user?._id;
  const notifications = await NotificationsModel.find({ userId });
  return res.status(200).json({ success: true, notifications });
}

async function clearNotification(req: Request, res: Response) {
  //   const userId = req.user?._id;
  //   const notification = await NotificationsModel.find({ userId });
  //   return res
  //     .status(201)
  //     .json({ success: true, message: "Notification is created", notification });
}

export { createNotification, getNotificationByUser, clearNotification };
