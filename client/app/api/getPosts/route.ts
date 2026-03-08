import API_BASE_URL from "@/app/_lib/api";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/api/v1/post/getPosts`);

  if (!response.ok) {
    return Response.json(null, { status: 401 });
  }

  const data = await response.json();
  return Response.json(data.posts);
}
