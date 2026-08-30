import { Hero } from "@/components/sections/Hero";
import { AvailabilityStrip } from "@/components/sections/AvailabilityStrip";
import { Experience } from "@/components/sections/Experience";
import { WatchTheShow } from "@/components/sections/WatchTheShow";
import { TheMusic } from "@/components/sections/TheMusic";
import { PerfectFor } from "@/components/sections/PerfectFor";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { BookingCta } from "@/components/sections/BookingCta";
import { BookingSection } from "@/components/sections/BookingSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityStrip />
      <Experience />
      <WatchTheShow />
      <TheMusic />
      <PerfectFor />
      <About />
      <Gallery />
      <BookingCta />
      <BookingSection />
    </>
  );
}
