"use client";

import { useEffect } from "react";
import { analyticsReady } from "@/lib/firebase";

/**
 * Starts Google Analytics once, on the client, and renders nothing.
 *
 * The work is deliberately in an effect rather than at module scope. Effects do
 * not run during server rendering or prerendering, which keeps the SDK away
 * from the build, and it means the session starts after paint rather than
 * competing with the hero image for bandwidth.
 *
 * Mounting this is also what sends the automatic page_view, so it belongs in
 * the root layout and must appear exactly once.
 */
export function FirebaseAnalytics() {
  useEffect(() => {
    void analyticsReady();
  }, []);

  return null;
}
