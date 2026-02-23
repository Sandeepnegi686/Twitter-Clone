import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const accesToken = req.cookies.get("access-token");
  const token = accesToken?.value;
  // console.log(req.nextUrl.pathname);
  // const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
  // if (!isAuthPage && !token) {
  //   return NextResponse.redirect(new URL("/auth", req.url));
  // }
  // if (isAuthPage && token) {
  // }
}

export const config = {
  matcher: ["/notifications", "/users/:path*"],
};
