import type { Faq } from "@/content/faqs";

export function FaqList({
  items,
  idPrefix = "faq",
}: {
  items: Faq[];
  idPrefix?: string;
}) {
  return (
    <div className="border-y border-line">
      {items.map((item) => (
        <div
          key={item.q}
          id={`${idPrefix}-${item.q.slice(0, 12).replace(/\s+/g, "-").toLowerCase()}`}
          className="grid gap-3 border-b border-line py-6 last:border-b-0 md:grid-cols-12 md:gap-8"
        >
          <h3 className="font-serif text-xl leading-snug text-ink md:col-span-5">
            {item.q}
          </h3>
          <p className="leading-relaxed text-muted md:col-span-7">{item.a}</p>
        </div>
      ))}
    </div>
  );
}
