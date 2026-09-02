import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

/**
 * Firebase project config.
 *
 * These values are committed on purpose. A Firebase web config is an
 * identifier, not a credential: it ships inside every client bundle by design,
 * and Google documents it as safe to expose. Access is controlled by Firebase
 * Security Rules and API key restrictions, not by hiding this object. Moving it
 * to NEXT_PUBLIC_ variables would put the same strings in the same bundle while
 * adding a way for the deploy to silently lose analytics.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCFVpqt_E8gLgbuwJBBu_k0Ftb4IMSJywI",
  authDomain: "eltonbydragos.firebaseapp.com",
  projectId: "eltonbydragos",
  storageBucket: "eltonbydragos.firebasestorage.app",
  messagingSenderId: "73510799931",
  appId: "1:73510799931:web:b2ca73a16ccf3f62102a1e",
  measurementId: "G-LVSDQHR60Q",
};

/** getApps() guards against re-initialising across dev Fast Refresh. */
function firebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let instance: Promise<Analytics | null> | null = null;

/**
 * Resolves the Analytics instance, or null where it cannot run.
 *
 * Null is a normal outcome rather than an error. It covers server rendering,
 * browsers without the storage the SDK needs, and anything that blocks the
 * measurement script, so callers never have to special-case those.
 *
 * The promise is memoised because getAnalytics() is what starts a session and
 * sends the automatic page_view. Calling it once per click would be wasteful,
 * and the first call has to happen on load rather than on the first
 * interaction, or visitors who never click would go uncounted.
 */
export function analyticsReady(): Promise<Analytics | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  instance ??= isSupported()
    .then((supported) => (supported ? getAnalytics(firebaseApp()) : null))
    .catch(() => null);

  return instance;
}
