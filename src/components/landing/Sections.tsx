import Link from "next/link";
import { STAGES, SITE, whatsappLink } from "@/lib/config";
import { IconArrow, IconBolt, IconBook, IconChat, IconCode, IconHome, IconPen, IconSearch, IconTag, IconUsers } from "./Icons";

const WHO = [
  { icon: <IconBolt />, t: "First-time dreamers", d: "You have an idea and no plan. We start with you at step one." },
  { icon: <IconTag />, t: "Side hustles", d: "You want to earn more next to your job or school." },
  { icon: <IconSearch />, t: "Stuck projects", d: "You started, then stopped. We find the next step." },
  { icon: <IconUsers />, t: "No buyers yet", d: "Your product exists. We help you find people who pay." },
  { icon: <IconHome />, t: "Small shop owners", d: "You sell in person. We help you sell online too." },
  { icon: <IconPen />, t: "Creators", d: "You make things people like. We help you turn it into income." },
  { icon: <IconBook />, t: "Students", d: "You have an idea and little money. Your budget sets the size." },
  { icon: <IconCode />, t: "Tech ideas", d: "You have an app or tool in mind and need it built." },
];

export function UseCases() {
  return (
    <section id="who" className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="eyebrow">Who it is for</p>
          <h2 data-reveal className="h-section mt-4">Built for real people with real ideas</h2>
          <p data-reveal className="mt-4 text-[17px] text-ink-2">A few of the people we help.</p>
        </div>
        <div data-reveal-stagger className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WHO.map((u) => (
            <div key={u.t} data-reveal className="lift group rounded-2xl border border-line bg-card p-5 hover:border-ink/25">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper text-accent transition-colors duration-300 group-hover:bg-ink group-hover:text-lime">{u.icon}</span>
              <h3 className="mt-4 font-semibold">{u.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{u.d}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-8 text-center text-sm text-muted">
          We do not build anything illegal, or anything that harms people.
        </p>
      </div>
    </section>
  );
}

export function StartPoints() {
  return (
    <section id="start-points" className="section-y border-t border-line bg-card">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p data-reveal className="eyebrow">Starting points</p>
            <h2 data-reveal className="h-section mt-4">Where are you now?</h2>
            <p data-reveal className="mt-4 text-[17px] text-ink-2">
              You can start from any place. Pick the one that is closest to you. We take it from there.
            </p>
          </div>
          <div data-reveal>
            <Link href="/start" className="btn-ghost group">
              Start now
              <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div data-reveal-stagger className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s, i) => (
            <Link
              key={s.id}
              href={`/start?stage=${s.id}`}
              data-reveal
              className="group flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-4 transition-[transform,translate,scale,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-card"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden className="font-mono text-sm text-muted">0{i + 1}</span>
                <span>
                  <span className="block font-medium">{s.title}</span>
                  <span className="block text-[13px] text-muted">{s.hint}</span>
                </span>
              </span>
              <IconArrow className="h-4 w-4 shrink-0 text-muted transition-[transform,translate,scale,color] duration-200 group-hover:translate-x-1 group-hover:text-ink" />
            </Link>
          ))}
        </div>
        <p data-reveal className="mt-6 text-sm text-muted">Not sure which one fits? Choose &ldquo;I am not sure&rdquo;. We can work it out together.</p>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <section id="faq" className="section-y">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="eyebrow">FAQ</p>
          <h2 data-reveal className="h-section mt-4">Questions, answered</h2>
          <p data-reveal className="mt-4 text-[17px] text-ink-2">Cannot find what you need? Write to us and we will help.</p>
        </div>
        <div data-reveal-stagger className="divide-y divide-line border-y border-line">
          {items.map((f, i) => (
            <details key={f.q} data-reveal className="faq group" open={i === 0}>
              <summary className="flex items-center justify-between gap-6 py-5 text-left text-[17px] font-medium transition-colors hover:text-accent">
                {f.q}
                <span aria-hidden className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-2 text-lg leading-none transition-colors group-hover:border-ink">+</span>
              </summary>
              <div className="faq-body pb-6 pr-12 text-[15px] leading-relaxed text-ink-2">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const wa = whatsappLink();
  const talk = wa
    ? { href: wa, external: true }
    : SITE.email
      ? { href: `mailto:${SITE.email}`, external: false }
      : { href: "/start", external: false };
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container-x">
        <div data-reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div aria-hidden className="absolute -bottom-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-full bg-lime/20 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[32px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">Do not wait until you are ready</h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-white/65">Nobody feels ready. Send the idea as it is, rough and unfinished. We turn it into something real.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/start" className="btn-lime btn-lg group w-full sm:w-auto">
                Share your idea
                <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href={talk.href}
                {...(talk.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn-dark-ghost btn-lg group w-full sm:w-auto"
              >
                <IconChat className="h-4 w-4" />
                Talk to us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
