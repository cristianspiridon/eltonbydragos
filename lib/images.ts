import manifest from "./photo-manifest.json";

/**
 * Photography manifest.
 *
 * `focus` maps to CSS object-position and is tuned per photograph so the
 * performer stays the focal point at every crop ratio. `focusMobile` is used
 * where a portrait crop would otherwise push the subject out of frame.
 *
 * Regenerate the derived files and blur placeholders with `npm run images`.
 */

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  focus: string;
  focusMobile?: string;
};

type ManifestEntry = { width: number; height: number; blurDataURL: string };

function fromManifest(
  file: keyof typeof manifest,
  meta: Omit<Photo, "src" | "width" | "height" | "blurDataURL">,
): Photo {
  const entry = manifest[file] as ManifestEntry;
  return {
    ...meta,
    src: `/photos/${file}`,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
  };
}

export const photos = {
  /** Widest framing of the set, and the only frame showing hands on the keys. */
  hero: fromManifest("hero-at-the-piano.jpg", {
    id: "hero",
    alt: `${"Dragoș"} performing as Elton John at the piano, wearing a top hat, round tinted glasses and a paisley stage jacket`,
    focus: "58% 22%",
    focusMobile: "56% 26%",
  }),
  /** Most expressive frame: mid-note under blue and magenta stage light. */
  midNote: fromManifest("mid-note.jpg", {
    id: "mid-note",
    alt: "Mid-song close-up of the performer singing into the microphone under blue stage light",
    focus: "62% 35%",
    focusMobile: "62% 35%",
  }),
  /** Warm red wash, hands on the keys, singing into the microphone. */
  stageLights: fromManifest("stage-lights.jpg", {
    id: "stage-lights",
    alt: "The performer singing into the microphone at the keyboard under warm red stage lighting",
    focus: "38% 40%",
  }),
  /** Cinematic profile with deep negative space to the right of frame. */
  profile: fromManifest("profile-portrait.jpg", {
    id: "profile",
    alt: "Close profile portrait of the performer in a top hat and round glasses at the microphone",
    focus: "35% 45%",
  }),
  /** Head down into the microphone, magenta wash. */
  microphone: fromManifest("into-the-microphone.jpg", {
    id: "microphone",
    alt: "The performer leaning into the microphone mid-performance under magenta stage light",
    focus: "52% 40%",
  }),
} satisfies Record<string, Photo>;

/**
 * Artist portrait for the biography.
 *
 * To supply a dedicated portrait, drop the file at `images/dragos-portrait.jpg`
 * and run `npm run images`. It is picked up here automatically. Until then this
 * falls back to the profile frame from the live set, so the layout is never
 * missing an image.
 */
const portraitEntry = (manifest as Record<string, ManifestEntry | undefined>)[
  "dragos-portrait.jpg"
];

export const portrait: Photo = portraitEntry
  ? {
      id: "portrait",
      src: "/photos/dragos-portrait.jpg",
      width: portraitEntry.width,
      height: portraitEntry.height,
      blurDataURL: portraitEntry.blurDataURL,
      alt: "Portrait of Dragoș Moștenescu",
      focus: "50% 30%",
    }
  : photos.profile;

/** Ordered for the editorial gallery grid and the lightbox sequence. */
export const galleryPhotos: Photo[] = [
  photos.hero,
  photos.profile,
  photos.midNote,
  photos.stageLights,
  photos.microphone,
];
