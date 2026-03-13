"use client";

import { BsTwitter } from "react-icons/bs";
import { NotificationsType } from "../types/NotificationsType";
import { useEffect } from "react";
import API_BASE_URL from "../_lib/api";
import { mutate } from "swr";

interface NotifcationsFeed {
  notifications: NotificationsType[];
}

export default function NotificationsFeed({ notifications }: NotifcationsFeed) {
  useEffect(() => {
    clearNotification();
    mutate("/api/getCurrentUser");
  }, []);

  if (notifications.length == 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {notifications.map((notification) => {
        return (
          <div
            className="flex items-center p-6 gap-4 border-b border-neutral-800"
            key={notification._id}
          >
            <BsTwitter color="white" size={32} />
            <p className="text-white">{notification.body}</p>
          </div>
        );
      })}
    </div>
  );
}

async function clearNotification() {
  const res = await fetch(`/api/notification`, {
    credentials: "include",
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.success) {
    console.log("something went wrong!");
  }
}
