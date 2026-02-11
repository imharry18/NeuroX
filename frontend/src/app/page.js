// src/app/page.js
import Hero from "@/components/Hero";
import BrainTumor from "@/components/BrainTumor";
import BloodReport from "@/components/BloodReport";
import ProjectReport from "@/components/ProjectReport";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-300">
      <main className="flex-grow">
        <Hero />
        <BrainTumor />
        <BloodReport />
        <ProjectReport />
        <About />
        <ContactCTA />
      </main>
    </div>
  );
}