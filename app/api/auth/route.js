import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "XMIKI" && password === "XMIKI222") {
    const token = await signToken({ username });
    
    const response = NextResponse.json({ success: true });
    
    // Set HTTP Only Cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
