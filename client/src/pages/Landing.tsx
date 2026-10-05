import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroExperience from "../components/landing/HeroExperience";
import Features from "../components/landing/Features";
import CaseStudies from "../components/landing/CaseStudies";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6f1] text-[#111111]">
      <Navbar />

      <main>
        <HeroExperience />

        <Features />

        <CaseStudies />

        {/* More sections will come here */}
      </main>

      <Footer />
    </div>
  );
}