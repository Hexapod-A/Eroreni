"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AREAS, BUDGETS, SITE, STAGES, STEP_LABELS, TIMING, labelOf, whatsappLink } from "@/lib/config";
import { IconArrow, IconCheck, IconChat } from "@/components/landing/Icons";

type Draft = {
  idea: string;
  stage: string;
  help: string[];
  docs: string;
  budget: string;
  timing: string;
  name: string;
};

const EMPTY: Draft = { idea: "", stage: "", help: [], docs: "", budget: "", timing: "", name: "" };
const KEY = "ero-re-ni-draft-v1";
const MAX_IDEA = 900;
const LAST = STEP_LABELS.length; // index of the recap screen

const DOCS = [
  { id: "yes", title: "Yes, I have some", hint: "I will send them in the chat." },
  { id: "no", title: "No, not yet", hint: "I only have the idea in my head." },
] as const;

function valid(step: number, d: Draft): boolean {
  switch (step) {
    case 0: return d.idea.trim().length >= 10;
    case 1: return d.stage !== "";
    case 2: return d.help.length > 0;
    case 3: return d.docs !== "";
    case 4: return d.budget !== "";
    case 5: return d.name.trim().length >= 2;
    default: return true;
  }
}

function helpText(ids: string[]): string {
  if (ids.includes("unsure")) return "I am not sure yet";
  return ids.map((id) => AREAS.find((a) => a.id === id)?.title ?? "").filter(Boolean).join(", ");
}

function buildMessage(d: Draft): string {
  const lines = [
    `Hello Èrò rẹ ni. My name is ${d.name.trim()}.`,
    "",
    "My idea:",
    d.idea.trim(),
    "",
    `Where I am: ${labelOf(STAGES, d.stage)}`,
    `Help I need: ${helpText(d.help)}`,
    `Notes or documents: ${d.docs === "yes" ? "Yes, I will send them here" : "Not yet"}`,
    `My budget: ${labelOf(BUDGETS, d.budget)}`,
  ];
  if (d.timing) lines.push(`I want to start: ${labelOf(TIMING, d.timing)}`);
  return lines.join("\n");
}

function Option({ on, onClick, title, hint, multi = false }: { on: boolean; onClick: () => void; title: string; hint?: string; multi?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`group flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-[transform,translate,scale,border-color,background-color] duration-200 active:scale-[0.985] ${
        on ? "border-ink bg-paper" : "border-line-2 bg-card hover:-translate-y-0.5 hover:border-ink/50"
      }`}
    >
      <span>
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {hint && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{hint}</span>}
      </span>
      <span
        aria-hidden
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors ${multi ? "rounded-md" : "rounded-full"} ${on ? "border-ink bg-ink text-lime" : "border-line-2 text-transparent"}`}
      >
        <IconCheck className="h-3 w-3" />
      </span>
    </button>
  );
}

export function IdeaFlow() {
  const [d, setD] = useState<Draft>(EMPTY);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  // Load a saved draft and a stage chosen on the home page. Storage can fail, so every call is guarded.
  useEffect(() => {
    let next = EMPTY;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) next = { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) };
    } catch {
      /* no saved draft: start fresh */
    }
    try {
      const s = new URLSearchParams(window.location.search).get("stage");
      if (s && STAGES.some((x) => x.id === s)) next = { ...next, stage: s };
    } catch {
      /* ignore a bad query string */
    }
    setD(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(d));
    } catch {
      /* private mode or blocked storage: the flow still works */
    }
  }, [d, ready]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const go = (n: number) => {
    setDir(n >= step ? "fwd" : "back");
    setStep(n);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const ok = valid(step, d);
  const message = useMemo(() => (step === LAST ? buildMessage(d) : ""), [step, d]);
  const wa = whatsappLink(message);

  const toggleHelp = (id: string) =>
    setD((p) => {
      if (id === "unsure") return { ...p, help: p.help.includes("unsure") ? [] : ["unsure"] };
      const without = p.help.filter((x) => x !== "unsure");
      return { ...p, help: without.includes(id) ? without.filter((x) => x !== id) : [...without, id] };
    });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the message stays visible to copy by hand */
    }
  };

  const pct = Math.round((Math.min(step, LAST) / LAST) * 100);

  const recap: { label: string; value: string; at: number }[] = [
    { label: "Idea", value: d.idea.trim(), at: 0 },
    { label: "Where you are", value: labelOf(STAGES, d.stage), at: 1 },
    { label: "Help you need", value: helpText(d.help), at: 2 },
    { label: "Documents", value: d.docs === "yes" ? "I will send them in the chat" : d.docs === "no" ? "Not yet" : "", at: 3 },
    { label: "Budget", value: labelOf(BUDGETS, d.budget), at: 4 },
    { label: "Start", value: labelOf(TIMING, d.timing), at: 4 },
    { label: "Name", value: d.name.trim(), at: 5 },
  ];

  return (
    <div ref={top} className="scroll-mt-24">
      {/* Progress */}
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{step < LAST ? `Step ${step + 1} of ${LAST} · ${STEP_LABELS[step]}` : "Check and send"}</p>
          <p className="font-mono text-[12px] text-muted">{pct}%</p>
        </div>
        <div className="mt-3 flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={LAST} aria-valuenow={Math.min(step, LAST)} aria-label="Progress">
          {STEP_LABELS.map((l, i) => (
            <span key={l} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <span className={`block h-full rounded-full bg-ink transition-[width] duration-500 ease-out ${i < step ? "w-full" : i === step ? "w-1/2" : "w-0"}`} />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl gap-4 lg:grid-cols-[1.45fr_1fr]">
        {/* Question */}
        <div className="card relative flex min-h-[420px] flex-col p-6 sm:p-8">
          <div key={step} className={`flex flex-1 flex-col ${dir === "fwd" ? "step-fwd" : "step-back"}`}>
            {step === 0 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">What is your idea?</h2>
                <p className="mt-2 text-[15px] text-ink-2">Write it in your own words. Short is fine. It does not need to be perfect.</p>
                <textarea
                  value={d.idea}
                  onChange={(e) => set("idea", e.target.value.slice(0, MAX_IDEA))}
                  rows={7}
                  autoFocus
                  placeholder="I want to..."
                  aria-label="Your idea"
                  className="input mt-5 h-auto min-h-[170px] resize-y py-3 leading-relaxed"
                />
                <p className="mt-2 text-right font-mono text-[11px] text-muted">{d.idea.length}/{MAX_IDEA}</p>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">Where are you now?</h2>
                <p className="mt-2 text-[15px] text-ink-2">Pick the one that is closest to you.</p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {STAGES.map((s) => (
                    <Option key={s.id} on={d.stage === s.id} onClick={() => set("stage", s.id)} title={s.title} hint={s.hint} />
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">What help do you need?</h2>
                <p className="mt-2 text-[15px] text-ink-2">Pick all that apply.</p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {AREAS.map((a) => (
                    <Option key={a.id} multi on={d.help.includes(a.id)} onClick={() => toggleHelp(a.id)} title={a.title} hint={a.text} />
                  ))}
                  <div className="sm:col-span-2">
                    <Option multi on={d.help.includes("unsure")} onClick={() => toggleHelp("unsure")} title="I am not sure" hint="We can work it out together." />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">Do you have notes or documents?</h2>
                <p className="mt-2 text-[15px] text-ink-2">Plans, drawings, lists or anything you wrote down. They help us, but you do not need them.</p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {DOCS.map((o) => (
                    <Option key={o.id} on={d.docs === o.id} onClick={() => set("docs", o.id)} title={o.title} hint={o.hint} />
                  ))}
                </div>
                <p className="mt-4 rounded-lg bg-paper px-3.5 py-3 text-[13px] leading-relaxed text-muted">
                  After you send your recap, share your files in the WhatsApp chat. Photos, PDFs and voice notes all work.
                </p>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">What can you spend to start?</h2>
                <p className="mt-2 text-[15px] text-ink-2">Be honest. We shape the work to fit your number.</p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {BUDGETS.map((b) => (
                    <Option key={b.id} on={d.budget === b.id} onClick={() => set("budget", b.id)} title={b.label} />
                  ))}
                </div>
                <p className="mt-6 text-[13px] font-medium text-ink-2">When do you want to start? <span className="font-normal text-muted">(optional)</span></p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMING.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={d.timing === t.id}
                      onClick={() => set("timing", d.timing === t.id ? "" : t.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition-[border-color,background-color,color,transform,translate,scale] duration-200 active:scale-95 ${
                        d.timing === t.id ? "border-ink bg-ink text-white" : "border-line-2 bg-card text-ink-2 hover:border-ink"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">What should we call you?</h2>
                <p className="mt-2 text-[15px] text-ink-2">We use your name in the chat. Nothing else.</p>
                <label htmlFor="name" className="label mt-5">Your name</label>
                <input
                  id="name"
                  value={d.name}
                  onChange={(e) => set("name", e.target.value.slice(0, 60))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && ok) go(LAST);
                  }}
                  autoComplete="given-name"
                  autoFocus
                  placeholder="Your first name"
                  className="input"
                />
              </>
            )}

            {step === LAST && (
              <>
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">Check and send</h2>
                <p className="mt-2 text-[15px] text-ink-2">
                  This opens WhatsApp with your message ready. You press send. We reply there.
                </p>
                <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
                  {recap.filter((r) => r.value).map((r) => (
                    <div key={r.label} className="flex items-start justify-between gap-4 px-4 py-3">
                      <div className="min-w-0">
                        <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{r.label}</dt>
                        <dd className="mt-0.5 whitespace-pre-wrap break-words text-[15px] text-ink">{r.value}</dd>
                      </div>
                      <button type="button" onClick={() => go(r.at)} className="shrink-0 text-[13px] text-muted link-u hover:text-ink">Edit</button>
                    </div>
                  ))}
                </dl>

                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-accent btn-lg group mt-6 w-full">
                    <IconChat className="h-4 w-4" />
                    Send to Èrò rẹ ni on WhatsApp
                    <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <div className="mt-6 rounded-xl border border-line bg-warn-bg px-4 py-3 text-[14px] text-warn">
                    The WhatsApp number is not set yet. Copy your message below and send it to us.
                  </div>
                )}
                <button
                  type="button"
                  onClick={copy}
                  className={`btn-ghost mt-3 w-full ${copied ? "border-accent text-accent" : ""}`}
                >
                  {copied ? "Copied" : "Copy my message"}
                </button>
                {SITE.email && (
                  <p className="mt-3 text-center text-[13px] text-muted">
                    Or write to <a className="link-u text-ink-2" href={`mailto:${SITE.email}?subject=${encodeURIComponent("My idea")}&body=${encodeURIComponent(message)}`}>{SITE.email}</a>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Controls */}
          {step < LAST && (
            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-ghost disabled:invisible">
                Back
              </button>
              <button type="button" onClick={() => go(step + 1)} disabled={!ok} className="btn-primary group">
                {step === LAST - 1 ? "Review" : "Next"}
                <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
          {step === LAST && (
            <button type="button" onClick={() => go(LAST - 1)} className="mt-6 self-start text-[14px] text-muted link-u hover:text-ink">
              Back
            </button>
          )}
        </div>

        {/* Live recap: fills in as you answer. */}
        <aside className="relative hidden overflow-hidden rounded-2xl border border-ink bg-ink p-6 text-white lg:block">
          <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Your recap</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-lime"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />Draft</span>
            </div>
            <ul className="mt-5 space-y-3">
              {recap.filter((r) => r.label !== "Start").map((r) => (
                <li key={r.label} className={`rounded-lg border px-3 py-2.5 transition-colors duration-300 ${r.value ? "border-white/15 bg-white/[0.05]" : "border-white/10 border-dashed"}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{r.label}</p>
                  <p className={`mt-1 line-clamp-3 break-words text-[13px] ${r.value ? "text-white/85" : "text-white/25"}`}>{r.value || "..."}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
