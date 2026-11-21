import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/config";
import { IconChat, IconMail } from "./landing/Icons";

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Service",
    links: [
      { href: "/#features", label: "What we build" },
      { href: "/#budget", label: "Your budget" },
      { href: "/#hand-over", label: "Hand-over" },
      { href: "/#ideas", label: "Ideas we build" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#start-points", label: "Where are you now?" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Start",
    links: [{ href: "/start", label: "Share your idea" }],
  },
];

export function SiteFooter() {
  const wa = whatsappLink();
  const contact = wa
    ? { href: wa, icon: <IconChat className="h-4 w-4" />, top: "Talk to us on WhatsApp", main: "Open the chat", external: true }
    : SITE.email
      ? { href: `mailto:${SITE.email}`, icon: <IconMail className="h-4 w-4" />, top: "Need help? Email us", main: SITE.email, external: false }
      : { href: "/start", icon: <IconChat className="h-4 w-4" />, top: "Ready to start?", main: "Share your idea", external: false };

  return (
    <footer className="border-t border-line bg-card">
      <div className="container-x grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            We build your idea with you, from the first thought to the first buyer, until you can run it alone.
          </p>
          <a
            href={contact.href}
            {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition-[border-color,transform,translate,scale] duration-200 hover:-translate-y-0.5 hover:border-ink"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-lime">{contact.icon}</span>
            <span className="text-left">
              <span className="block text-xs text-muted">{contact.top}</span>
              <span className="block text-sm font-medium text-ink">{contact.main}</span>
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="eyebrow">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-block text-ink-2 transition-[color,transform,translate,scale] duration-200 hover:translate-x-0.5 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Èrò rẹ ni. All rights reserved.</p>
        <p>Èrò rẹ ni means “It is your idea”.</p>
      </div>
    </footer>
  );
}
