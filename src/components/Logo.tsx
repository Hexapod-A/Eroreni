import Link from "next/link";

/** Text-set wordmark: a solid square with a spark + "Èrò rẹ ni". */
export function Logo({ href = "/", invert = false }: { href?: string; invert?: boolean }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5" aria-label="Èrò rẹ ni home">
      <span
        aria-hidden
        className={`grid h-7 w-7 place-items-center rounded-[7px] ${invert ? "bg-lime text-ink" : "bg-ink text-lime"}`}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        >
          <path d="M8 1.5v3.5M8 11v3.5M1.5 8H5M11 8h3.5" />
          <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className={`text-[17px] tracking-[-0.02em] ${invert ? "text-white" : "text-ink"}`}>
        <span className="font-semibold">Èrò rẹ</span> <span className="font-normal">ni</span>
      </span>
    </Link>
  );
}
