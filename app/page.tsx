import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AiCompatibility from "@/components/AiCompatibility";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

const ParticleField = dynamic(() => import("@/components/ParticleField"));

export default function Home() {
  return (
    <>
      {/* Global animated background — fixed behind everything */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          density={0.07}
          linkDistance={140}
          mouseRadius={180}
          speed={0.20}
          color="#e07a54"
        />
      </div>

      {/* Site content above the particle field */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Problem />
          <Solution />
          <Features />
          <HowItWorks />
          <AiCompatibility />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  );
}
