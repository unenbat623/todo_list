import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname === "/";
  const isOnAuth = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";

  if (isOnDashboard) {
    if (isLoggedIn) return;
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isOnAuth) {
    if (!isLoggedIn) return;
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
