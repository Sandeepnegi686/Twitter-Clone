import API_BASE_URL from "@/app/_lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  const cookie = res.headers.get("set-cookie");

  const response = NextResponse.redirect(new URL("/", process.env.DOMAIN_URL));

  if (cookie) {
    response.headers.set("Set-Cookie", cookie);
  }

  return response;
}
