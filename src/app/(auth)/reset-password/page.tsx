import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/forms/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <AuthCard
        title="Set New Password"
        subtitle="Choose a strong password to secure your account."
      >
        <ResetPasswordForm />
      </AuthCard>
    </AuthShell>
  );
}
