import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function BreadcrumbHeader({ title }: { title: string }) {
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
      </div>
    </header>
  );
}
