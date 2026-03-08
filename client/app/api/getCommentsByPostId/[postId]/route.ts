import API_BASE_URL from "@/app/_lib/api";
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
  const response = await fetch(
    `${API_BASE_URL}/api/v1/comment/getCommentsByPostId/${postId}`,
  );

  if (!response.ok) {
    return Response.json(null, { status: 401 });
  }
  const data = await response.json();
  return Response.json(data.comments);
}
