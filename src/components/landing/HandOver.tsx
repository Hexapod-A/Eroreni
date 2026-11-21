import Link from "next/link";
import { IconArrow, IconBook, IconCheck, IconEye, IconUsers } from "./Icons";

const PHASES = [
  { n: "01", t: "We build", d: "We do the work and show you each part as it is done.", icon: <IconEye />, dark: false, tag: "" },
  { n: "02", t: "We show you", d: "We explain how it works, in simple words, so you know every part.", icon: <IconBook />, dark: true, tag: "Most important" },
  { n: "03", t: "You take over", d: "Everything is yours. You run it. You can still ask us questions.", icon: <IconUsers />, dark: false, tag: "" },
];

const KEEP = [
  "Every account and file is in your name",
  "A short guide in simple words",
  "A list of next steps",
  "A clear picture of what we built",
];

const NEED = ["Your idea in your own words", "Any notes or documents you have", "Your budget", "A little time to answer our questions"];

export function HandOver() {
  return (
    <div id="hand-over" className="mx-auto max-w-5xl scroll-mt-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p data-reveal className="eyebrow">Hand-over</p>
        <h2 data-reveal className="h-section mt-4">We build it. Then it is yours.</h2>
        <p data-reveal className="mt-4 text-[17px] text-ink-2">
          Our work ends when you can run the business alone. You do not stay tied to us.
        </p>
      </div>

      <div data-reveal-stagger className="grid gap-4 md:grid-cols-3">
        {PHASES.map((p) => (
          <div
            key={p.n}
            data-reveal
            className={`relative flex flex-col rounded-2xl border p-7 transition-[transform,translate,scale,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 ${
              p.dark ? "border-ink bg-ink text-white hover:shadow-[0_30px_60px_-30px_rgba(14,15,12,0.7)]" : "border-line bg-card hover:border-ink/30 hover:shadow-[0_24px_48px_-28px_rgba(14,15,12,0.35)]"
            }`}
          >
            {p.tag && <span className="absolute right-6 top-6 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">{p.tag}</span>}
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${p.dark ? "bg-white/10 text-lime" : "bg-paper text-accent"}`}>{p.icon}</span>
            <p className={`mt-5 font-mono text-sm ${p.dark ? "text-white/50" : "text-muted"}`}>{p.n}</p>
            <h3 className="mt-1 text-xl font-semibold">{p.t}</h3>
            <p className={`mt-2 text-[15px] leading-relaxed ${p.dark ? "text-white/65" : "text-ink-2"}`}>{p.d}</p>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-4 grid gap-6 rounded-2xl border border-line bg-card p-6 sm:p-7 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">What you keep</p>
          <ul className="mt-3 space-y-3 text-[15px]">
            {KEEP.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok-bg text-accent">
                  <IconCheck className="h-3 w-3" />
                </span>
                <span className="text-ink-2">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">What we need from you</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {NEED.map((c) => (
              <li key={c} className="inline-flex items-center rounded-full border border-line bg-paper px-3 py-1 text-sm">{c}</li>
            ))}
          </ul>
          <Link href="/start" className="btn-ghost group mt-5">
            Share your idea
            <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
