import React, { useEffect, useRef } from "react";
import { TocItem } from "../../data/caseStudies";

interface SidebarTocProps {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SidebarToc({ items, activeId, onSelect }: SidebarTocProps) {
  const activePillRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll mobile pill nav when active section changes
  useEffect(() => {
    if (activePillRef.current && mobileNavRef.current) {
      const container = mobileNavRef.current;
      const pill = activePillRef.current;
      const offset = pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <>
      {/* Mobile Sticky Horizontal Bar */}
      <div className="lg:hidden sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-black/[0.04] py-2.5 px-4 w-full">
        <div
          ref={mobileNavRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                ref={isActive ? activePillRef : null}
                onClick={() => onSelect(item.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-['Satoshi:Medium',sans-serif] transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0d0b36] text-white shadow-xs"
                    : "bg-[#f0f0f7] text-[#6e6d97] hover:text-[#0d0b36]"
                }`}
              >
                {isActive && <span className="size-1 bg-white rounded-full" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sticky Left Sidebar Navigation */}
      <aside className="hidden lg:block w-[180px] xl:w-[200px] shrink-0 sticky top-24 self-start">
        <nav className="flex flex-col gap-3" aria-label="Table of contents">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`group flex items-center gap-2 text-left text-[14px] leading-tight transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#0d0b36] font-['Satoshi:Bold',sans-serif]"
                    : "text-[#6e6d97] hover:text-[#0d0b36] font-['Satoshi:Medium',sans-serif]"
                }`}
              >
                {/* Active indicator dot/square matching screenshots */}
                <span
                  className={`size-[5px] rounded-[1px] shrink-0 transition-opacity duration-200 ${
                    isActive ? "bg-[#0d0b36] opacity-100" : "bg-transparent opacity-0"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
