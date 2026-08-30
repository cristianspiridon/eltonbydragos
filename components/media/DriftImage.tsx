"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/lib/images";

type DriftImageProps = {
  photo: Photo;
  sizes: string;
  /** Applied to the clipping frame. Set the aspect ratio here. */
  className?: string;
  /** Peak travel in pixels, in each direction. */
  amount?: number;
  quality?: number;
};

/**
 * Editorial image with a slow vertical drift as it crosses the viewport.
 *
 * The movement is deliberately small, a few dozen pixels across a full scroll,
 * so it reads as depth rather than parallax. It is skipped entirely under
 * `prefers-reduced-motion`, and while the frame is off screen.
 */
export function DriftImage({
  photo,
  sizes,
  className,
  amount = 36,
  quality = 76,
}: DriftImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let inView = false;
    let queued = false;

    const apply = () => {
      queued = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      // -1 when the frame sits below the fold, +1 once it has passed above it.
      const progress =
        (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      inner.style.setProperty("--drift", `${(-clamped * amount).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (queued || !inView) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) apply();
      },
      { rootMargin: "20% 0px" },
    );

    observer.observe(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount]);

  return (
    <div ref={frameRef} className={["relative overflow-hidden bg-ink-raised", className].filter(Boolean).join(" ")}>
      <div ref={innerRef} data-drift className="absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          style={{ objectPosition: photo.focus }}
          className="object-cover"
        />
      </div>
    </div>
  );
}
