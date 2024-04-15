import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import * as jose from "jose";

export async function middleware(req) {
  try {
    const res = NextResponse.next();
    const pathname = req.nextUrl.pathname;
    const accessToken = getCookie("access_token", { res, req });

    if (!accessToken && pathname.includes("/confirm-booking")) {
      return NextResponse.redirect(new URL("/auth?s=login", req.url));
    }

    if (!accessToken && pathname.includes("/auth")) {
      return NextResponse.next();
    }

    if (!accessToken && pathname.includes("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const secret = process.env.JWT_KEY;

    if (!secret) {
      console.error("Error checking authentication:", error);

      return NextResponse.redirect(new URL("/error", req.url));
    }

    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jose.jwtVerify(accessToken, secretKey);

    console.log(payload);

    if (pathname.includes("/admin/dashboard") && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (payload.id) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error checking authentication:", error);

    return NextResponse.redirect(new URL("/error", req.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard", "/auth"],
};
