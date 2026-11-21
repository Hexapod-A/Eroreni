"use client";

import Link from "next/link";
import { useState } from "react";
import { AREAS, BUDGETS } from "@/lib/config";
import { IconArrow, IconCheck, IconChat, IconPen } from "./Icons";

const BANDS = BUDGETS.filter((b) => b.coverage > 0);

const SMALL = [
  "We pick the one or two parts that matter most",
  "We build those parts well",
  "You see the plan for the rest",
  "You can add more parts later",
];
const BIG = [
  "We cover more of the six areas",
  "Product, pages, posts and sales plan together",
  "A clear path to your first buyers",
  "Hand-over so you can run it alone",
];

export function Budget() {
  const [idx, setIdx] = useState(2);
  const band = BANDS[idx];

  return (
    <div>
      {/* Example: pick a band and see how many of the six areas it can cover. */}
      <div data-reveal className="mx-auto max-w-3xl rounded-2xl border border-line bg-card p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-ink-2">See what a budget can cover</p>
          <p className="rounded-full bg-paper px-3 py-1 font-mono text-sm font-semibold">{band.short}</p>
        </div>
        <input
          type="range"
          min={0}
          max={BANDS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          aria-label="Budget"
          className="mt-5 w-full cursor-pointer accent-[#145c3a]"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
          {BANDS.map((b, i) => (
            <button key={b.id} type="button" onClick={() => setIdx(i)} className={`rounded px-1 py-0.5 transition-colors hover:text-ink ${i === idx ? "text-ink" : ""}`}>
              {b.short}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {AREAS.map((a, i) => {
            const on = i < band.coverage;
            return (
              <div key={a.id} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-300 ${on ? "border-ink bg-paper" : "border-line bg-paper/60"}`}>
                <p className={`text-sm font-medium transition-colors ${on ? "text-ink" : "text-muted"}`}>{a.short}</p>
                <span className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-ink text-lime" : "border border-line-2 text-transparent"}`}>
                  <IconCheck className="h-3 w-3" />
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">This is an example only. We agree the real scope and price with you on WhatsApp.</p>
      </div>

      {/* Two ways we scope the work. */}
      <div data-reveal-stagger className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        {[
          { dark: false, title: "A small budget", text: "Small budget, real work. We build the part that matters most.", feats: SMALL, cta: "Start small" },
          { dark: true, title: "A bigger budget", text: "More budget means more of the business built with you.", feats: BIG, cta: "Build more" },
        ].map((p) => (
          <div
            key={p.title}
            data-reveal
            className={`group relative flex flex-col rounded-2xl border p-7 transition-[transform,translate,scale,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 sm:p-8 ${
              p.dark ? "border-ink bg-ink text-white hover:shadow-[0_30px_60px_-30px_rgba(14,15,12,0.7)]" : "border-line bg-card hover:border-ink/30 hover:shadow-[0_24px_48px_-28px_rgba(14,15,12,0.35)]"
            }`}
          >
            {p.dark && <span className="absolute right-6 top-6 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">Most built</span>}
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${p.dark ? "bg-white/10 text-lime" : "bg-paper text-accent"}`}>
              {p.dark ? <IconChat /> : <IconPen />}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
            <p className={`mt-1 text-[15px] ${p.dark ? "text-white/60" : "text-muted"}`}>{p.text}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="text-[34px] font-semibold leading-none tracking-[-0.04em] sm:text-[40px]">Your budget</span>
            </p>
            <p className={`mt-2 text-sm ${p.dark ? "text-white/50" : "text-muted"}`}>We agree the price with you before work starts.</p>
            <ul className="mt-7 flex-1 space-y-3 text-[15px]">
              {p.feats.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.dark ? "bg-lime text-ink" : "bg-ok-bg text-accent"}`}>
                    <IconCheck className="h-3 w-3" />
                  </span>
                  <span className={p.dark ? "text-white/85" : "text-ink-2"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/start" className={`${p.dark ? "btn-lime" : "btn-primary"} group/btn mt-8 w-full`}>
              {p.cta}
              <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
      <p data-reveal className="mt-6 text-center text-sm text-muted">
        You tell us what you can spend. If it is too low for what you want, we talk and change the scope to fit.
      </p>
    </div>
  );
}
