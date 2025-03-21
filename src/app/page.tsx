/* eslint-disable @typescript-eslint/no-unused-vars */

import ArtworkShowcase from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { CTASection } from "../components/CTA";
import Section from "@/components/Section";
import { TestimonialsSection } from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import CommissionProcess from "@/components/CommisionProcess";
export default function Home() {
  return (
    <main>
    <Section />
    <ArtworkShowcase />
    <AboutSection />
    <CommissionProcess />
    <TestimonialsSection />
    <CTASection />
    <Footer />
    </main>
  );
}
