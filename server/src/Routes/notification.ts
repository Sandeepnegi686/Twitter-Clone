import express from "express";
import {
  createNotification,
  getNotificationByUser,
  clearNotification,
} from "../Controller/NotificationController";

const router = express.Router();

router.post("/create", createNotification);
router.get("/get-notification-by-user", getNotificationByUser);
router.delete("/clearNotification", clearNotification);

export default router;
