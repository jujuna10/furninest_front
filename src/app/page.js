import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Explore from "@/components/Explore";
import PopularProdcuts from "@/components/PopularProdcuts";
import RoomsSetup from "@/components/RoomsSetup";
import Info from "@/components/Info";
import Clients from "@/components/Clients";
import Offer from "@/components/Offer";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-12">
      <Header />
      <HeroSection />
      <Explore />
      <PopularProdcuts />
      <RoomsSetup />
      <Info />
      <Clients />
      <Offer />
    </div>
  );
}
