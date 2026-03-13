import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const cookie = (await cookieStore).get("access-token");
  const body = await req.json();
  const response = await fetch(`${API_BASE_URL}/api/v1/comment/create`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Cookie: `access-token=${cookie?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
