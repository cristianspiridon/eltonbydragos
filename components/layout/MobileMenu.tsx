"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string | null;
};

/**
 * Full-screen menu panel. Kept mounted so it can transition, but hidden from
 * assistive technology and the tab order while closed.
 */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>("a, button");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open ? true : undefined}
      className={[
        "fixed inset-0 z-[70] flex flex-col bg-ink transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div className="flex h-[4.5rem] items-center justify-between px-5">
        <span className="font-sans text-[0.5rem] font-medium uppercase tracking-[0.4em] text-bone-muted">
          {siteConfig.brand.subtitle}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="-mr-2 flex items-center gap-3 p-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-bone"
        >
          Close
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 px-5 pt-6">
        <ul className="flex flex-col">
          {siteConfig.nav.map((item, index) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <li key={item.href} className="border-b border-line-soft">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="font-sans text-[0.6rem] tracking-[0.2em] text-champagne-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={[
                      "display text-[2.35rem] uppercase transition-colors duration-300",
                      isActive ? "text-champagne" : "text-bone",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-5 pb-10 pt-8">
        <ButtonLink
          href="#book"
          variant="primary"
          size="lg"
          onClick={onClose}
          className="w-full"
        >
          {siteConfig.cta.primary}
        </ButtonLink>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="mt-5 block text-center font-sans text-[0.7rem] tracking-[0.16em] text-bone-muted underline-offset-8 hover:text-champagne-bright hover:underline"
        >
          {siteConfig.contact.email}
        </a>
      </div>
    </div>
  );
}
