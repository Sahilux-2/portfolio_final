import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

function SparkleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
    </svg>
  );
}

export function BreadcrumbHeader({ title }: { title: string }) {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbfbfa]/90 backdrop-blur-md border-b border-black/[0.04] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px]">
          <Link
            to="/#case-study"
            className="group flex items-center gap-1.5 text-[#6e6d97] hover:text-[#0d0b36] font-['Satoshi:Medium',sans-serif] transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Work</span>
          </Link>
          <span className="text-[#a1a1aa] font-light">/</span>
          <span className="text-[#0d0b36] font-['Satoshi:Bold',sans-serif] truncate max-w-[180px] sm:max-w-none">
            {title}
          </span>
        </div>

        {/* Right: Sound toggle + Sparkle Icon */}
        <div className="flex items-center gap-3">
          {/* Subtle Sound player button */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-['Satoshi:Medium',sans-serif] text-[#6e6d97] hover:text-[#0d0b36] hover:bg-black/5 transition-colors cursor-pointer"
            title={isPlaying ? "Pause music" : "Play music"}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <>
                <Pause className="size-3.5" />
                <span className="hidden sm:inline text-[11px]">Audio on</span>
              </>
            ) : (
              <>
                <Play className="size-3.5" />
                <span className="hidden sm:inline text-[11px]">Audio</span>
              </>
            )}
          </button>

          {/* 8-point celestial sparkle icon matching screenshots */}
          <button
            aria-label="Theme aesthetic sparkle"
            className="p-1.5 rounded-full text-[#6e6d97] hover:text-[#0d0b36] hover:bg-black/5 transition-all hover:rotate-45 cursor-pointer"
          >
            <SparkleIcon className="size-4.5 sm:size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
