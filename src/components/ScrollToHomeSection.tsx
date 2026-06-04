import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHomeSection, scrollToPageTop, type HomeScrollState } from "@/lib/homeNavigation";

/** Scrolls to a homepage section after cross-route navigation, or scrolls to top on route changes. */
export default function ScrollToHomeSection() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const handledScrollKey = useRef<string | null>(null);

  const sectionFromState = (location.state as HomeScrollState | null)?.scrollTo ?? "";
  const sectionFromHash = location.hash ? location.hash.slice(1) : "";
  const sectionId = sectionFromState || sectionFromHash;
  const scrollKey = `${location.pathname}|${sectionId}`;

  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;

    if (location.pathname !== "/") {
      if (pathChanged) scrollToPageTop("auto");
      return;
    }

    if (sectionId) {
      if (handledScrollKey.current === scrollKey) return;
      handledScrollKey.current = scrollKey;

      let attempts = 0;
      const maxAttempts = 30;

      const tryScroll = () => {
        if (scrollToHomeSection(sectionId) || attempts >= maxAttempts) return;
        attempts += 1;
        requestAnimationFrame(tryScroll);
      };

      const timer = window.setTimeout(tryScroll, 80);
      return () => window.clearTimeout(timer);
    }

    if (pathChanged) {
      handledScrollKey.current = scrollKey;
      scrollToPageTop("auto");
    }
  }, [location.pathname, sectionId, scrollKey]);

  return null;
}
