import API_BASE_URL from "@/app/_lib/api";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/users`);

  if (!response.ok) {
    return Response.json(null, { status: 400 });
  }

  const data = await response.json();
  return Response.json(data.users);
}
