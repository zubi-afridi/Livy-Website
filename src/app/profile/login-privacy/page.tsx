import LoginPrivacyHeader from "@/components/profile/login-privacy/LoginPrivacyHeader";
import ChangePasswordForm from "@/components/profile/login-privacy/ChangePasswordForm";
import DeleteAccountSection from "@/components/profile/login-privacy/DeleteAccountSection";

export default function LoginPrivacyPage() {
  return (
    <div>
      <LoginPrivacyHeader />
      <ChangePasswordForm />
      <DeleteAccountSection />
    </div>
  );
}
