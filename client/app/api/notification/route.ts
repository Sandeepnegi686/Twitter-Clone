import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/notification/get-notification-by-user`,
    {
      headers: {
        Cookie: `access-token=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }

  const data = await response.json();
  return Response.json(data.notifications);
}

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(`${API_BASE_URL}/api/v1/notification/create`, {
    headers: {
      Cookie: `access-token=${cookie?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  return Response.json(data);
}

export async function DELETE() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/notification/clearNotification`,
    {
      headers: {
        Cookie: `access-token=${cookie?.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: "DELETE",
    },
  );

  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }

  const data = await response.json();
  return Response.json(data);
}
