import dynamic from 'next/dynamic';
import HeroSection from "@/components/explore/HeroSection";
import ExploreNavbar from "@/components/explore/ExploreNavbar";
import MarqueeDivider from "@/components/explore/MarqueeDivider";

const HorizontalGallery = dynamic(() => import("@/components/explore/HorizontalGallery"));
const FinaleSection = dynamic(() => import("@/components/explore/FinaleSection"));

export default function Explore() {
  return (
    <main className="relative w-full bg-[var(--background)]">
      <ExploreNavbar />
      <HeroSection />
      <MarqueeDivider />
      <HorizontalGallery />
      <FinaleSection />
    </main>
  );
}
