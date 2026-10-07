import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <p className="eyebrow text-forest">404</p>
        <h1 className="mt-3 max-w-xl font-serif text-4xl text-ink sm:text-5xl">
          That page is not part of this site.
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted">
          The funding education you came for is still here. Start from the
          homepage, or read how a Home Equity Agreement works.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/how-heas-work" variant="secondary">
            How HEAs work
          </Button>
        </div>
      </Container>
    </section>
  );
}
