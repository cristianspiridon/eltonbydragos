import type { ReactNode } from "react";

/**
 * Small-caps section opener with a champagne hairline, echoing the credits
 * block on a theatre poster.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={["eyebrow flex items-center gap-4", className].filter(Boolean).join(" ")}>
      <span aria-hidden="true" className="h-px w-8 bg-champagne-deep sm:w-12" />
      {children}
    </p>
  );
}
