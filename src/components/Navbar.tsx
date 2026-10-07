"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, partnerTransition, partnerUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          solid
            ? "border-line bg-paper/90 backdrop-blur-md"
            : "border-transparent bg-cream/80"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-3">
            <Logo />
            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 lg:flex"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative text-sm tracking-tight transition-colors duration-300 ${
                      active ? "text-forest" : "text-ink/80 hover:text-forest"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 h-px bg-forest motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out ${
                        active
                          ? "w-full scale-x-100"
                          : "w-full origin-left scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <Button
                href={partnerUrl}
                external
                className="!hidden sm:!inline-flex !min-h-10 !px-3.5 !text-sm lg:!min-h-11 lg:!px-4"
              >
                Become a Partner
              </Button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-forest lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setMenuPath(open ? null : pathname)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-cream lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex min-h-full flex-col py-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: reduce ? 0 : 0.05 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`block border-b border-line py-4 font-serif text-[1.7rem] leading-tight transition-colors duration-300 ${
                          active ? "text-forest" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                className="mt-8"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.28 }}
              >
                <Button href={partnerUrl} external className="w-full" size="lg">
                  Become a Partner
                </Button>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {partnerTransition}
                </p>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
