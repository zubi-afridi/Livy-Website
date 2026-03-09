// ─── Keys ────────────────────────────────────────────────────────────────────
const USERS_KEY = "livy_users";
const CURRENT_USER_KEY = "livy_current_user";
const TOKEN_KEY = "livy_token";
const IS_LOGGED_IN_KEY = "livy_isLoggedIn";
const OTP_FLOW_KEY = "livy_otp_flow";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string; // stored for demo/practice purposes only
}

export type OtpFlowType = "signup" | "forgotPassword";

export interface OtpFlowContext {
  flow: OtpFlowType;
  email: string;
}

// ─── User Storage ─────────────────────────────────────────────────────────────
export const getAllUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
};

export const saveUser = (user: StoredUser): void => {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): StoredUser | undefined => {
  return getAllUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
};

export const updateUserPassword = (
  email: string,
  newPassword: string,
): boolean => {
  const users = getAllUsers();
  const idx = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (idx === -1) return false;
  users[idx].password = newPassword;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

// ─── Current Session ──────────────────────────────────────────────────────────
export const getCurrentUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: StoredUser): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// ─── Token ────────────────────────────────────────────────────────────────────
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// ─── Cookie helpers for middleware ────────────────────────────────────────────
export const setAuthCookie = (token: string): void => {
  // Set cookie accessible to Next.js middleware (no httpOnly so JS can set it)
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `livy_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

export const clearAuthCookie = (): void => {
  document.cookie = "livy_token=; path=/; max-age=0; SameSite=Lax";
};

// ─── Login State ──────────────────────────────────────────────────────────────
export const setIsLoggedIn = (value: boolean): void => {
  localStorage.setItem(IS_LOGGED_IN_KEY, value ? "1" : "0");
};

export const getIsLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(IS_LOGGED_IN_KEY) === "1";
};

// ─── OTP Flow Context ─────────────────────────────────────────────────────────
export const setOtpFlowContext = (flow: OtpFlowType, email: string): void => {
  const ctx: OtpFlowContext = { flow, email };
  localStorage.setItem(OTP_FLOW_KEY, JSON.stringify(ctx));
  // Also set a cookie so middleware can allow access to /verify-otp & /reset-password
  document.cookie = `livy_otp_flow=${flow}; path=/; max-age=600; SameSite=Lax`; // 10 min
};

export const getOtpFlowContext = (): OtpFlowContext | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OTP_FLOW_KEY);
    return raw ? (JSON.parse(raw) as OtpFlowContext) : null;
  } catch {
    return null;
  }
};

export const clearOtpFlowContext = (): void => {
  localStorage.removeItem(OTP_FLOW_KEY);
  document.cookie = "livy_otp_flow=; path=/; max-age=0; SameSite=Lax";
};

// ─── Full Logout ──────────────────────────────────────────────────────────────
export const clearAllAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(IS_LOGGED_IN_KEY);
  localStorage.removeItem(OTP_FLOW_KEY);
  clearAuthCookie();
  document.cookie = "livy_otp_flow=; path=/; max-age=0; SameSite=Lax";
};
