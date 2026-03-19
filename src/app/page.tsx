import Footer from "@/components/layout/FooterLanding";

import Header from "@/components/layout/Header";
import TravelSearchBar from "@/components/layout/TravelSearchBar";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import PropertyCards from "@/components/sections/PropertyCards";

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TravelSearchBar />
      <AboutSection />
      <PropertyCards maxSections={3} />
      <Footer />
    </>
  );
};

export default page;
