import FloatingBtn from "@/components/layout/FloatingBtn";
import Footer from "@/components/layout/FooterLanding";

import Header from "@/components/layout/Header";
import TravelSearchBar from "@/components/layout/TravelSearchBar";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import PropertyCards from "@/components/sections/PropertyCards";

const page = () => {
  return (
    <>
      <FloatingBtn />
      <Header />
      <div className="pt-30">
        <TravelSearchBar showFilters={true} />
        <PropertyCards maxSections={3} />
      </div>
      <Footer />
    </>
  );
};

export default page;
