import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Explore from "@/components/Explore";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <Explore />
    </div>
  );
}
