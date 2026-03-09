import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Route Config ─────────────────────────────────────────────────────────────

/** Pages only accessible when NOT logged in */
const AUTH_ONLY_ROUTES = ["/login", "/signup"];

/** Pages that require an OTP flow to be active */
const OTP_FLOW_ROUTES = ["/verify-otp"];

/** Pages that require a forgot-password OTP flow specifically */
const RESET_FLOW_ROUTES = ["/reset-password"];

/** Pages that require authentication */
const PROTECTED_ROUTES = ["/bookings", "/favorites", "/profile"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isProtected = (pathname: string) =>
  PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

const isAuthOnly = (pathname: string) =>
  AUTH_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

const isOtpFlow = (pathname: string) =>
  OTP_FLOW_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

const isResetFlow = (pathname: string) =>
  RESET_FLOW_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

// ─── Proxy (Next.js 16+ replaces middleware convention) ───────────────────────
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("livy_token")?.value;
  const otpFlow = request.cookies.get("livy_otp_flow")?.value;

  const isAuthenticated = Boolean(token);
  const hasOtpFlow = Boolean(otpFlow);
  const hasForgotPasswordFlow = otpFlow === "forgotPassword";

  // 1. Authenticated user trying to access login/signup → redirect home
  if (isAuthOnly(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. OTP pages — only accessible if an OTP flow is active
  if (isOtpFlow(pathname) && !hasOtpFlow) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Reset password page — only accessible after forgot-password OTP
  if (isResetFlow(pathname) && !hasForgotPasswordFlow) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Protected pages — must be authenticated
  if (isProtected(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|icons|images|fonts).*)",
  ],
};
