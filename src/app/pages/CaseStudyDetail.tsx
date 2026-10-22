import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";
import { BreadcrumbHeader } from "../components/case-study/BreadcrumbHeader";
import { SidebarToc } from "../components/case-study/SidebarToc";
import { CaseStudyMarkdown } from "../components/case-study/CaseStudyMarkdown";
import {
  desktopTocLabel,
  isUserStorySection,
  PICKWISE_CASE_STUDY,
} from "../data/caseStudies";
import svgPaths from "../imports/svg-asll6uiju1";

function Socials({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px] sm:size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Socials">{children}</g>
      </svg>
    </div>
  );
}

/** Page title matches TOC label; em-dash suffix becomes a supporting deck line. */
function SectionHeading({ label, heading }: { label: string; heading: string }) {
  const parts = heading.split(" — ");
  const deck = parts.length > 1 ? parts.slice(1).join(" — ").trim() : null;

  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="max-w-[760px] font-editorial text-[26px] sm:text-[34px] md:text-[40px] leading-[1.15] text-[#0d0b36] tracking-tight text-balance">
        <span className="lg:hidden">{label}</span>
        <span className="hidden lg:inline">{desktopTocLabel(label)}</span>
      </h2>
      {deck && (
        <p className="mt-2 sm:mt-2.5 max-w-[640px] font-['Satoshi:Medium',sans-serif] text-[15px] sm:text-[17px] leading-snug text-[#6e6d97]">
          {deck}
        </p>
      )}
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = PICKWISE_CASE_STUDY;
  const [activeSection, setActiveSection] = useState<string>("overview");
  /** Which user-story submenu is open — driven by click / settled spy, not mid-scroll. */
  const [expandedTocId, setExpandedTocId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  /** While set, scroll-spy is paused so TOC doesn't flicker during smooth scroll. */
  const scrollLockRef = useRef<string | null>(null);
  const scrollUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getScrollTarget = (id: string): HTMLElement | null =>
    sectionRefs.current[id] ?? document.getElementById(id);

  const scrollOffset = () => (window.innerWidth < 1024 ? 116 : 80);

  const distanceToTarget = (id: string) => {
    const el = getScrollTarget(id);
    if (!el) return Infinity;
    const targetTop =
      el.getBoundingClientRect().top + window.scrollY - scrollOffset();
    return Math.abs(window.scrollY - targetTop);
  };

  const clearScrollLock = () => {
    scrollLockRef.current = null;
    if (scrollUnlockTimerRef.current) {
      clearTimeout(scrollUnlockTimerRef.current);
      scrollUnlockTimerRef.current = null;
    }
  };

  const tocParentId = (id: string): string | null => {
    for (const item of caseStudy.toc) {
      if (item.id === id) return item.id;
      if (item.children?.some((child) => child.id === id)) return item.id;
    }
    return null;
  };

  const expandForId = (id: string) => {
    const parent = tocParentId(id);
    const item = parent
      ? caseStudy.toc.find((entry) => entry.id === parent)
      : undefined;
    setExpandedTocId(item?.children?.length ? parent : null);
  };

  // Robust scroll spy — sections + user-story subsections
  useEffect(() => {
    const applySpy = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;
      const headerOffset = isMobile ? 120 : 160;

      const spyIds = caseStudy.toc.flatMap((item) => [
        item.id,
        ...(item.children?.map((c) => c.id) ?? []),
      ]);

      for (let i = spyIds.length - 1; i >= 0; i--) {
        const id = spyIds[i];
        const el = getScrollTarget(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          if (scrollY >= top - 30) {
            setActiveSection(id);
            expandForId(id);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      const lockedId = scrollLockRef.current;
      if (lockedId) {
        // Stay locked until we actually reach the clicked target — prevents the
        // previous story submenu from flashing open mid-scroll.
        if (distanceToTarget(lockedId) > 12) return;
        clearScrollLock();
      }
      applySpy();
    };

    const handleScrollEnd = () => {
      if (!scrollLockRef.current) return;
      if (distanceToTarget(scrollLockRef.current) > 12) return;
      clearScrollLock();
      applySpy();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd);
    applySpy();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      if (scrollUnlockTimerRef.current) clearTimeout(scrollUnlockTimerRef.current);
    };
  }, [caseStudy.toc]);

  const scrollToSection = (id: string) => {
    const el = getScrollTarget(id);
    if (!el) return;

    const targetTop =
      el.getBoundingClientRect().top + window.scrollY - scrollOffset();

    // Pin active + expanded menu to the click immediately; ignore spy until arrived.
    if (scrollUnlockTimerRef.current) clearTimeout(scrollUnlockTimerRef.current);
    scrollLockRef.current = id;
    setActiveSection(id);
    expandForId(id);
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    // Safety unlock if scrollend never fires (already at target / unsupported).
    scrollUnlockTimerRef.current = setTimeout(() => {
      if (scrollLockRef.current === id) clearScrollLock();
    }, 1600);
  };

  if (slug !== caseStudy.slug) {
    return <Navigate to="/#case-study" replace />;
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0d0b36] selection:bg-[#0d0b36] selection:text-white relative">
      <BreadcrumbHeader title={caseStudy.title} />

      {/* Main Content Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-16 sm:pb-24">
        {/* 2-Column Layout: Sidebar TOC on Left + Content on Right */}
        <div className="relative lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-8 xl:gap-14 items-start">
          {/* Left Table of Contents */}
          <SidebarToc
            items={caseStudy.toc}
            activeId={activeSection}
            expandedId={expandedTocId}
            onSelect={scrollToSection}
          />

          {/* Right Main Article Stream */}
          <article className="max-w-[840px] w-full min-w-0">
            {caseStudy.sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-mt-32 sm:scroll-mt-28 mb-14 pb-12 sm:mb-24 sm:pb-16 border-b border-black/[0.06] last:border-b-0 last:mb-4 last:pb-0"
              >
                {idx === 0 ? (
                  <h2 className="max-w-[760px] font-editorial text-[26px] sm:text-[36px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-3 text-balance">
                    {caseStudy.subtitle}
                  </h2>
                ) : (
                  <SectionHeading label={section.label} heading={section.heading!} />
                )}
                <CaseStudyMarkdown
                  variant={idx === 0 ? "overview" : "default"}
                  headingIdPrefix={
                    isUserStorySection(section.label) ? section.id : undefined
                  }
                >
                  {section.body}
                </CaseStudyMarkdown>

              </section>
            ))}
          </article>
        </div>
      </main>

      {/* Case Study Footer matching Portfolio Design System */}
      <footer className="bg-[#f0f0f7] border-t border-black/[0.04] py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-['Editor\'s_Note:Light_Italic',sans-serif] italic text-xl sm:text-3xl text-[#6e6d97] leading-snug">
              Let&apos;s build something meaningful.
            </h3>
            <a
              href="mailto:sahilsin04@gmail.com"
              className="font-['Satoshi:Bold_Italic',sans-serif] italic text-base sm:text-xl text-[#6e6d97] hover:text-[#0d0b36] underline decoration-dotted transition-colors"
            >
              sahilsin04@gmail.com
            </a>
          </div>

          <div className="flex gap-4 items-center">
            <a
              href="https://www.linkedin.com/in/sahilsinha2004"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity active:scale-95"
            >
              <Socials>
                <path d={svgPaths.p2b9e5d00} fill="var(--fill-0, #6E6D97)" id="Shape" />
              </Socials>
            </a>
            <a
              href="https://x.com/Sahilsinhaux"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity active:scale-95"
            >
              <Socials>
                <path d={svgPaths.p3a83a100} fill="var(--fill-0, #6E6D97)" id="Vector" />
              </Socials>
            </a>
            <a
              href="https://www.instagram.com/sahil_sinhaaa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity active:scale-95"
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
