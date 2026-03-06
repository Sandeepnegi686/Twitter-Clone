import Header from "../_components/Header";
import NotificationsFeed from "../_components/NotificationsFeed";

export default async function Page() {
  const url = process.env.DOMAIN_URL || "";
  const notifications = await fetch(`${url}/api/notification`, {
    credentials: "include",
  });
  console.log(notifications);

  return (
    <>
      <Header label="Notifications" />
      <NotificationsFeed />
    </>
  );
}
