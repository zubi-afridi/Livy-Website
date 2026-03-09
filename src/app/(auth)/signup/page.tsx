import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/forms/SignupForm";

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthCard
        title="Create Your Account"
        subtitle="Start booking stays, manage trips, and unlock your rental with digital access."
      >
        <SignupForm />
      </AuthCard>
    </AuthShell>
  );
}
