"use client";

import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type LiteYouTubeProps = {
  videoId: string;
  title: string;
  /** Locally hosted poster frame, so no third-party request is made until play. */
  poster: string;
  /** Seconds into the video to begin playback. */
  startAt?: number;
};

/**
 * Click-to-load YouTube facade.
 *
 * Renders an optimised local poster frame and only injects the player iframe
 * on activation. The full embed costs ~1MB and several third-party requests,
 * which would otherwise be paid by every visitor who never presses play.
 */
export function LiteYouTube({ videoId, title, poster, startAt = 0 }: LiteYouTubeProps) {
  const [activated, setActivated] = useState(false);
  const [warmed, setWarmed] = useState(false);

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    ...(startAt ? { start: String(startAt) } : {}),
  });

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-deep">
      {/* Warm up the connection on intent, not on load. */}
      {warmed && !activated && (
        <>
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://i.ytimg.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </>
      )}

      {activated ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            trackEvent({
              name: "Performance Video Click",
              location: "video-section",
              destination: "youtube",
            });
            setActivated(true);
          }}
          onPointerEnter={() => setWarmed(true)}
          onFocus={() => setWarmed(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <span className="sr-only">{`Play video: ${title}`}</span>

          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1280px) 1100px, 100vw"
            className="object-cover transition duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-ink/35 transition-colors duration-700 group-hover:bg-ink/20"
          />

          {/* Play control */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/50 bg-ink/25 backdrop-blur-[2px] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-champagne group-hover:bg-champagne motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-24 sm:w-24"
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-bone transition-colors duration-500 group-hover:fill-ink sm:h-8 sm:w-8"
            >
              <path d="M8 5.14v13.72a.5.5 0 0 0 .76.43l11.14-6.86a.5.5 0 0 0 0-.86L8.76 4.71A.5.5 0 0 0 8 5.14Z" />
            </svg>
          </span>

          <span
            aria-hidden="true"
            className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left sm:bottom-7 sm:left-8 sm:right-8"
          >
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-bone/85 sm:text-xs">
              Play the performance
            </span>
            <span className="hidden font-sans text-[0.65rem] uppercase tracking-[0.28em] text-bone/55 sm:block">
              YouTube
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
