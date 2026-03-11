import API_BASE_URL from "@/app/_lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "GET",
    credentials: "include",
  });

  const response = NextResponse.redirect(new URL("/", process.env.DOMAIN_URL));

  response.cookies.set("access-token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
