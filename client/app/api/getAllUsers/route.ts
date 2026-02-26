import API_BASE_URL from "@/app/_lib/api";

export async function GET() {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/users`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`HTTP ERROR, status code: ${response.status}`);
  }
  const data = await response.json();
  return Response.json(data.users);
}
