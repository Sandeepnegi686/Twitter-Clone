import express from "express";
import {
  createNotification,
  getNotificationByUser,
  clearNotification,
} from "../Controller/NotificationController";

const router = express.Router();

router.post("/create", createNotification);
router.get("/getNotificationByUser", getNotificationByUser);
router.get("/clearNotification", clearNotification);

export default router;
