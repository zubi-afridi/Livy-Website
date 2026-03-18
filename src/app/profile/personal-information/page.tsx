import PersonalInfoHeader from "@/components/profile/personal-information/PersonalInfoHeader";
import ProfileAvatarUpload from "@/components/profile/personal-information/ProfileAvatarUpload";
import PersonalInformationForm from "@/components/profile/personal-information/PersonalInformationForm";

export default function PersonalInformationPage() {
  return (
    <div>
      <PersonalInfoHeader />
      <ProfileAvatarUpload />
      <PersonalInformationForm />
    </div>
  );
}
