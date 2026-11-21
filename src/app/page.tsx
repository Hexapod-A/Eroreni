import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero, FactStrip } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { IdeaTabs } from "@/components/landing/IdeaTabs";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Budget } from "@/components/landing/Budget";
import { HandOver } from "@/components/landing/HandOver";
import { UseCases, StartPoints, Faq, CtaBand } from "@/components/landing/Sections";
import { FAQ_ITEMS } from "@/components/landing/faq";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FactStrip />
        <Features />
        <IdeaTabs />
        <HowItWorks />
        <section id="budget" className="section-y">
          <div className="container-x">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p data-reveal className="eyebrow">Your budget</p>
              <h2 data-reveal className="h-section mt-4">Your budget sets the size. Not the dream.</h2>
              <p data-reveal className="mt-4 text-[17px] text-ink-2">You tell us what you can spend. We shape the work to fit it.</p>
            </div>
            <Budget />
            <div className="mt-20 sm:mt-24">
              <HandOver />
            </div>
          </div>
        </section>
        <UseCases />
        <StartPoints />
        <Faq items={FAQ_ITEMS} />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
