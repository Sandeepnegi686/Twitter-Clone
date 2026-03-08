import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ postId: string }>;
  },
) {
  const postId = (await params).postId;
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  const response = await fetch(
    `${API_BASE_URL}/api/v1/post/getPostById/${postId}`,
    {
      headers: {
        Cookie: `access-token=${cookie?.value}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json(null, { status: 401 });
  }
  const data = await response.json();
  return Response.json(data.post);
}
