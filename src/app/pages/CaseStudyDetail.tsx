import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router";
import { BreadcrumbHeader } from "../components/case-study/BreadcrumbHeader";
import { SidebarToc } from "../components/case-study/SidebarToc";
import { CaseStudyMarkdown } from "../components/case-study/CaseStudyMarkdown";
import { PICKWISE_CASE_STUDY } from "../data/caseStudies";
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

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = PICKWISE_CASE_STUDY;
  const [activeSection, setActiveSection] = useState<string>("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Robust scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth < 1024;
      const headerOffset = isMobile ? 120 : 160;

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

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 116 : 80;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
      setActiveSection(id);
    }
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
                  <h2 className="max-w-[760px] font-editorial text-[26px] sm:text-[34px] md:text-[40px] leading-[1.15] text-[#0d0b36] tracking-tight mb-6 sm:mb-8 text-balance">
                    {section.heading!.includes(" — ")
                      ? section.heading!.split(" — ").slice(1).join(" — ")
                      : section.heading}
                  </h2>
                )}
                <CaseStudyMarkdown
                  className={
                    idx === 0
                      ? "[&>p:first-of-type]:max-w-[700px] [&>p:first-of-type]:text-[16px] sm:[&>p:first-of-type]:text-[18px] [&>p:first-of-type]:text-[#3a3a4d] [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:font-['Satoshi:Bold',sans-serif] [&>h3]:text-[12px] sm:[&>h3]:text-[13px] [&>h3]:uppercase [&>h3]:tracking-[0.08em] [&>h3]:text-[#6e6d97]"
                      : undefined
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
