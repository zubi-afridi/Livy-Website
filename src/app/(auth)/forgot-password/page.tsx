import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email to reset your account access."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthShell>
  );
}
