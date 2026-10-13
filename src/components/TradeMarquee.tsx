import { Marquee } from "@/components/velora/marquee";
import { marqueeTrades } from "@/content/site";

export function TradeMarquee() {
  return (
    <section
      aria-label="Trades ProjectFundingIQ is built for"
      className="border-y border-line bg-paper py-5 sm:py-6"
    >
      <Marquee pauseOnHover className="[--duration:55s] [--gap:2.5rem]">
        {marqueeTrades.map((trade) => (
          <span
            key={trade}
            className="flex items-center gap-10 whitespace-nowrap font-serif text-xl text-forest sm:text-2xl"
          >
            {trade}
            <span aria-hidden className="h-1.5 w-1.5 bg-gold" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
