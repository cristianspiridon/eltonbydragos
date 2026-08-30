"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const sectionIds = siteConfig.nav.map((item) => item.href.replace("#", ""));

/** Highlights the nav item for the section currently occupying the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-line-soft bg-ink/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[112rem] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
          {/* No aria-label: the accessible name must contain the visible
              wordmark text (WCAG 2.5.3), so it is extended rather than replaced. */}
          <Link href="/" className="shrink-0 transition-opacity duration-300 hover:opacity-80">
            <BrandMark />
            <span className="sr-only"> — home</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {siteConfig.nav.map((item) => {
                const isActive = active === item.href.replace("#", "");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "group relative block py-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                        isActive ? "text-champagne" : "text-bone-muted hover:text-bone",
                      ].join(" ")}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        ].join(" ")}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {/* Wrapper carries the responsive visibility: the button sets its own
                display, which would otherwise win over a `hidden` utility. */}
            <span className="hidden lg:block">
              <ButtonLink href="#book" variant="primary">
                {siteConfig.cta.primary}
              </ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 flex items-center gap-3 p-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-bone lg:hidden"
            >
              Menu
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
