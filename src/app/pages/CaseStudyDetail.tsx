import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BreadcrumbHeader } from "../components/case-study/BreadcrumbHeader";
import { SidebarToc } from "../components/case-study/SidebarToc";
import { CaseStudyMarkdown } from "../components/case-study/CaseStudyMarkdown";
import { GrainOverlay } from "../components/case-study/GrainOverlay";
import { PICKWISE_CASE_STUDY } from "../data/caseStudies";
import svgPaths from "../imports/svg-asll6uiju1";
import heroImage from "../../../Hero image_pickwise_casestudy.svg";

function Socials({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px] sm:size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Socials">{children}</g>
      </svg>
    </div>
  );
}

export default function CaseStudyDetail() {
  const caseStudy = PICKWISE_CASE_STUDY;
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const heroShellRef = useRef<HTMLDivElement | null>(null);
  const heroExpandRef = useRef<HTMLButtonElement | null>(null);
  const heroExpandedRef = useRef(false);
  const heroAnimatingRef = useRef(false);

  heroExpandedRef.current = heroExpanded;
  heroAnimatingRef.current = heroAnimating;

  // Robust scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 160;

      for (let i = caseStudy.toc.length - 1; i >= 0; i--) {
        const item = caseStudy.toc[i];
        const el = sectionRefs.current[item.id];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          if (scrollY >= top - 30) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [caseStudy.toc]);

  const applyHeroRect = (
    el: HTMLElement,
    rect: { top: number; left: number; width: number; height: number },
    radius: string
  ) => {
    el.style.top = `${rect.top}px`;
    el.style.left = `${rect.left}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.borderRadius = radius;
  };

  const clearHeroRect = (el: HTMLElement) => {
    el.style.transition = "";
    el.style.top = "";
    el.style.left = "";
    el.style.width = "";
    el.style.height = "";
    el.style.borderRadius = "";
  };

  /** Match absolute inset-0 inside the shell (content box, not border box). */
  const getShellContentRect = (shell: HTMLElement) => {
    const rect = shell.getBoundingClientRect();
    const cs = getComputedStyle(shell);
    const bt = parseFloat(cs.borderTopWidth) || 0;
    const bl = parseFloat(cs.borderLeftWidth) || 0;
    const br = parseFloat(cs.borderRightWidth) || 0;
    const bb = parseFloat(cs.borderBottomWidth) || 0;
    return {
      top: rect.top + bt,
      left: rect.left + bl,
      width: rect.width - bl - br,
      height: rect.height - bt - bb,
      radius: cs.borderRadius,
    };
  };

  const heroTransition =
    "top 250ms cubic-bezier(0.22, 1, 0.36, 1), left 250ms cubic-bezier(0.22, 1, 0.36, 1), width 250ms cubic-bezier(0.22, 1, 0.36, 1), height 250ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 250ms cubic-bezier(0.22, 1, 0.36, 1)";

  const collapseHero = () => {
    const shell = heroShellRef.current;
    const expandEl = heroExpandRef.current;
    if (!shell || !expandEl || !heroExpandedRef.current || heroAnimatingRef.current) return;

    const { top, left, width, height, radius } = getShellContentRect(shell);

    heroAnimatingRef.current = true;
    setHeroAnimating(true);
    expandEl.style.transition = heroTransition;
    applyHeroRect(expandEl, { top, left, width, height }, radius);

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;
      expandEl.removeEventListener("transitionend", onEnd);
      expandEl.style.transition = "none";
      // Hide overlay first so the in-shell image shows through during the position reset.
      expandEl.style.opacity = "0";

      heroExpandedRef.current = false;
      heroAnimatingRef.current = false;
      flushSync(() => {
        setHeroExpanded(false);
        setHeroAnimating(false);
      });
      clearHeroRect(expandEl);
      expandEl.style.opacity = "";
    };
    expandEl.addEventListener("transitionend", onEnd);
  };

  const expandHero = () => {
    const shell = heroShellRef.current;
    const expandEl = heroExpandRef.current;
    if (!shell || !expandEl || heroExpandedRef.current || heroAnimatingRef.current) return;

    const { top, left, width, height, radius } = getShellContentRect(shell);

    heroAnimatingRef.current = true;
    heroExpandedRef.current = true;
    setHeroAnimating(true);
    setHeroExpanded(true);

    applyHeroRect(expandEl, { top, left, width, height }, radius);
    expandEl.style.transition = "none";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        expandEl.style.transition = heroTransition;
        applyHeroRect(
          expandEl,
          { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
          "0px"
        );
      });
    });

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;
      heroAnimatingRef.current = false;
      setHeroAnimating(false);
      expandEl.removeEventListener("transitionend", onEnd);
    };
    expandEl.addEventListener("transitionend", onEnd);
  };

  const toggleHero = () => {
    if (heroExpandedRef.current) collapseHero();
    else expandHero();
  };

  useEffect(() => {
    if (!heroExpanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapseHero();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [heroExpanded]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 110 : 80;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#0d0b36] selection:bg-[#e84a27] selection:text-white relative">
      <GrainOverlay />
      <BreadcrumbHeader title={caseStudy.title} />

      {/* Main Content Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24">
        {/* Hero Section Container (Image 1) */}
        <div className="w-full mb-12 sm:mb-20">
          <div
            ref={heroShellRef}
            className="relative w-full h-[280px] sm:h-[420px] md:h-[500px] lg:h-[540px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(232,74,39,0.25)] border border-black/[0.04]"
          >
            {/* Resting image — visible during collapse handoff so position reset never flashes */}
            <img
              src={heroImage}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover pointer-events-none"
            />
            <button
              ref={heroExpandRef}
              type="button"
              aria-label={heroExpanded ? "Collapse hero image" : "Expand hero image"}
              onClick={toggleHero}
              className={
                heroExpanded
                  ? "fixed z-[100] overflow-hidden cursor-zoom-out border-0 p-0 bg-transparent"
                  : "absolute inset-0 z-10 overflow-hidden cursor-zoom-in border-0 p-0 bg-transparent"
              }
            >
              <img
                src={heroImage}
                alt={caseStudy.title}
                className="size-full object-cover pointer-events-none"
              />
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar TOC on Left + Content on Right (Images 2, 3, 4) */}
        <div className="relative lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-8 xl:gap-14 items-start">
          {/* Left Table of Contents */}
          <SidebarToc
            items={caseStudy.toc}
            activeId={activeSection}
            onSelect={scrollToSection}
          />

          {/* Right Main Article Stream */}
          <article className="max-w-[840px] w-full min-w-0">
            {caseStudy.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-mt-28 mb-20 pb-14 border-b border-black/[0.06]"
              >
                <div className="size-3.5 bg-[#e84a27] rounded-[2px] mb-4 shadow-xs" />
                <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                  {section.number ? `${section.number} · ${section.label}` : section.label}
                </div>
                {idx === 0 ? (
                  <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                    {caseStudy.subtitle}
                  </h2>
                ) : (
                  <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-6">
                    {section.heading!.includes(" — ")
                      ? section.heading!.split(" — ").slice(1).join(" — ")
                      : section.heading}
                  </h2>
                )}
                <CaseStudyMarkdown>{section.body}</CaseStudyMarkdown>
              </section>
            ))}

            <div className="mt-4 pt-8 border-t border-black/[0.06] flex items-center justify-between">
              <Link
                to="/#case-study"
                className="inline-flex items-center gap-2 text-sm font-['Satoshi:Bold',sans-serif] text-[#6e6d97] hover:text-[#0d0b36] transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span>Back to all projects</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-['Satoshi:Bold',sans-serif] text-[#e84a27] hover:text-[#0d0b36] transition-colors"
              >
                <span>Home</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        </div>
      </main>

      {/* Case Study Footer matching Portfolio Design System */}
      <footer className="bg-[#f0f0f7] border-t border-black/[0.04] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-['Editor\'s_Note:Light_Italic',sans-serif] italic text-2xl sm:text-3xl text-[#6e6d97]">
              Let&apos;s build something meaningful.
            </h3>
            <a
              href="mailto:sahilsin04@gmail.com"
              className="font-['Satoshi:Bold_Italic',sans-serif] italic text-lg sm:text-xl text-[#6e6d97] hover:text-[#0d0b36] underline decoration-dotted transition-colors"
            >
              sahilsin04@gmail.com
            </a>
          </div>

          <div className="flex gap-4 items-center">
            <a
              href="https://www.linkedin.com/in/sahilsinha2004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Socials>
                <path d={svgPaths.p2b9e5d00} fill="var(--fill-0, #6E6D97)" id="Shape" />
              </Socials>
            </a>
            <a
              href="https://x.com/Sahilsinhaux"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Socials>
                <path d={svgPaths.p3a83a100} fill="var(--fill-0, #6E6D97)" id="Vector" />
              </Socials>
            </a>
            <a
              href="https://www.instagram.com/sahil_sinhaaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Socials>
                <path d={svgPaths.p36afbb00} fill="var(--fill-0, #6E6D97)" id="Shape" />
              </Socials>
            </a>
          </div>

          <div className="pt-4 border-t border-[#d1d1ed] text-xs sm:text-sm text-[#6e6d97] font-['Satoshi:Medium',sans-serif]">
            © 2026 Sahil Sinha. Designed in Figma. Built with AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
