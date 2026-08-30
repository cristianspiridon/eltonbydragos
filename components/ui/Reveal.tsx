"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** How much of the element must be visible before it reveals. */
  threshold?: number;
  className?: string;
};

/**
 * Reveals its children once on first scroll into view.
 *
 * The transition itself lives in globals.css and is disabled entirely under
 * `prefers-reduced-motion`, so this only ever toggles a data attribute.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  threshold = 0.15,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "shown";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal="hidden"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
