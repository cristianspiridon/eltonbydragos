/**
 * Build-time asset pipeline.
 *
 * The supplied originals are 6144x4096 (~3.5MB each). Next/Image can resize them,
 * but shipping the originals through the optimiser on every cold cache is wasteful,
 * so we downscale once into public/photos and let Next handle format negotiation.
 *
 * Run: npm run images
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "images");
const OUT = path.join(ROOT, "public/photos");

/** Long-edge width for the delivered source file. */
const WIDTH_HERO = 3000;
const WIDTH_STANDARD = 2200;

const photos = [
  { src: "IMG 285.jpg", out: "hero-at-the-piano.jpg", width: WIDTH_HERO },
  { src: "IMG 152.jpg", out: "mid-note.jpg", width: WIDTH_HERO },
  { src: "IMG 123.jpg", out: "stage-lights.jpg", width: WIDTH_STANDARD },
  { src: "IMG 128.jpg", out: "profile-portrait.jpg", width: WIDTH_STANDARD },
  { src: "IMG 149.jpg", out: "into-the-microphone.jpg", width: WIDTH_STANDARD },
];

/**
 * Processed only if present. Drop a file at images/dragos-portrait.jpg and
 * re-run this script, and the About section picks it up automatically;
 * until then it falls back to the profile photograph from the live set.
 */
const optionalPhotos = [
  { src: "dragos-portrait.jpg", out: "dragos-portrait.jpg", width: WIDTH_STANDARD },
];

/** Tiny blurred base64 placeholder so images fade in rather than pop. */
async function blurDataUrl(file) {
  const buffer = await sharp(file)
    .resize(16, 11, { fit: "cover" })
    .jpeg({ quality: 40 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function process(photo, manifest) {
  const from = path.join(SRC, photo.src);
  const to = path.join(OUT, photo.out);

  await sharp(from)
    .resize({ width: photo.width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(to);

  const { width, height } = await sharp(to).metadata();
  manifest[photo.out] = { width, height, blurDataURL: await blurDataUrl(to) };
  console.log(`✓ ${photo.src} → photos/${photo.out} (${width}x${height})`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const photo of photos) {
    await process(photo, manifest);
  }

  for (const photo of optionalPhotos) {
    if (!existsSync(path.join(SRC, photo.src))) {
      console.log(`· ${photo.src} not supplied, skipping`);
      continue;
    }
    await process(photo, manifest);
  }

  // Social card. Anchored high in the frame so the top hat survives the 1.91:1 crop.
  const ogSource = path.join(SRC, "IMG 285.jpg");
  await sharp(ogSource)
    .extract({ left: 0, top: 180, width: 6144, height: 3216 })
    .resize(1200, 630)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(ROOT, "public/opengraph-image.jpg"));
  console.log("✓ opengraph-image.jpg (1200x630)");

  await writeFile(
    path.join(ROOT, "lib/photo-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log("✓ lib/photo-manifest.json");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
