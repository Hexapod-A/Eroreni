/**
 * One place for the things you will want to change: contact details, the six areas of work,
 * the budget bands and the answers people can pick in the idea flow.
 */

export const SITE = {
  name: "Èrò rẹ ni",
  meaning: "It is your idea",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Digits only, with country code, no plus sign. Example: 2348012345678 */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
};

export function whatsappLink(text?: string): string {
  if (!SITE.whatsapp) return "";
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** The six areas of work. Order matters: the budget example lights them up in this order. */
export const AREAS = [
  { id: "product", title: "Product development", short: "Product", text: "We build the first working version of your product with you." },
  { id: "operations", title: "Operations", short: "Operations", text: "We set up the daily steps that run your business." },
  { id: "social", title: "Social media presence", short: "Social pages", text: "We open your pages and set up how they run, so people can find you." },
  { id: "designs", title: "Designs and posts", short: "Designs and posts", text: "We make the logo, pictures and posts that show your idea." },
  { id: "sales", title: "Sales and marketing", short: "Sales and marketing", text: "We make a plan to find buyers and help you sell to them." },
  { id: "distribution", title: "Distribution", short: "Distribution", text: "We set up the ways your product reaches the buyer." },
] as const;

export const STAGES = [
  { id: "idea", title: "I only have an idea", hint: "Nothing is built yet." },
  { id: "notes", title: "I have notes or a plan", hint: "I wrote some of it down." },
  { id: "stuck", title: "I started, but I am stuck", hint: "I do not know the next step." },
  { id: "product", title: "I have a product, but no buyers", hint: "It exists. Nobody buys it yet." },
  { id: "grow", title: "I have buyers and I want to grow", hint: "It works. I want more." },
  { id: "unsure", title: "I am not sure", hint: "We can work it out together." },
] as const;

/**
 * Budget bands. `coverage` is how many of the six areas the example on the home page lights up.
 * It is an example only. Use 0 for a band that does not appear in the example.
 * Change the naira amounts here to match what you want to charge.
 */
export const BUDGETS = [
  { id: "b1", label: "Under ₦20,000", short: "₦20k", coverage: 1 },
  { id: "b2", label: "₦20,000 to ₦50,000", short: "₦50k", coverage: 2 },
  { id: "b3", label: "₦50,000 to ₦150,000", short: "₦150k", coverage: 4 },
  { id: "b4", label: "₦150,000 to ₦500,000", short: "₦500k", coverage: 5 },
  { id: "b5", label: "More than ₦500,000", short: "₦500k+", coverage: 6 },
  { id: "unsure", label: "I am not sure yet", short: "", coverage: 0 },
] as const;

export const TIMING = [
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
  { id: "later", label: "Later" },
] as const;

export const STEP_LABELS = ["Your idea", "Where you are", "Help you need", "Documents", "Budget", "Your name"] as const;

export function labelOf<T extends { id: string }>(list: readonly (T & { title?: string; label?: string })[], id: string): string {
  const hit = list.find((x) => x.id === id);
  return hit ? (hit.title ?? hit.label ?? "") : "";
}
