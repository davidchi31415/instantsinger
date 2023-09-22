import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingPricing } from "@/components/landing-pricing";

const LandingPage = () => {
  return (
    <div className="pt-12 bg-white">
      <LandingHero />
      <LandingContent />
      <LandingPricing />
    </div>
  )
}

export default LandingPage;