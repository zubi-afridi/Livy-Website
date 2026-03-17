import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ONLY_ROUTES = ["/login", "/signup"];
const OTP_FLOW_ROUTES = ["/verify-otp"];
const RESET_FLOW_ROUTES = ["/reset-password"];
const PROTECTED_ROUTES = ["/bookings", "/favorites", "/profile"];

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("livy_token")?.value;
  const otpFlow = request.cookies.get("livy_otp_flow")?.value;

  const isAuthenticated = Boolean(token);
  const hasOtpFlow = Boolean(otpFlow);
  const hasForgotPasswordFlow = otpFlow === "forgotPassword";

  if (isAuthOnly(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isOtpFlow(pathname) && !hasOtpFlow) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isResetFlow(pathname) && !hasForgotPasswordFlow) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isProtected(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|images|fonts).*)"],
};
