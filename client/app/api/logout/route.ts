import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/", req.url));

  response.cookies.set("access-token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
