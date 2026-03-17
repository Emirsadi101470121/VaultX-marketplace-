import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedListings from "@/components/home/FeaturedListings";

const BadgesSection = lazy(() => import("@/components/home/BadgesSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const GlobalTradingSection = lazy(() => import("@/components/home/GlobalTradingSection"));

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedListings />
      <Suspense fallback={null}>
        <BadgesSection />
        <TestimonialsSection />
        <GlobalTradingSection />
      </Suspense>
    </Layout>
  );
}
