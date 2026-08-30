import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { music } from "@/lib/content";

/**
 * The song list is the artwork here, set as a poster bill rather than a grid
 * of cards, alternating alignment down the page.
 */
export function TheMusic() {
  return (
    <section
      id="music"
      aria-labelledby="music-heading"
      className="bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>{music.label}</SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="music-heading"
            className="display mt-6 max-w-4xl text-[clamp(2.1rem,6vw,4.25rem)] uppercase text-bone"
          >
            {music.heading.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? "block text-champagne" : "block"}
              >
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <ol className="mt-14 sm:mt-20">
          {music.songs.map((song, index) => (
            <Reveal
              as="li"
              key={song}
              delay={index * 45}
              threshold={0.1}
              className="group border-t border-line-soft last:border-b"
            >
              <div
                className={[
                  "flex items-baseline gap-5 py-5 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-8 sm:py-6 motion-reduce:transition-none",
                  index % 2 === 1
                    ? "lg:flex-row-reverse lg:pr-[6%] lg:text-right lg:group-hover:pr-[4%]"
                    : "lg:pl-[6%] lg:group-hover:pl-[8%]",
                ].join(" ")}
              >
                <span className="font-sans text-[0.62rem] tracking-[0.26em] text-champagne-deep transition-colors duration-500 group-hover:text-champagne sm:text-[0.7rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.6rem,5.2vw,3.85rem)] uppercase text-bone transition-colors duration-500 group-hover:text-champagne-bright">
                  {song}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={100}>
          <p className="mt-10 max-w-2xl font-sans text-[0.8rem] leading-[1.8] text-bone-faint sm:text-[0.85rem]">
            {music.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
