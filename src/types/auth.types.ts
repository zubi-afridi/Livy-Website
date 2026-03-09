// ─── Request Payloads ───────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  otp: string;
  email?: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

// ─── Response Types ─────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
  message?: string;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}
