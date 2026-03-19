export type AppLanguage = "EN" | "pt-BR";

export const LANGUAGE_STORAGE_KEY = "livy_language";

export const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];

export const isAuthRoute = (pathname: string | null): boolean => {
  if (!pathname) return false;
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};
