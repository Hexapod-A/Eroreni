import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { HeaderShadow } from "./HeaderShadow";

export const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/#features", label: "What we build" },
  { href: "/#how", label: "How it works" },
  { href: "/#budget", label: "Budget" },
  { href: "/#ideas", label: "Ideas" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b border-transparent bg-paper/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:shadow-[0_8px_24px_-20px_rgba(14,15,12,0.4)]"
    >
      <HeaderShadow />
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0 md:flex lg:gap-0.5">
          {NAV_ITEMS.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link whitespace-nowrap">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 whitespace-nowrap md:flex">
          <Link href="/start" className="btn-primary btn-sm group">
            Share your idea
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <MobileMenu items={NAV_ITEMS} />
      </div>
    </header>
  );
}
