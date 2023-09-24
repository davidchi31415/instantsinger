import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingContact } from "@/components/landing-contact";

const LandingPage = () => {
  return (
    <div className="pt-12 bg-white">
      <LandingHero />
      <LandingContent />
      <LandingContact />
    </div>
  )
}

export default LandingPage;