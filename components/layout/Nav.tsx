"use client";

import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/data/site";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Expériences", href: "#experiences" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Formation", href: "#formation" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? "dark:bg-slate-900/95 bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b dark:border-slate-800/60 border-slate-200/80"
          : "bg-transparent"
        }
      `}
    >
      <nav
        aria-label="Navigation principale"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* Brand */}
        <a
          href="#accueil"
          aria-label="Julien Lange — Retour à l'accueil"
          className="
            font-mono text-sm font-medium tracking-wider
            dark:text-slate-300 text-slate-700
            hover:text-accent dark:hover:text-accent
            transition-colors duration-200
            flex items-center gap-2
          "
        >
          <span className="
            w-8 h-8 rounded-lg
            bg-gradient-to-br from-brand to-accent
            flex items-center justify-center
            text-white text-xs font-bold
            shrink-0
          ">
            JL
          </span>
          <span className="hidden sm:inline dark:text-slate-400 text-slate-500">julien-lange.dev</span>
        </a>

        {/* Desktop links */}
        <ul role="list" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="
                  px-3 py-1.5 rounded-md text-sm
                  dark:text-slate-400 text-slate-600
                  dark:hover:text-slate-100 hover:text-slate-900
                  dark:hover:bg-slate-800/60 hover:bg-slate-100
                  transition-colors duration-150
                  font-medium
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={siteConfig.cvPath}
            download
            onClick={() => track("cv_download")}
            className="
              hidden sm:flex items-center gap-1.5
              px-3.5 py-1.5 rounded-lg text-sm font-medium
              bg-brand hover:bg-brand/90
              text-white
              transition-colors duration-200
              border border-brand/50
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Mon CV
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg
              dark:hover:bg-slate-800 hover:bg-slate-100
              transition-colors
            "
          >
            <span className={`w-5 h-0.5 dark:bg-slate-300 bg-slate-600 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 dark:bg-slate-300 bg-slate-600 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 dark:bg-slate-300 bg-slate-600 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navigation"
        className={`
          lg:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? "max-h-96" : "max-h-0"}
          dark:bg-slate-900/98 bg-white/98 backdrop-blur-md
          border-b dark:border-slate-800 border-slate-200
        `}
      >
        <ul role="list" className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="
                  block px-3 py-2.5 rounded-md text-sm font-medium
                  dark:text-slate-300 text-slate-700
                  dark:hover:bg-slate-800 hover:bg-slate-100
                  dark:hover:text-white hover:text-slate-900
                  transition-colors
                "
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t dark:border-slate-800 border-slate-200 mt-1">
            <a
              href={siteConfig.cvPath}
              download
              onClick={() => { track("cv_download"); closeMenu(); }}
              className="
                flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium
                text-accent dark:text-accent
                dark:hover:bg-slate-800 hover:bg-slate-100
                transition-colors
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Télécharger mon CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
