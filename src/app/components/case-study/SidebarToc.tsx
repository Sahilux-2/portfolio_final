import React, { useEffect, useRef } from "react";
import { desktopTocLabel, TocItem } from "../../data/caseStudies";

interface SidebarTocProps {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

function isItemOrChildActive(item: TocItem, activeId: string): boolean {
  if (activeId === item.id) return true;
  return Boolean(item.children?.some((child) => child.id === activeId));
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
      {/* Mobile Sticky Horizontal Bar — top-level sections only */}
      <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-black/[0.04] py-1.5 px-3 sm:px-4 w-full">
        <div className="relative w-full">
          {/* Subtle scroll cues on edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/95 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white/95 to-transparent z-10" />

          <div
            ref={mobileNavRef}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pr-4 pl-0.5"
          >
            {items.map((item) => {
              const isActive = isItemOrChildActive(item, activeId);
              return (
                <button
                  key={item.id}
                  ref={isActive ? activePillRef : null}
                  onClick={() => onSelect(item.id)}
                  className={`shrink-0 snap-start px-2.5 py-1 rounded-full text-[11px] leading-none font-['Satoshi:Medium',sans-serif] transition-all cursor-pointer flex items-center gap-1 active:scale-95 select-none ${
                    isActive
                      ? "bg-[#0d0b36] text-white shadow-xs font-['Satoshi:Bold',sans-serif]"
                      : "bg-[#f0f0f7] text-[#6e6d97] hover:text-[#0d0b36] hover:bg-[#e6e6f2]"
                  }`}
                >
                  {isActive && <span className="size-1 bg-white rounded-full" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sticky Left Sidebar Navigation */}
      <aside className="hidden lg:block w-[180px] xl:w-[200px] shrink-0 sticky top-24 self-start">
        <nav className="flex flex-col gap-3" aria-label="Table of contents">
          {items.map((item) => {
            const sectionActive = isItemOrChildActive(item, activeId);
            const children = item.children;
            const showChildren = Boolean(children?.length && sectionActive);

            return (
              <div key={item.id} className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`group flex items-center gap-2 text-left text-[14px] leading-tight transition-all duration-200 cursor-pointer ${
                    sectionActive
                      ? "text-[#0d0b36] font-['Satoshi:Bold',sans-serif]"
                      : "text-[#6e6d97] hover:text-[#0d0b36] font-['Satoshi:Medium',sans-serif]"
                  }`}
                >
                  <span
                    className={`size-[5px] rounded-[1px] shrink-0 transition-opacity duration-200 ${
                      activeId === item.id
                        ? "bg-[#0d0b36] opacity-100"
                        : "bg-transparent opacity-0"
                    }`}
                  />
                  <span className="truncate">{desktopTocLabel(item.label)}</span>
                </button>

                {showChildren && children && (
                  <div
                    className="ml-[13px] pl-3 border-l border-[#d1d1ed] flex flex-col gap-2"
                    role="group"
                    aria-label={`${desktopTocLabel(item.label)} subsections`}
                  >
                    {children.map((child) => {
                      const childActive = activeId === child.id;
                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => onSelect(child.id)}
                          className={`text-left text-[12px] xl:text-[13px] leading-snug transition-colors duration-200 cursor-pointer ${
                            childActive
                              ? "text-[#0d0b36] font-['Satoshi:Bold',sans-serif]"
                              : "text-[#6e6d97] hover:text-[#0d0b36] font-['Satoshi:Medium',sans-serif]"
                          }`}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
