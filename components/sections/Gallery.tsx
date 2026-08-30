"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/media/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gallery } from "@/lib/content";
import { galleryPhotos } from "@/lib/images";

/**
 * Editorial mosaic. Ratios are paired so each row resolves to a single height
 * without stretching, giving a printed contact-sheet rhythm rather than a grid
 * of identical boxes.
 */
const layout = [
  {
    span: "lg:col-span-7",
    frame: "aspect-[3/2]",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    span: "lg:col-span-5",
    frame: "aspect-[4/5] lg:aspect-[15/14]",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    span: "lg:col-span-5",
    frame: "aspect-[4/5] lg:aspect-[15/14]",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    span: "lg:col-span-7",
    frame: "aspect-[3/2]",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    span: "lg:col-span-12",
    frame: "aspect-[3/2] lg:aspect-[21/9]",
    sizes: "100vw",
  },
];

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <SectionLabel>{gallery.label}</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="gallery-heading"
                className="display mt-6 text-[clamp(2.3rem,7vw,5rem)] uppercase text-bone"
              >
                {gallery.heading.map((line, index) => (
                  <span key={line} className={index === 1 ? "block text-champagne" : "block"}>
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.26em] text-bone-faint sm:pb-3">
              {gallery.standfirst}
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-12">
          {galleryPhotos.map((photo, index) => {
            const { span, frame, sizes } = layout[index % layout.length];
            return (
              <Reveal as="li" key={photo.id} delay={(index % 2) * 90} className={span}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className={`group relative block w-full overflow-hidden bg-ink-raised ${frame}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={74}
                    sizes={sizes}
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    style={{ objectPosition: photo.focus }}
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-ink/0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 left-4 flex items-center gap-3 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-5 sm:left-5"
                  >
                    <span className="h-px w-6 bg-champagne" />
                    View
                  </span>
                  <span className="sr-only">{`Open photograph ${index + 1} of ${galleryPhotos.length}: ${photo.alt}`}</span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
