import { useState, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CalendarDays, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CAL_LINK, CONTACT_EMAIL, calBookingUrl } from "@/lib/booking";

const NAMESPACE = "book-call";
const EMBED_JS_URL = "https://app.cal.com/embed/embed.js";
const LOAD_TIMEOUT_MS = 6000;

type CalFn = (...args: unknown[]) => void;

// getCalApi() resolves as soon as Cal's queue stub exists, before embed.js
// has loaded, so a blocked script would silently swallow the click. Wait for
// the script element itself. On error, remove it and reset window.Cal so the
// next attempt injects a fresh script.
const embedScriptLoaded = () =>
  new Promise<void>((resolve, reject) => {
    const script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_JS_URL}"]`);
    if (!script) return reject(new Error("Cal.com embed script missing"));
    if (script.dataset.loaded) return resolve();
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => {
      script.remove();
      delete (window as { Cal?: unknown }).Cal;
      reject(new Error("Cal.com embed script failed to load"));
    }, { once: true });
  });

// Loads Cal.com's embed on first use only, so pages don't ship or run
// third-party JS until someone wants to book. Browser only: call it from an
// event handler, never during render.
let calApi: Promise<CalFn> | null = null;
const loadCal = () => {
  calApi ??= import("@calcom/embed-react").then(({ getCalApi }) => {
    // getCalApi() adds the <script> synchronously, so listen right away.
    const api = getCalApi({ namespace: NAMESPACE, embedJsUrl: EMBED_JS_URL });
    return Promise.all([api, embedScriptLoaded()]).then(([cal]) => {
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
      return cal as CalFn;
    });
  });
  // Don't cache a failure; the next click tries again.
  calApi.catch(() => (calApi = null));
  return Promise.race([
    calApi,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Cal.com embed timed out")), LOAD_TIMEOUT_MS)),
  ]);
};

interface BookCallButtonProps {
  /** Label for the email fallback, used only while CAL_LINK is unset. */
  children: ReactNode;
  className?: string;
}

/**
 * "Book a call" link that opens the Cal.com booking form in a pop-up.
 * It is a real link to the Cal.com page, so it still works without
 * JavaScript, when opened in a new tab, or if the embed can't load
 * (ad blocker, network). Falls back to email while CAL_LINK is unset.
 */
const BookCallButton = ({ children, className }: BookCallButtonProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity",
    className,
  );

  if (!CAL_LINK) {
    return (
      <a href={`mailto:${CONTACT_EMAIL}`} className={classes}>
        {children}
      </a>
    );
  }

  const url = calBookingUrl(CAL_LINK);

  const openBooking = async (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) go straight to the Cal.com page.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setLoading(true);
    try {
      const cal = await loadCal();
      cal("modal", { calLink: CAL_LINK, config: { layout: "month_view" } });
    } catch (error) {
      console.warn("[BookCallButton] Cal.com embed unavailable, opening the booking page instead:", error);
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={openBooking}
      // Start loading on hover/focus so the pop-up opens almost instantly.
      onPointerEnter={() => void loadCal().catch(() => {})}
      onFocus={() => void loadCal().catch(() => {})}
      aria-busy={loading}
      className={classes}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
      )}
      {t("booking.bookCall")}
    </a>
  );
};

export default BookCallButton;
