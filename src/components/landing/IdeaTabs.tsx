"use client";

import Link from "next/link";
import { useState } from "react";

const EXAMPLES: { id: string; label: string; lines: string[] }[] = [
  {
    id: "food",
    label: "Food",
    lines: [
      "idea     Zobo drinks for offices",
      "stage    I have an idea",
      "budget   ₦50,000 to ₦150,000",
      "",
      "1  Brand name and logo",
      "2  Bottle label design",
      "3  Order flow on WhatsApp",
      "4  First posts for Instagram and TikTok",
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    lines: [
      "idea     Ankara bags for students",
      "stage    I have notes",
      "budget   ₦20,000 to ₦50,000",
      "",
      "1  Brand name and look",
      "2  Product photo plan",
      "3  Instagram page set up",
      "4  Simple order message for buyers",
    ],
  },
  {
    id: "app",
    label: "App",
    lines: [
      "idea     App to book local tutors",
      "stage    I am stuck",
      "budget   ₦150,000 to ₦500,000",
      "",
      "1  Plan of the first version",
      "2  Build of the core screens",
      "3  Landing page and sign-up",
      "4  Plan to find the first users",
    ],
  },
  {
    id: "service",
    label: "Service",
    lines: [
      "idea     Home cleaning in my city",
      "stage    I have a product, no buyers",
      "budget   Under ₦20,000",
      "",
      "1  Simple price list",
      "2  One page that says what you do",
      "3  Message to send to first buyers",
      "4  Next steps when money allows",
    ],
  },
];

const IDEAS = [
  "Food brand", "Fashion line", "Mobile app", "Online shop", "Course", "Event business", "Farm product",
  "Beauty brand", "Delivery service", "Podcast", "Cleaning service", "Software tool", "Tutoring", "Photo studio",
];

export function IdeaTabs() {
  const [tab, setTab] = useState(EXAMPLES[0].id);
  const cur = EXAMPLES.find((s) => s.id === tab) ?? EXAMPLES[0];

  return (
    <section id="ideas" className="section-y overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p data-reveal className="eyebrow">Ideas we build</p>
          <h2 data-reveal className="h-section mt-4">Any idea. One clear path.</h2>
          <p data-reveal className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-2">
            Food, fashion, apps, services or content. If you can say it in your own words, we can plan it with you. Your budget
            decides which parts we build first.
          </p>
        </div>
        <div data-reveal className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-ink bg-ink shadow-[0_30px_60px_-36px_rgba(14,15,12,0.6)]">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2 py-2">
              <div role="tablist" aria-label="Example ideas" className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]">
                {EXAMPLES.map((s) => (
                  <button
                    key={s.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === s.id}
                    onClick={() => setTab(s.id)}
                    className={`shrink-0 rounded-md px-3 py-1.5 text-[13px] transition-[background-color,color,transform,translate,scale] duration-200 active:scale-95 ${tab === s.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/85"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <Link
                href="/start"
                className="shrink-0 rounded-md border border-white/15 px-3 py-1.5 text-[12px] text-white/70 transition-[background-color,border-color,color,transform,translate,scale] duration-200 hover:border-lime hover:bg-lime hover:text-ink active:scale-95"
              >
                Share yours
              </Link>
            </div>
            <pre key={cur.id} className="fade-in min-h-[236px] overflow-x-auto whitespace-pre-wrap break-words p-5 font-mono text-[13px] leading-6 text-white/85">
              <code>
                {cur.lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="mr-4 inline-block w-4 shrink-0 select-none text-right text-white/25">{i + 1}</span>
                    <span className={`min-w-0 ${i > 3 ? "text-lime/90" : ""}`}>{line || " "}</span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <p className="mt-3 text-xs text-muted">These are examples. We agree the real plan with you on WhatsApp.</p>
        </div>
      </div>
      <div data-reveal className="marquee relative mt-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max gap-3">
          {[...IDEAS, ...IDEAS].map((t, i) => (
            <span
              key={i}
              aria-hidden={i >= IDEAS.length}
              className="whitespace-nowrap rounded-full border border-line-2 bg-card px-4 py-2 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
