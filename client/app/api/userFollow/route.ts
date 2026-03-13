import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";

export async function PUT(req: Request) {
  const body = await req.json();
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(`${API_BASE_URL}/api/v1/user/follow-user`, {
    body: JSON.stringify(body),
    method: "PUT",
    headers: {
      Cookie: `access-token=${cookie?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json(null, { status: 400 });
  }

  const data = await response.json();
  return Response.json(data, { status: 200 });
}

export async function DELETE(req: Request) {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const body = await req.json();
  const response = await fetch(`${API_BASE_URL}/api/v1/user/follow-user`, {
    body: JSON.stringify(body),
    method: "DELETE",
    headers: {
      Cookie: `access-token=${cookie?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json(null, { status: 400 });
  }

  const data = await response.json();
  return Response.json(data, { status: 200 });
}
