import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IdeaFlow } from "@/components/start/IdeaFlow";

export const metadata: Metadata = {
  title: "Share your idea",
  description: "Six short steps. Tell us your idea and your budget. We reply on WhatsApp.",
};

export default function StartPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
        <div className="container-x relative pb-20 pt-12 sm:pb-28 sm:pt-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">Share your idea</p>
            <h1 className="h-section mt-4">Idea in. Business out.</h1>
            <p className="mt-4 text-[17px] text-ink-2">Six short steps. It takes a few minutes. We reply on WhatsApp.</p>
          </div>
          <IdeaFlow />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
