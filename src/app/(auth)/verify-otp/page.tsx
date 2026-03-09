import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import VerifyOtpForm from "@/components/auth/forms/VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <AuthShell>
      <AuthCard title="Verify OTP" subtitle="Enter OTP sent to your email.">
        <VerifyOtpForm />
      </AuthCard>
    </AuthShell>
  );
}
