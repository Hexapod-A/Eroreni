import { AREAS } from "@/lib/config";
import { IconChart, IconCode, IconPen, IconPlug, IconSend, IconUsers } from "./Icons";

function Card({ icon, title, text, children, className = "" }: { icon: React.ReactNode; title: string; text: string; children?: React.ReactNode; className?: string }) {
  return (
    <div
      data-reveal
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-[transform,translate,scale,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.06] ${className}`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime/15 text-lime transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-white">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{text}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </div>
  );
}

const row = "flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-white/80";
const chip = "rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/75 transition-colors hover:border-lime/50 hover:text-white";

export function Features() {
  const [product, operations, social, designs, sales, distribution] = AREAS;
  return (
    <section id="features" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x section-y relative">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="font-mono text-[12px] uppercase tracking-[0.14em] text-lime">What we build</p>
          <h2 data-reveal className="h-section mt-4">From first thought to first buyer</h2>
          <p data-reveal className="mt-4 text-[17px] text-white/60">Six areas of work. You pick what you need. Your budget decides how much we build.</p>
        </div>

        <div data-reveal-stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card icon={<IconCode />} title={product.title} text={product.text}>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-[12px] leading-6 text-white/70">
              <p><span className="text-lime">✓</span> Idea read</p>
              <p><span className="text-lime">✓</span> Plan agreed with you</p>
              <p><span className="text-lime">✓</span> First version built</p>
            </div>
          </Card>

          <Card icon={<IconPlug />} title={operations.title} text={operations.text}>
            <div className="space-y-2">
              {["Take orders", "Confirm and pay", "Deliver and follow up"].map((l) => (
                <div key={l} className={row}>
                  {l}
                  <span aria-hidden className="relative h-5 w-9 rounded-full bg-lime"><span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-ink" /></span>
                </div>
              ))}
            </div>
          </Card>

          <Card icon={<IconUsers />} title={social.title} text={social.text}>
            <div className="flex flex-wrap gap-1.5">
              {["Instagram", "TikTok", "Facebook", "WhatsApp", "X", "YouTube"].map((t) => (
                <span key={t} className={chip}>{t}</span>
              ))}
            </div>
          </Card>

          <Card icon={<IconPen />} title={designs.title} text={designs.text}>
            <div className="grid grid-cols-3 gap-2">
              {["Logo", "Post", "Flyer", "Story", "Banner", "Label"].map((t, i) => (
                <div key={t} className={`grid aspect-[4/3] place-items-center rounded-lg border text-[11px] transition-colors group-hover:border-lime/40 ${i === 0 ? "border-lime/50 bg-lime/10 text-lime" : "border-white/10 bg-black/20 text-white/60"}`}>
                  {t}
                </div>
              ))}
            </div>
          </Card>

          <Card icon={<IconChart />} title={sales.title} text={sales.text}>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex justify-between text-xs text-white/50"><span>Plan</span><span>Buyers</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[38%] rounded-full bg-lime transition-[width] duration-700 group-hover:w-[62%]" /></div>
            </div>
          </Card>

          <Card icon={<IconSend />} title={distribution.title} text={distribution.text}>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Your own page", "WhatsApp", "Social shops", "Delivery"].map((m) => (
                <span key={m} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-center text-white/75 transition-colors hover:border-lime/50 hover:text-white">{m}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
