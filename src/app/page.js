import HeaderComponent from "./components/HeaderComponent";
import HeroComponent from "./components/HeroComponent";
import FocusAIComponent from "./components/FocusAIComponent";
import InsightsComponent from "./components/InsightsComponent";
import AboutComponent from "./components/AboutComponent";

export default function Home() {
  return (
    <main id="home" className="min-h-screen overflow-hidden">
      <HeaderComponent />
      <HeroComponent />
      <FocusAIComponent />
      <InsightsComponent />
      <AboutComponent />
    </main>
  );
}
