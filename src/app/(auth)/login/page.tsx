import AuthShell from "@/components/auth/AuthShell";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthShell>
        <AuthCard
          title="Welcome"
          subtitle="Login to access your bookings, trip details, and smart-lock check-in."
        >
          <LoginForm />
        </AuthCard>
      </AuthShell>
    </>
  );
}
