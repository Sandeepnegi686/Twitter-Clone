import toast from "react-hot-toast";
import API_BASE_URL from "./api";

async function sendNotification(body: string, userId: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/notification/create`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ body, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data.success) {
    toast.error(data.error);
    return;
  }
}

export { sendNotification };
