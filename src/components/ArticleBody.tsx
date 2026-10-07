import type { ArticleBlock } from "@/content/resources";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-10 font-serif text-2xl text-ink sm:text-3xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mt-4 space-y-2 text-muted">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "note") {
          return (
            <aside
              key={index}
              className="mt-8 border border-line bg-sage/70 p-5 sm:p-6"
            >
              <h2 className="font-serif text-xl text-ink">{block.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{block.text}</p>
            </aside>
          );
        }
        return (
          <p key={index} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
