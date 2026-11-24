import { CapabilitiesAccordion } from "@/components/sections/CapabilitiesAccordion";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { KineticMarquee } from "@/components/sections/KineticMarquee";
import { Navbar } from "@/components/sections/Navbar";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { StudioManifesto } from "@/components/sections/StudioManifesto";

export default function HomePage() {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy-deep focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido-principal">
        <HeroSection />
        <ProjectsShowcase />
        <ProductsSection />
        <CapabilitiesAccordion />
        <KineticMarquee />
        <StudioManifesto />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
