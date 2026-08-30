import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5",
  lg: "px-8 py-4 sm:px-10 sm:py-[1.15rem]",
};

const variants: Record<Variant, string> = {
  /** Champagne fill — reserved for the single most important action in view. */
  primary:
    "bg-champagne text-ink hover:bg-champagne-bright focus-visible:bg-champagne-bright",
  /** Hairline outline over photography. */
  ghost:
    "border border-bone/35 text-bone backdrop-blur-[2px] hover:border-bone hover:bg-bone hover:text-ink",
  /** Text-only, for tertiary actions. */
  quiet:
    "px-0 text-bone-muted underline-offset-8 hover:text-champagne-bright hover:underline",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variant === "quiet" ? "" : sizes[size], variants[variant], className]
    .filter(Boolean)
    .join(" ");
}

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonLinkProps = SharedProps & ComponentPropsWithoutRef<typeof Link>;

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

type ButtonProps = SharedProps & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={classes(variant, size, className)}>
      {children}
    </button>
  );
}
