import API_BASE_URL from "@/app/_lib/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access-token");
  await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `access-token=${cookie?.value}`,
    },
    cache: "no-store",
  });

  const response = NextResponse.redirect(new URL("/", process.env.DOMAIN_URL));

  return response;
}
