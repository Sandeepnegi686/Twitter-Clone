import API_BASE_URL from "@/app/_lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();

  const cookie = res.headers.get("set-cookie");

  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie || "",
    },
  });
}
