import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Explore from "@/components/Explore";
import PopularProdcuts from "@/components/PopularProdcuts";
import RoomsSetup from "@/components/RoomsSetup";

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <Explore />
      <PopularProdcuts />
      <RoomsSetup />
    </div>
  );
}
