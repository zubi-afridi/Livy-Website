import {
  getAllUsers,
  saveUser,
  findUserByEmail,
  updateUserPassword,
  setCurrentUser,
  setToken,
  setAuthCookie,
  setIsLoggedIn,
  setOtpFlowContext,
  getOtpFlowContext,
  clearOtpFlowContext,
} from "@/store/authStore";
import type {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
  AuthResponse,
  MessageResponse,
} from "@/types/auth.types";

const delay = (ms = 600) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const generateToken = (email: string) =>
  btoa(`${email}:${Date.now()}:livy_demo`);

export const signupUser = async (
  payload: SignupPayload,
): Promise<AuthResponse> => {
  await delay();

  const existing = findUserByEmail(payload.email);
  if (existing) {
    throw new Error(
      "An account with this email already exists. Please log in.",
    );
  }

  const newUser = {
    id: generateId(),
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
  };

  saveUser(newUser);

  setOtpFlowContext("signup", payload.email);

  return {
    token: "",
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
    },
    message: "Account created. Please verify your OTP.",
  };
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  await delay();

  const user = findUserByEmail(payload.email);
  if (!user) {
    throw new Error("No account found with this email address.");
  }
  if (user.password !== payload.password) {
    throw new Error("Invalid email or password. Please try again.");
  }

  const token = generateToken(user.email);

  setToken(token);
  setCurrentUser(user);
  setIsLoggedIn(true);
  setAuthCookie(token);

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    },
    message: "Login successful!",
  };
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> => {
  await delay();

  const user = findUserByEmail(payload.email);
  if (!user) {
    throw new Error(
      "No account found with this email address. Please sign up first.",
    );
  }

  setOtpFlowContext("forgotPassword", payload.email);

  return {
    success: true,
    message: "OTP sent to your email address.",
  };
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<MessageResponse> => {
  await delay(400);
  return {
    success: true,
    message: "OTP verified successfully.",
  };
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<MessageResponse> => {
  await delay();

  const ctx = getOtpFlowContext();
  if (!ctx || ctx.flow !== "forgotPassword") {
    throw new Error(
      "Session expired. Please start the forgot password flow again.",
    );
  }

  const updated = updateUserPassword(ctx.email, payload.newPassword);
  if (!updated) {
    throw new Error("Failed to reset password. User not found.");
  }

  clearOtpFlowContext();

  return {
    success: true,
    message: "Password reset successfully. You can now log in.",
  };
};
