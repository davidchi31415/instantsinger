"use client";

import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingContact } from "@/components/landing-contact";
import useAmplitudeInit from "@/hooks/use-amplitude";

const LandingPage = () => {
  useAmplitudeInit();

  return (
    <div className="pt-12 bg-white">
      <LandingHero />
      <LandingContent />
      <LandingContact />
    </div>
  )
}

export default LandingPage;