import Image from "next/image";
import HeaderComponent from "./components/HeaderComponent";
import HeroComponent from "./components/HeroComponent";
import InsightsComponent from "./components/InsightsComponent";
import AboutComponent from "./components/AboutComponent";


export default function Home() {
  return (
    <main id="home" className="min-h-screen">
      <HeaderComponent />
      <HeroComponent />
      <InsightsComponent />
      <AboutComponent />
      
    </main>
  );
}
