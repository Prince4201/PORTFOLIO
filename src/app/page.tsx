import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import BrainchainLabs from "@/components/BrainchainLabs";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";
import TextMarquee from "@/components/TextMarquee";
import FloatingParticles from "@/components/FloatingParticles";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="mesh-gradient min-h-screen text-white selection:bg-white/30 selection:text-white">
      <Preloader />
      <Navbar />
      <BackToTop />
      <ScrollyCanvas />
      
      {/* Container for content below hero */}
      <div className="relative">
        {/* Sticky particles background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <FloatingParticles />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="relative z-10">
          <SectionDivider text="ABOUT" />
          <About />
          <TextMarquee words={["Full Stack", "AI Builder", "Startup Founder", "Problem Solver", "Brainchain Labs"]} />
          
          <SectionDivider text="SKILLS" />
          <Skills />
          
          <SectionDivider text="BRAINCHAIN" />
          <BrainchainLabs />
          <TextMarquee words={["TOONVERSE-AI", "CreatorFind AI", "SaaS", "Automation", "Machine Learning"]} />
          
          <SectionDivider text="PROJECTS" />
          <Projects />
          
          <SectionDivider text="EVOLVE" />
          <Timeline />
          <Achievements />
          
          <SectionDivider text="CONTACT" />
          <Contact />
        </div>
      </div>
    </main>
  );
}
