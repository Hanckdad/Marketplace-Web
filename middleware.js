import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Hanya proteksi route /admin (kecuali /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value;
    
    const verified = token ? await verifyToken(token) : null;

    if (!verified) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
