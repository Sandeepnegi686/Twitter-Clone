import Header from "../_components/Header";
import NotificationsFeed from "../_components/NotificationsFeed";

export default async function Page() {
  const notifications = await fetch("/api/notification", { method: "GET" });
  console.log(notifications);

  return (
    <>
      <Header label="Notifications" />
      <NotificationsFeed />
    </>
  );
}
