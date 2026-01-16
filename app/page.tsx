"use client";

import { useState, useEffect } from "react";
import { LandingNavbar } from "@/app/landing/components/Landing_Navbar";
import { HeroSection } from "@/app/landing/components/Hero_Section";
import { FeaturesSection } from "./landing/components/Features_Section";
import { Footer } from "./landing/components/Footer";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-[#FFF3EC] to-[#FFE6D3] text-black">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
