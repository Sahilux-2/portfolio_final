import React from "react";

type VisualFrame = {
  src: string;
  alt: string;
  callout: string;
};

/** Inline case-study frames referenced from markdown as `visual:<key>`. */
export const VISUAL_FRAMES: Record<string, VisualFrame> = {
  "quick-picks": {
    src: "/case-study/quick-picks-side-drawer.svg",
    alt: "Pickwise use-case screen with Quick Picks side drawer open",
    callout: "Choose instead of type",
  },
  "inline-clarification": {
    src: "/case-study/use-case-inline-banner.svg",
    alt: "Pickwise use-case screen with inline clarification banner",
    callout: "Clarify without interrupting",
  },
  budget: {
    src: "/case-study/setting-budget-screen.svg",
    alt: "Pickwise budget screen showing recommended minimum and Quick Picks",
    callout: "Set realistic budget expectations",
  },
  "edge-case-no-match": {
    src: "/case-study/edge-case-no-match.svg",
    alt: "Pickwise recommendations with no exact match, showing closest alternatives",
    callout: "Closest alternatives when nothing matches all inputs",
  },
  "edge-case-over-budget": {
    src: "/case-study/edge-case-over-budget.svg",
    alt: "Pickwise recommendations explaining laptops that exceed the selected budget",
    callout: "Explain the budget mismatch on result cards",
  },
  "edge-case-over-budget-no-preference": {
    src: "/case-study/edge-case-over-budget-no-preference.svg",
    alt: "Pickwise recommendations when budget is exceeded and preferences were skipped",
    callout: "Keep results useful when preferences are skipped",
  },
};

const VISUAL_GROUPS: Record<string, VisualFrame[]> = {};

function extractVisualId(children: React.ReactNode): string | null {
  const text = (node: React.ReactNode): string =>
    React.Children.toArray(node)
      .map((n) =>
        typeof n === "string"
          ? n
          : React.isValidElement(n)
            ? text((n as React.ReactElement<{ children?: React.ReactNode }>).props.children)
            : ""
      )
      .join("");

  const match = text(children).match(/\[VISUAL\s+(\d+)/i);
  return match ? match[1].padStart(2, "0") : null;
}

export function hasCaseStudyVisual(children: React.ReactNode): boolean {
  const id = extractVisualId(children);
  return Boolean(id && VISUAL_GROUPS[id]);
}

export function CaseStudyVisual({ children }: { children: React.ReactNode }) {
  const id = extractVisualId(children);
  const frames = id ? VISUAL_GROUPS[id] : undefined;
  if (!frames) return null;

  return (
    <div className="my-8 sm:my-10 w-full min-w-0 flex flex-col gap-8 sm:gap-10">
      {frames.map((frame) => (
        <CaseStudyVisualFrame key={frame.callout} frame={frame} />
      ))}
    </div>
  );
}

export function CaseStudyVisualFrame({ frame }: { frame: VisualFrame }) {
  return (
    <figure data-case-study-media className="my-6 sm:my-8 w-full min-w-0">
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#d1d1ed] bg-white shadow-xs">
        <img
          src={frame.src}
          alt={frame.alt}
          className="block w-full h-auto"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-3 sm:mt-3.5 font-['Satoshi:Medium',sans-serif] text-[13px] sm:text-[14px] leading-snug text-[#6e6d97]">
        <span className="text-[#0d0b36] font-['Satoshi:Bold',sans-serif]">
          {frame.callout}
        </span>
      </figcaption>
    </figure>
  );
}
