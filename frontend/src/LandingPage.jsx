import * as React from "react";
import Header from "./components/Header";
import { HeroSection } from "./content/HeroSection";
import FeatureCards from "./content/FeatureCards";
import "./App.js";
import Footer from "./components/Footer";
import App from "./App.js";

function LandingPage() {
  return (
    <main className="flex overflow-hidden flex-col bg-[#edf7fd] max-w-full">
        <Header />
        <div className="flex flex-col w-full max-md:max-w-full">
          <HeroSection />
          <FeatureCards />
          <App />
        </div>
        <Footer />
    </main>
  );
}

export default LandingPage;
