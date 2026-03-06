import { BsTwitter } from "react-icons/bs";
import { NotificationsType } from "../types/NotificationsType";
import API_BASE_URL from "../_lib/api";

export default async function NotificationsFeed() {
  const fetchedNotifications: NotificationsType[] = await fetchNotifications();

  if (fetchedNotifications.length == 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification) => {
        return (
          <div className="flex items-center p-6 gap-4 border-b border-neutral-800">
            <BsTwitter color="white" size={32} />
            <p className="text-white">{notification.body}</p>
          </div>
        );
      })}
    </div>
  );
}
async function fetchNotifications() {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/notification/getNotificationByUser`,
    {
      credentials: "include",
    },
  );
  const data = await res.json();
  return data.notifications ?? [];
}
