import { cookies } from "next/headers";
import Header from "../_components/Header";
import NotificationsFeed from "../_components/NotificationsFeed";

const url = process.env.DOMAIN_URL || "";
export default async function Page() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const res = await fetch(`${url}/api/notification`, {
    headers: {
      Cookie: `access-token=${cookie?.value}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <>
      <Header label="Notifications" />
      <NotificationsFeed notifications={data} />
    </>
  );
}
