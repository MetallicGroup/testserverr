import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToHomeSection, scrollToPageTop, type HomeSectionId } from "@/lib/homeNavigation";

export function useSiteNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const goHome = useCallback(
    (options?: { section?: HomeSectionId; top?: boolean }) => {
      if (isHome) {
        if (options?.section) {
          scrollToHomeSection(options.section);
        } else {
          scrollToPageTop();
        }
        return;
      }

      if (options?.section) {
        navigate("/", { state: { scrollTo: options.section } });
      } else {
        navigate("/");
      }
    },
    [isHome, navigate],
  );

  const goToSection = useCallback(
    (sectionId: HomeSectionId) => {
      if (isHome) {
        scrollToHomeSection(sectionId);
        return;
      }
      navigate("/", { state: { scrollTo: sectionId } });
    },
    [isHome, navigate],
  );

  const goToRoute = useCallback(
    (path: string) => {
      if (location.pathname === path) {
        scrollToPageTop();
        return;
      }
      navigate(path);
      window.scrollTo(0, 0);
    },
    [location.pathname, navigate],
  );

  return { goHome, goToSection, goToRoute, isHome, pathname: location.pathname };
}
