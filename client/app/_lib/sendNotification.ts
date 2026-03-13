import toast from "react-hot-toast";

async function sendNotification(body: string, userId: string) {
  const res = await fetch(`/api/notification`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ body, userId }),
  });
  const data = await res.json();
  if (!data.success) {
    toast.error(data.error);
    return;
  }
}

export { sendNotification };
