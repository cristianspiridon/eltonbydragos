"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/lib/images";

type LightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Accessible image lightbox: focus is trapped while open, Escape closes,
 * arrow keys move between photographs, and focus returns to the thumbnail
 * that opened it.
 */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const count = photos.length;

  const goTo = useCallback(
    (next: number) => onNavigate((next + count) % count),
    [count, onNavigate],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goTo, index, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${count}`}
      className="fixed inset-0 z-[100] flex flex-col bg-ink-deep/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-bone-muted">
          <span className="text-champagne">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-bone-faint">/</span>
          {String(count).padStart(2, "0")}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-bone transition-colors hover:text-champagne-bright"
        >
          Close
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 pb-3 sm:px-8 sm:pb-6">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="flex items-center gap-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-bone transition-colors hover:text-champagne-bright"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Previous
          <span className="sr-only">photograph</span>
        </button>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="flex items-center gap-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-bone transition-colors hover:text-champagne-bright"
        >
          Next
          <span className="sr-only">photograph</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
