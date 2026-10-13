import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { BreadcrumbHeader } from "../components/case-study/BreadcrumbHeader";
import { SidebarToc } from "../components/case-study/SidebarToc";
import { StackDiagram } from "../components/case-study/StackDiagram";
import {
  MomentsPhoneMockup,
  OnboardingPhoneMockup,
  PrototypePhoneCard,
} from "../components/case-study/PhoneMockup";
import { GrainOverlay } from "../components/case-study/GrainOverlay";
import { OPENAI_HARDWARE_CASE_STUDY } from "../data/caseStudies";
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
  const caseStudy = OPENAI_HARDWARE_CASE_STUDY;
  const [activeSection, setActiveSection] = useState<string>("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 110 : 80;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - offset;

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("smooth-scroll-to", { detail: { top: targetTop } })
        );
      } else {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
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
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[500px] lg:h-[540px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_-20px_rgba(232,74,39,0.25)] flex items-center justify-center p-6 sm:p-12 border border-black/[0.04]">
            {/* Animated radiant gradient mesh background matching Screenshot 1 */}
            <div
              className="absolute inset-0 size-full"
              style={{
                background: `radial-gradient(circle at 30% 40%, #f59e0b 0%, #ea580c 45%, #ec4899 75%, #8b5cf6 100%)`,
                filter: "blur(20px)",
                transform: "scale(1.1)",
              }}
            />
            {/* Subtle light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />

            {/* Centered Hero Title */}
            <h1 className="relative z-10 text-white font-['Satoshi:Bold',sans-serif] text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-center drop-shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
              {caseStudy.title}
            </h1>
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
            {/* SECTION 1: OVERVIEW (Screenshot 2) */}
            <section
              id="overview"
              ref={(el) => (sectionRefs.current["overview"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              {/* Signature orange square accent matching Screenshot 2 */}
              <div className="size-3.5 bg-[#e84a27] rounded-[2px] mb-4 shadow-xs" />

              {/* Kicker label */}
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Overview
              </div>

              {/* Main Editorial Headline */}
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                {caseStudy.subtitle}
              </h2>

              {/* Subtitle / Lead Paragraph */}
              <p className="font-['Satoshi:Medium',sans-serif] text-[16px] sm:text-[18px] leading-relaxed text-[#52525b] mb-10 max-w-[760px]">
                {caseStudy.overview.lead}
              </p>

              {/* 3-Column Pillar Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 mb-12">
                {caseStudy.overview.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <h3 className="font-['Satoshi:Bold',sans-serif] text-[15px] sm:text-[16px] text-[#0d0b36]">
                      {pillar.title}
                    </h3>
                    <p className="font-['Satoshi:Regular',sans-serif] text-[13.5px] sm:text-[14px] leading-relaxed text-[#6e6d97]">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Subsection: Problem Statement */}
              <div className="mt-12 pt-8 border-t border-black/[0.04]">
                <h3 className="font-editorial text-[24px] sm:text-[28px] text-[#0d0b36] mb-3">
                  {caseStudy.overview.problemTitle}
                </h3>
                <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-6">
                  {caseStudy.overview.problemDescription}
                </p>

                {/* THE STACK Diagram */}
                <StackDiagram />

                <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mt-6">
                  {caseStudy.overview.problemFollowUp}
                </p>
              </div>
            </section>

            {/* SECTION 2: SOLUTION */}
            <section
              id="solution"
              ref={(el) => (sectionRefs.current["solution"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Solution
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                Introducing Tomo: OpenAI&apos;s physical companion
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-6">
                Rather than competing with smartphones as an all-in-one glass slab, Tomo is designed as an ambient capture device. It exists at the periphery of your life, recording key conversational moments with low latency and total privacy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="bg-[#f2f3f6] rounded-2xl p-6 border border-black/[0.04]">
                  <div className="size-2 bg-[#e84a27] rounded-full mb-3" />
                  <h4 className="font-['Satoshi:Bold',sans-serif] text-[16px] text-[#0d0b36] mb-1.5">
                    Ambient Audio Memory
                  </h4>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[13.5px] text-[#6e6d97] leading-relaxed">
                    Always-aware audio processing that buffers speech locally, only persisting meaningful milestones you choose to retain.
                  </p>
                </div>

                <div className="bg-[#f2f3f6] rounded-2xl p-6 border border-black/[0.04]">
                  <div className="size-2 bg-[#e84a27] rounded-full mb-3" />
                  <h4 className="font-['Satoshi:Bold',sans-serif] text-[16px] text-[#0d0b36] mb-1.5">
                    Tactile Intent Shutter
                  </h4>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[13.5px] text-[#6e6d97] leading-relaxed">
                    A physical mute dial with unmistakable click detents, making device state immediately perceptible to you and those around you.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: CORE FLOWS (Screenshot 3) */}
            <section
              id="core-flows"
              ref={(el) => (sectionRefs.current["core-flows"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              {/* Signature orange square accent matching Screenshot 3 */}
              <div className="size-3.5 bg-[#e84a27] rounded-[2px] mb-4 shadow-xs" />

              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Core Flows
              </div>

              {/* Flow 1: Review a specific moment */}
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 md:gap-12 items-center mb-16">
                <div>
                  <MomentsPhoneMockup />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-['Satoshi:Bold',sans-serif] text-[20px] sm:text-[24px] text-[#0d0b36] mb-2">
                    Review a specific moment
                  </h3>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#6e6d97]">
                    Tap into each moment to see all the important things that happened. Tomo synthesizes location, people, and takeaways so you never miss a detail.
                  </p>
                </div>
              </div>

              {/* Flow 2: Onboarding to Tomo */}
              <div className="pt-10 border-t border-black/[0.04]">
                <h3 className="font-editorial text-[28px] sm:text-[34px] text-[#0d0b36] mb-2">
                  Onboarding to Tomo
                </h3>
                <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] text-[#6e6d97] mb-8">
                  Designing for an experience that will show users how Moments work and the immediate value of Tomo.
                </p>

                <div className="max-w-[420px] mx-auto">
                  <OnboardingPhoneMockup />
                </div>
              </div>
            </section>

            {/* SECTION 4: RESEARCH */}
            <section
              id="research"
              ref={(el) => (sectionRefs.current["research"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Research
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                Understanding real-world friction
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-6">
                We conducted deep qualitative interviews with 24 knowledge workers and creatives. The primary friction in using modern AI tools wasn&apos;t intelligence—it was the cognitive load of transcribing reality into text prompts.
              </p>

              <blockquote className="my-8 pl-6 border-l-2 border-[#e84a27] font-editorial italic text-[20px] sm:text-[22px] text-[#334155] leading-relaxed">
                &ldquo;By the time I unlock my phone, find the ChatGPT app, and type what my client just said, the moment has already passed.&rdquo;
              </blockquote>
            </section>

            {/* SECTION 5: EXPLORING FORM FACTORS */}
            <section
              id="form-factors"
              ref={(el) => (sectionRefs.current["form-factors"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Exploring Form Factors
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                Wearable pin vs. Pocket pebble vs. Glasses
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-8">
                We explored multiple physical form factors to test social comfort, thermal viability, and accessibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f2f3f6] rounded-2xl p-5 border border-black/[0.04]">
                  <span className="text-[11px] font-mono uppercase text-[#e84a27] font-semibold">Option A</span>
                  <h4 className="font-['Satoshi:Bold',sans-serif] text-[15px] text-[#0d0b36] mt-2 mb-1">Wearable Pin</h4>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[13px] text-[#6e6d97]">High camera visibility caused social anxiety in intimate spaces.</p>
                </div>
                <div className="bg-[#f2f3f6] rounded-2xl p-5 border border-[#e84a27]/30 shadow-xs">
                  <span className="text-[11px] font-mono uppercase text-[#e84a27] font-semibold">Selected</span>
                  <h4 className="font-['Satoshi:Bold',sans-serif] text-[15px] text-[#0d0b36] mt-2 mb-1">Pocket Pebble</h4>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[13px] text-[#6e6d97]">Subtle hand-held pebble with voice trigger and haptic confirmations.</p>
                </div>
                <div className="bg-[#f2f3f6] rounded-2xl p-5 border border-black/[0.04]">
                  <span className="text-[11px] font-mono uppercase text-[#e84a27] font-semibold">Option C</span>
                  <h4 className="font-['Satoshi:Bold',sans-serif] text-[15px] text-[#0d0b36] mt-2 mb-1">Smart Frames</h4>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[13px] text-[#6e6d97]">Severe battery weight and aesthetic prescription friction.</p>
                </div>
              </div>
            </section>

            {/* SECTION 6: PROTOTYPING AND TESTING (Screenshot 4) */}
            <section
              id="prototyping"
              ref={(el) => (sectionRefs.current["prototyping"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              {/* Signature orange square accent matching Screenshot 4 */}
              <div className="size-3.5 bg-[#e84a27] rounded-[2px] mb-4 shadow-xs" />

              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Prototyping and Testing
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-3">
                Prototyping interfaces for real-world memory
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] text-[#52525b] mb-12">
                We explored a ton of concepts for these 3 strategic directions, here are select few of them:
              </p>

              {/* Group 1: ChatGPT Feature Power-ups */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-10 items-center mb-16">
                <div className="grid grid-cols-2 gap-4">
                  <PrototypePhoneCard
                    caption="Enhanced Prompt Suggestions"
                    type="prompt-suggestions"
                  />
                  <PrototypePhoneCard
                    caption="Background Video Call Mode"
                    type="video-call"
                  />
                </div>
                <div>
                  <h3 className="font-['Satoshi:Bold',sans-serif] text-[18px] sm:text-[20px] text-[#0d0b36] mb-2">
                    ChatGPT Feature Power-ups
                  </h3>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[14px] sm:text-[15px] text-[#6e6d97] leading-relaxed">
                    Using real-life context to enhance existing features in the app.
                  </p>
                </div>
              </div>

              {/* Group 2: In-the-moment Canvas */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-10 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <PrototypePhoneCard
                    caption="Deconstructed AR"
                    type="ar-hud"
                  />
                  <PrototypePhoneCard
                    caption="Transcript-Driven UI"
                    type="transcript-ui"
                  />
                </div>
                <div>
                  <h3 className="font-['Satoshi:Bold',sans-serif] text-[18px] sm:text-[20px] text-[#0d0b36] mb-2">
                    In-the-moment Canvas
                  </h3>
                  <p className="font-['Satoshi:Regular',sans-serif] text-[14px] sm:text-[15px] text-[#6e6d97] leading-relaxed">
                    Exploring interfaces focused on real-time assistance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: DESIGN DECISIONS */}
            <section
              id="decisions"
              ref={(el) => (sectionRefs.current["decisions"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Design Decisions
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                Prioritizing agency over automation
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-6">
                A critical design tenet was that AI should never make commitments or send communications without explicit human confirmation. The companion drafts; the user approves.
              </p>
            </section>

            {/* SECTION 8: HARDWARE CONSTRAINTS */}
            <section
              id="hardware-constraints"
              ref={(el) => (sectionRefs.current["hardware-constraints"] = el)}
              className="scroll-mt-28 mb-24 pb-16 border-b border-black/[0.06]"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Hardware Constraints
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                Thermal dissipation and battery envelope
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-6">
                By offloading intensive transformer reasoning to edge cloud servers and keeping only lightweight audio VAD (Voice Activity Detection) on-device, we achieved an 18-hour continuous battery envelope in a 42g chassis.
              </p>
            </section>

            {/* SECTION 9: REFLECTION */}
            <section
              id="reflection"
              ref={(el) => (sectionRefs.current["reflection"] = el)}
              className="scroll-mt-28 mb-16"
            >
              <div className="text-[13px] font-['Satoshi:Medium',sans-serif] uppercase tracking-wider text-[#6e6d97] mb-2.5">
                Reflection
              </div>
              <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
                The future of intelligence is calm
              </h2>
              <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[#52525b] mb-8">
                The most successful consumer hardware isn&apos;t the one that demands the most attention; it&apos;s the one that gives you back your presence in the physical world while keeping digital intelligence quietly on tap.
              </p>

              {/* Bottom Navigation between Case Studies */}
              <div className="mt-12 pt-8 border-t border-black/[0.06] flex items-center justify-between">
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
            </section>
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
