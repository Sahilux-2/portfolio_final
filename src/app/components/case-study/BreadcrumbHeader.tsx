import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function BreadcrumbHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.04] transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-[14px] min-w-0">
          <Link
            to="/#case-study"
            className="group flex items-center gap-1.5 py-2 -my-2 px-1 -mx-1 text-[#6e6d97] hover:text-[#0d0b36] font-['Satoshi:Medium',sans-serif] transition-colors shrink-0 active:opacity-70"
            aria-label="Back to Work"
          >
            <ArrowLeft className="size-4 sm:size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Work</span>
          </Link>
          <span className="text-[#6e6d97] font-light select-none">/</span>
          <span className="text-[#0d0b36] font-['Satoshi:Bold',sans-serif] truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>
      </div>
    </header>
  );
}
