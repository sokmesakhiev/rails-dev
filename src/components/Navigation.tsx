import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.webp";
import LanguageSwitcher from "./LanguageSwitcher";
import { normalizePath } from "@/lib/seo";

// Home-page sections, in page order, and the separate pages. Every item is a
// real <a href> so search engines can follow the menu (buttons can't be
// crawled), and Ctrl/Cmd-click or middle-click opens a new tab as usual.
const SECTIONS = [
  { id: "home", labelKey: "nav.home" },
  { id: "services", labelKey: "nav.services" },
  { id: "tech-stack", labelKey: "nav.techStack" },
  { id: "about", labelKey: "nav.about" },
] as const;

const PAGES = [
  { path: "/portfolio/", labelKey: "nav.portfolio" },
  { path: "/projects/", labelKey: "nav.projects" },
  { path: "/articles/", labelKey: "nav.articles", fallback: "Articles" },
] as const;

const sectionHref = (id: string) => (id === "home" ? "/" : `/#${id}`);

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior });
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const { t } = useTranslation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Off the home page no section is highlighted: the nav classes check
    // isHomePage, so there's no state to reset here.
    if (!isHomePage) return;

    const handleScroll = () => {
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // After an in-app navigation, go to the linked section (/#about) or to the
  // top of the new page. Every page renders its own Navigation, so this runs
  // on each route change. key "default" is the initial page load, where the
  // browser already handles the hash and scroll restoration.
  useEffect(() => {
    if (location.key === "default") return;
    if (location.hash) {
      scrollToId(location.hash.slice(1), "auto");
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.key, location.hash]);

  // Already on the home page: scroll smoothly instead of navigating. Other
  // pages let the link navigate to /#section (handled by the effect above).
  const handleSectionClick = (event: MouseEvent, id: string) => {
    setIsOpen(false);
    if (!isHomePage || !isPlainClick(event)) return;
    event.preventDefault();
    scrollToId(id);
    setActiveSection(id);
  };

  const navClass = (isActive: boolean, mobile: boolean) =>
    `${
      mobile
        ? "block w-full text-left text-base"
        : "whitespace-nowrap text-sm"
    } px-3 py-2 rounded-md font-medium transition-colors ${
      isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
    }`;

  const renderItems = (mobile: boolean) => (
    <>
      {SECTIONS.map(({ id, labelKey }) => {
        const isActive = isHomePage && activeSection === id;
        return (
          <Link
            key={id}
            to={sectionHref(id)}
            onClick={(event) => handleSectionClick(event, id)}
            aria-current={isActive ? "location" : undefined}
            className={navClass(isActive, mobile)}
          >
            {t(labelKey)}
          </Link>
        );
      })}
      {PAGES.map((page) => {
        const isActive = normalizePath(location.pathname) === page.path;
        return (
          <Link
            key={page.path}
            to={page.path}
            onClick={() => setIsOpen(false)}
            aria-current={isActive ? "page" : undefined}
            className={navClass(isActive, mobile)}
          >
            {"fallback" in page ? t(page.labelKey, page.fallback) : t(page.labelKey)}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={(event) => handleSectionClick(event, "home")} aria-label={t("nav.home")}>
              <img src={logo} alt="RailsDev" width={128} height={40} className="relative w-32" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {renderItems(false)}
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            {renderItems(true)}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
