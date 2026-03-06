import { BsTwitter } from "react-icons/bs";
import { NotificationsType } from "../types/NotificationsType";
import API_BASE_URL, { api } from "../_lib/api";

export default async function NotificationsFeed() {
  // const fetchedNotifications: NotificationsType[] = await fetchNotifications();
  // const res = await fetch(
  //   `${API_BASE_URL}/api/v1/notification/get-notification-by-user`,
  //   {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );
  // console.log(res);
  // const data = await res.json();
  const fetchedNotifications = [];

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
