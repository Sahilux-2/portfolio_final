import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import svgPaths from "./svg-asll6uiju1";
import heroSvg from "../../../Hero container.svg";
import bgMusic from "../../../quietphase-instrumental-relax-496352.mp3";

function Socials({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Socials">{children}</g>
      </svg>
    </div>
  );
}

type HText1Props = {
  text: string;
};

function HText1({ text }: HText1Props) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[24px] sm:leading-[24px] md:leading-[32px] lg:leading-[30px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[18px] sm:text-[18px] md:text-[24px] lg:text-[24px] tracking-[-0.01em] md:tracking-[-0.24px] lg:tracking-[-0.01em]">{text}</p>
    </div>
  );
}

type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-[#e2e2ed] h-[300px] sm:h-[300px] md:h-[400px] lg:h-[468px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex items-start p-[16px] sm:p-[16px] md:p-[24px] lg:p-[24px] relative size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-nowrap tracking-[-0.16px]">{text}</p>
      </div>
    </div>
  );
}

type HTextProps = {
  text: string;
};

function HText({ text }: HTextProps) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="basis-0 font-['Editor\'s_Note:Light_Italic',sans-serif] grow italic leading-[30px] sm:leading-[30px] md:leading-[46px] lg:leading-[46px] min-h-px min-w-px relative shrink-0 text-[#0d0b36] text-[24px] sm:text-[24px] md:text-[40px] lg:text-[40px]">{text}</p>
    </div>
  );
}

export default function PortfolioWeb() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const aiBuildsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementTop = ref.current.getBoundingClientRect().top + window.scrollY;
      const isMobile = window.innerWidth < 640;
      const offset = ref === heroRef ? 0 : (isMobile ? 80 : 120);
      const targetTop = elementTop - offset;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("smooth-scroll-to", { detail: { top: targetTop } }));
      } else {
        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const fadeAudio = (targetVolume: number, duration: number, callback?: () => void) => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDifference = targetVolume - startVolume;

    if (volumeDifference === 0) {
      if (callback) callback();
      return;
    }

    const stepTime = 50;
    const totalSteps = duration / stepTime;
    const volumeStep = volumeDifference / totalSteps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep++;
      const newVolume = startVolume + volumeStep * currentStep;

      audio.volume = Math.max(0, Math.min(1, newVolume));

      if (currentStep >= totalSteps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.volume = targetVolume;
        if (callback) callback();
      }
    }, stepTime);
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic);
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      setIsPlaying(false);
      fadeAudio(0, 600, () => {
        audio.pause();
      });
    } else {
      setIsPlaying(true);
      if (audio.paused) {
        audio.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
      fadeAudio(1, 600);
    }
  };

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white relative w-full min-h-screen" data-name="Portfolio web">
      {/* Hero wrapper */}
      <div ref={heroRef} className="bg-white content-stretch flex flex-col items-center justify-center w-full pb-[60px] sm:pb-[60px] md:pb-[120px] lg:pb-[120px] pt-[132px] sm:pt-[132px] md:pt-[178px] lg:pt-[238px] px-4 sm:px-4 md:px-6 lg:px-6" data-name="Hero wrapper">
        <div className="content-stretch flex flex-col gap-[60px] md:gap-[40px] sm:gap-[30px] items-center justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          {/* Nav bar container */}
          <div className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none" data-name="Nav bar container">
            {/* Background layer for progressive blur and gradient (does not affect child elements opacity) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.083) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.083) 100%)",
              }}
            />
            <div className="flex flex-col items-center justify-center size-full relative z-10">
              <div className="content-stretch flex flex-col items-center justify-center p-[24px] sm:p-[24px] md:py-[40px] md:px-[60px] lg:p-[60px] relative w-full">
                <div className="bg-[#333] content-stretch flex flex-col items-start max-w-[430px] w-full p-[2px] relative rounded-[18px] shrink-0 pointer-events-auto" data-name="Nab bar">
                  <div className="bg-gradient-to-b content-stretch flex from-[#404040] gap-[20px] items-center justify-center overflow-hidden px-[20px] py-[16px] relative rounded-[16px] shadow-[0px_34px_34px_-12px_rgba(0,0,0,0.2),0px_12px_12px_-2px_rgba(0,0,0,0.16),0px_4px_4px_0px_rgba(0,0,0,0.25),inset_0px_-1px_2px_0px_rgba(0,0,0,0.99),inset_0px_1px_0.7px_0px_rgba(255,255,255,0.26)] shrink-0 to-[#292929] w-full" data-name="Inner">
                    <p onClick={() => scrollToSection(heroRef)} className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px] cursor-pointer hover:text-white/80 transition-colors">Home</p>
                    <p onClick={() => scrollToSection(caseStudyRef)} className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px] cursor-pointer hover:text-white/80 transition-colors">Case study</p>
                    <p onClick={() => scrollToSection(aiBuildsRef)} className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px] cursor-pointer hover:text-white/80 transition-colors">AI builds</p>
                    <p onClick={() => scrollToSection(footerRef)} className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.16px] cursor-pointer hover:text-white/80 transition-colors">Contact</p>
                    <div className="w-px h-[16px] bg-white/20 self-center shrink-0" />
                    <button
                      onClick={togglePlay}
                      className="flex items-center justify-center p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none cursor-pointer relative shrink-0"
                      aria-label={isPlaying ? "Pause music" : "Play music"}
                    >
                      {isPlaying ? (
                        <Pause className="w-[16px] h-[16px]" />
                      ) : (
                        <Play className="w-[16px] h-[16px] fill-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero container */}
          <div className="content-stretch flex flex-col gap-[60px] md:gap-[60px] sm:gap-[30px] items-center justify-center relative shrink-0 text-center w-full" data-name="Hero container">
            {/* Heading container - responsive version */}
            <div className="relative shrink-0 w-full max-w-[340px] sm:max-w-[340px] md:max-w-[600px] lg:max-w-[880px] px-4 md:px-0" data-name="Heading container">
              <img src={heroSvg} alt="Namaste, I'm Sahil Sinha. Product designer with a Builder's mindset" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Case study wrapper */}
      <div ref={caseStudyRef} className="bg-white content-stretch flex flex-col items-center justify-center w-full px-4 sm:px-4 md:px-6 lg:px-6 py-[60px] sm:py-[60px] md:py-[120px] lg:py-[120px]" data-name="Case study wrapper">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <HText text="Case study" />
          <div className="content-stretch flex flex-col gap-[30px] sm:gap-[30px] md:gap-[40px] lg:gap-[60px] items-start relative shrink-0 w-full" data-name="Case study container">
            {[...Array(2).keys()].map((_, i) => (
              <div key={i} className="content-stretch flex flex-col md:flex-col lg:flex-row gap-[24px] sm:gap-[16px] md:gap-[40px] lg:gap-[24px] items-start relative shrink-0 w-full" data-name="Case study container">
                {[...Array(2).keys()].map((_, j) => (
                  <div key={j} className="w-full lg:basis-0 content-stretch flex flex-col gap-[16px] sm:gap-[16px] md:gap-[24px] lg:gap-[24px] lg:grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
                    <div className="bg-[#e2e2ed] h-[300px] sm:h-[300px] md:h-[400px] lg:h-[468px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
                      <div className="content-stretch flex items-start p-[16px] sm:p-[16px] md:p-[24px] lg:p-[24px] relative size-full">
                        <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-nowrap tracking-[-0.16px]">WIP</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="H2">
                        <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[24px] sm:leading-[24px] md:leading-[32px] lg:leading-[30px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[18px] sm:text-[18px] md:text-[24px] lg:text-[24px] tracking-[-0.01em] md:tracking-[-0.24px] lg:tracking-[-0.01em]">Trim (B2C)</p>
                      </div>
                      <p className="font-['Satoshi:Bold',sans-serif] leading-[20px] sm:leading-[20px] md:leading-[22px] lg:leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] tracking-[-0.01em] md:tracking-[-0.16px] lg:tracking-[-0.01em] w-full">Helping users know if their subscription is worth continuing or not.</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI builds wrapper */}
      <div ref={aiBuildsRef} className="bg-white content-stretch flex flex-col items-center justify-center w-full px-4 sm:px-4 md:px-6 lg:px-6 py-[60px] sm:py-[60px] md:py-[120px] lg:py-[120px]" data-name="AI builds wrapper">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <HText text="AI builds" />
          <div className="content-stretch flex flex-col md:flex-col lg:flex-row gap-[24px] sm:gap-[16px] md:gap-[40px] lg:gap-[24px] items-start relative shrink-0 w-full" data-name="AI builds container">
            <div className="w-full lg:basis-0 content-stretch flex flex-col gap-[16px] sm:gap-[16px] md:gap-[24px] lg:gap-[24px] lg:grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
              <div className="bg-[#e2e2ed] h-[300px] sm:h-[300px] md:h-[400px] lg:h-[468px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
                <div className="content-stretch flex items-start p-[16px] sm:p-[16px] md:p-[24px] lg:p-[24px] relative size-full">
                  <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-nowrap tracking-[-0.16px]">WIP</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="H2">
                  <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[24px] sm:leading-[24px] md:leading-[32px] lg:leading-[30px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[18px] sm:text-[18px] md:text-[24px] lg:text-[24px] tracking-[-0.01em] md:tracking-[-0.24px] lg:tracking-[-0.01em]">3D fight simulator</p>
                </div>
                <p className="font-['Satoshi:Bold',sans-serif] leading-[20px] sm:leading-[20px] md:leading-[22px] lg:leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] tracking-[-0.01em] md:tracking-[-0.16px] lg:tracking-[-0.01em] w-full">Fly around New York city with your friends. Made with Anti gravity.</p>
              </div>
            </div>
            <div className="w-full lg:basis-0 content-stretch flex flex-col gap-[16px] sm:gap-[16px] md:gap-[24px] lg:gap-[24px] lg:grow items-start min-h-px min-w-px relative shrink-0" data-name="Card & text container">
              <div className="bg-[#e2e2ed] h-[300px] sm:h-[300px] md:h-[400px] lg:h-[468px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
                <div className="content-stretch flex items-start p-[16px] sm:p-[16px] md:p-[24px] lg:p-[24px] relative size-full">
                  <p className="font-['Satoshi:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] text-nowrap tracking-[-0.16px]">WIP</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text container">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="H2">
                  <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[24px] sm:leading-[24px] md:leading-[32px] lg:leading-[30px] min-h-px min-w-px not-italic relative shrink-0 text-[#0d0b36] text-[18px] sm:text-[18px] md:text-[24px] lg:text-[24px] tracking-[-0.01em] md:tracking-[-0.24px] lg:tracking-[-0.01em]">AI powered Calories tracker</p>
                </div>
                <p className="font-['Satoshi:Bold',sans-serif] leading-[20px] sm:leading-[20px] md:leading-[22px] lg:leading-[22px] max-w-[340px] not-italic relative shrink-0 text-[#6e6d97] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px] tracking-[-0.01em] md:tracking-[-0.16px] lg:tracking-[-0.01em] w-full">{`Track calories by uploading or clicking picture of the dish. Made with Gemini & Figma make.`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer wrapper */}
      <div ref={footerRef} className="bg-[#f0f0f7] content-stretch flex flex-col items-center justify-center w-full pt-[30px] sm:pt-[30px] md:pt-[60px] lg:pt-[60px] pb-[24px] px-4 sm:px-4 md:px-6 lg:px-6" data-name="Footer wrapper">
        <div className="content-stretch flex flex-col gap-[24px] sm:gap-[24px] md:gap-[40px] lg:gap-[40px] items-start justify-center max-w-[960px] relative shrink-0 w-full" data-name="Content container">
          <div className="content-stretch flex items-center max-w-[960px] relative shrink-0 w-full" data-name="H1">
            <p className="basis-0 font-['Editor\'s_Note:Light_Italic',sans-serif] grow italic leading-[30px] sm:leading-[30px] md:leading-[46px] lg:leading-[46px] min-h-px min-w-px relative shrink-0 text-[#6e6d97] text-[24px] sm:text-[24px] md:text-[40px] lg:text-[40px]">Let's build something meaningful.</p>
          </div>
          <a href="mailto:sahilsin04@gmail.com" className="[text-underline-position:from-font] decoration-dotted font-['Satoshi:Bold_Italic',sans-serif] italic leading-[22px] sm:leading-[22px] md:leading-[30px] lg:leading-[30px] relative shrink-0 text-[#6e6d97] hover:text-[#0d0b36] transition-colors text-[16px] sm:text-[16px] md:text-[24px] lg:text-[24px] tracking-[-0.01em] md:tracking-[-0.24px] lg:tracking-[-0.01em] underline break-all">sahilsin04@gmail.com</a>
          <div className="content-stretch flex gap-[16px] sm:gap-[16px] md:gap-[24px] lg:gap-[24px] items-center relative shrink-0" data-name="Socials container">
            <a href="https://www.linkedin.com/in/sahilsinha2004" target="_blank" rel="noopener noreferrer" className="block shrink-0 hover:opacity-70 transition-opacity cursor-pointer">
              <Socials>
                <path d={svgPaths.p2b9e5d00} fill="var(--fill-0, #6E6D97)" id="Shape" />
              </Socials>
            </a>
            <a href="https://x.com/Sahilsinhaux" target="_blank" rel="noopener noreferrer" className="block shrink-0 hover:opacity-70 transition-opacity cursor-pointer">
              <Socials>
                <path d={svgPaths.p3a83a100} fill="var(--fill-0, #6E6D97)" id="Vector" />
              </Socials>
            </a>
            <a href="https://www.instagram.com/sahil_sinhaaa/" target="_blank" rel="noopener noreferrer" className="block shrink-0 hover:opacity-70 transition-opacity cursor-pointer">
              <Socials>
                <path d={svgPaths.p36afbb00} fill="var(--fill-0, #6E6D97)" id="Shape" />
              </Socials>
            </a>
          </div>
          <div className="content-stretch flex items-center justify-center pb-0 pt-[16px] sm:pt-[16px] md:pt-[24px] lg:pt-[24px] px-0 relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#d1d1ed] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
            <p className="basis-0 font-['Satoshi:Bold',sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#6e6d97] text-[16px] tracking-[-0.16px] text-center md:text-left lg:text-left">© 2026 Sahil Sinha. Designed in Figma. Built with AI.</p>
          </div>
        </div>
      </div>
    </div>
  );
}