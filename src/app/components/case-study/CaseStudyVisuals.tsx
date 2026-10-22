import React, { useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";

type VisualFrame = {
  src: string;
  alt: string;
  callout: string;
  width: number;
  height: number;
};

/** Inline case-study frames referenced from markdown as `visual:<key>`. */
export const VISUAL_FRAMES: Record<string, VisualFrame> = {
  "quick-picks": {
    src: "/case-study/quick-picks-side-drawer.svg",
    alt: "Pickwise use-case screen with Quick Picks side drawer open",
    callout: "Choose instead of type",
    width: 1440,
    height: 950,
  },
  "inline-clarification": {
    src: "/case-study/use-case-inline-banner.svg",
    alt: "Pickwise use-case screen with inline clarification banner",
    callout: "Clarify without interrupting",
    width: 1440,
    height: 1080,
  },
  budget: {
    src: "/case-study/setting-budget-screen.svg",
    alt: "Pickwise budget screen showing recommended minimum and Quick Picks",
    callout: "Set realistic budget expectations",
    width: 1440,
    height: 1080,
  },
  "edge-case-no-match": {
    src: "/case-study/edge-case-no-match.svg",
    alt: "Pickwise recommendations with no exact match, showing closest alternatives",
    callout: "Closest alternatives when nothing matches all inputs",
    width: 1440,
    height: 1608,
  },
  "edge-case-over-budget": {
    src: "/case-study/edge-case-over-budget.svg",
    alt: "Pickwise recommendations explaining laptops that exceed the selected budget",
    callout: "Explain the budget mismatch on result cards",
    width: 1440,
    height: 1608,
  },
  "edge-case-over-budget-no-preference": {
    src: "/case-study/edge-case-over-budget-no-preference.svg",
    alt: "Pickwise recommendations when budget is exceeded and preferences were skipped",
    callout: "Keep results useful when preferences are skipped",
    width: 1440,
    height: 1608,
  },
  "laptops-edit-input": {
    src: "/case-study/laptops-display-edit-input.svg",
    alt: "Pickwise recommendations listing with Edit inputs control",
    callout: "Edit inputs from the results screen",
    width: 1440,
    height: 1608,
  },
  "comparison-3": {
    src: "/case-study/comparison-3-table-screen.svg",
    alt: "Pickwise comparison table comparing three laptops with human-language specs and verdict",
    callout: "Compare three laptops side by side",
    width: 1440,
    height: 1890,
  },
  "comparison-4": {
    src: "/case-study/comparison-4-table-screen.svg",
    alt: "Pickwise comparison table comparing four laptops with human-language specs and verdict",
    callout: "Compare four laptops side by side",
    width: 1600,
    height: 1890,
  },
  "buying-options-iteration": {
    src: "/case-study/buying-options-iteration.svg",
    alt: "Pickwise buying options iteration showing online and offline options in one unified list",
    callout: "One list for online and offline options",
    width: 1440,
    height: 1080,
  },
  "no-offline-stores": {
    src: "/case-study/no-offline-stores-nearby.svg",
    alt: "Pickwise buying options when no offline stores are nearby",
    callout: "No offline stores nearby",
    width: 1440,
    height: 950,
  },
  "no-online-options": {
    src: "/case-study/no-online-options-available.svg",
    alt: "Pickwise buying options when no online options are available",
    callout: "No online options available",
    width: 1440,
    height: 950,
  },
  "buying-options-final": {
    src: "/case-study/buying-options-final.svg",
    alt: "Pickwise final buying options table with online and offline options",
    callout: "Final buying options table",
    width: 1440,
    height: 1080,
  },
};

type VisualGroup = {
  frames: VisualFrame[];
  /** VISUAL 07 uses a 2-column grid */
  layout?: "stack" | "grid-2";
};

const VISUAL_GROUPS: Record<string, VisualGroup> = {
  "07": {
    layout: "grid-2",
    frames: [
      VISUAL_FRAMES["edge-case-no-match"],
      VISUAL_FRAMES["edge-case-over-budget"],
      VISUAL_FRAMES["edge-case-over-budget-no-preference"],
      VISUAL_FRAMES["laptops-edit-input"],
    ],
  },
  "09": {
    layout: "grid-2",
    frames: [VISUAL_FRAMES["comparison-3"], VISUAL_FRAMES["comparison-4"]],
  },
  "10": {
    frames: [VISUAL_FRAMES["buying-options-iteration"]],
  },
  "11": {
    layout: "grid-2",
    frames: [
      VISUAL_FRAMES["no-offline-stores"],
      VISUAL_FRAMES["no-online-options"],
    ],
  },
  "12": {
    frames: [VISUAL_FRAMES["buying-options-final"]],
  },
};

const EXPAND_MS = 200;
const EXPAND_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const EXPAND_TRANSITION = [
  `top ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `left ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `width ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `height ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `border-radius ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `padding ${EXPAND_MS}ms ${EXPAND_EASE}`,
  `background-color ${EXPAND_MS}ms ease`,
].join(", ");

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
  const group = id ? VISUAL_GROUPS[id] : undefined;
  if (!group) return null;

  if (group.layout === "grid-2") {
    return (
      <div className="my-8 sm:my-10 w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {group.frames.map((frame) => (
          <CaseStudyVisualFrame key={frame.callout} frame={frame} compact />
        ))}
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-10 w-full min-w-0 flex flex-col gap-8 sm:gap-10">
      {group.frames.map((frame) => (
        <CaseStudyVisualFrame key={frame.callout} frame={frame} />
      ))}
    </div>
  );
}

function applyRect(
  el: HTMLElement,
  rect: { top: number; left: number; width: number; height: number },
  radius: string,
  padding: string,
  background: string
) {
  el.style.top = `${rect.top}px`;
  el.style.left = `${rect.left}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  el.style.borderRadius = radius;
  el.style.padding = padding;
  el.style.backgroundColor = background;
}

export function CaseStudyVisualFrame({
  frame,
  compact = false,
}: {
  frame: VisualFrame;
  compact?: boolean;
}) {
  const shellRef = useRef<HTMLButtonElement | null>(null);
  const layerRef = useRef<HTMLButtonElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  const animatingRef = useRef(false);
  const animTimerRef = useRef<number | null>(null);
  const forceCloseRef = useRef<() => void>(() => {});

  const clearAnimTimer = () => {
    if (animTimerRef.current != null) {
      window.clearTimeout(animTimerRef.current);
      animTimerRef.current = null;
    }
  };

  const forceClose = () => {
    clearAnimTimer();
    animatingRef.current = false;
    expandedRef.current = false;
    document.body.style.overflow = "";
    setExpanded(false);
  };
  forceCloseRef.current = forceClose;

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") forceCloseRef.current();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      clearAnimTimer();
    };
  }, [expanded]);

  const collapse = () => {
    const shell = shellRef.current;
    const layer = layerRef.current;
    if (!expandedRef.current) return;
    // A missing layer, or a transition that never finishes, must not leave the page locked.
    if (!shell || !layer || animatingRef.current) {
      forceClose();
      return;
    }

    const rect = shell.getBoundingClientRect();
    const radius = getComputedStyle(shell).borderRadius;

    animatingRef.current = true;
    layer.style.transition = EXPAND_TRANSITION;
    applyRect(layer, rect, radius, "0px", "transparent");

    const img = layer.querySelector("img");
    if (img) {
      img.style.transition = `object-fit ${EXPAND_MS}ms ease`;
      img.classList.remove("object-contain");
      img.classList.add("object-cover");
    }

    const finish = () => {
      layer.removeEventListener("transitionend", onEnd);
      forceClose();
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;
      finish();
    };
    layer.addEventListener("transitionend", onEnd);
    clearAnimTimer();
    animTimerRef.current = window.setTimeout(finish, EXPAND_MS + 80);
  };

  const expand = () => {
    const shell = shellRef.current;
    if (!shell || expandedRef.current || animatingRef.current) return;

    const rect = shell.getBoundingClientRect();
    const radius = getComputedStyle(shell).borderRadius;

    animatingRef.current = true;
    expandedRef.current = true;
    flushSync(() => setExpanded(true));

    const layer = layerRef.current;
    if (!layer) {
      forceClose();
      return;
    }

    applyRect(layer, rect, radius, "0px", "transparent");
    layer.style.transition = "none";

    const finish = () => {
      animatingRef.current = false;
      layer.removeEventListener("transitionend", onEnd);
      clearAnimTimer();
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "width") return;
      finish();
    };
    layer.addEventListener("transitionend", onEnd);
    clearAnimTimer();
    animTimerRef.current = window.setTimeout(finish, EXPAND_MS + 80);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!expandedRef.current || !layer.isConnected) return;
        layer.style.transition = EXPAND_TRANSITION;
        applyRect(
          layer,
          { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
          "0px",
          window.innerWidth < 640 ? "12px" : "24px",
          "rgba(13, 11, 54, 0.92)"
        );

        const img = layer.querySelector("img");
        if (img) {
          img.classList.remove("object-cover");
          img.classList.add("object-contain");
        }
      });
    });
  };

  return (
    <figure
      data-case-study-media
      className={`w-full min-w-0 ${compact ? "m-0" : "my-6 sm:my-8"}`}
    >
      <button
        ref={shellRef}
        type="button"
        aria-label={`Expand ${frame.alt}`}
        onClick={expand}
        className="relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#d1d1ed] bg-white shadow-xs cursor-zoom-in p-0"
      >
        <img
          src={frame.src}
          alt={frame.alt}
          width={frame.width}
          height={frame.height}
          className="block w-full h-auto pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      </button>

      <figcaption className="mt-2.5 sm:mt-3 font-['Satoshi:Medium',sans-serif] text-[12px] sm:text-[14px] leading-snug text-[#6e6d97]">
        <span className="text-[#0d0b36] font-['Satoshi:Bold',sans-serif]">
          {frame.callout}
        </span>
      </figcaption>

      {expanded &&
        createPortal(
          <button
            ref={layerRef}
            type="button"
            aria-label="Collapse image"
            onClick={collapse}
            className="fixed z-[200] overflow-hidden border-0 cursor-zoom-out p-0 flex items-center justify-center"
            style={{ margin: 0 }}
          >
            <img
              src={frame.src}
              alt={frame.alt}
              width={frame.width}
              height={frame.height}
              className="size-full object-cover pointer-events-none"
            />
          </button>,
          document.body
        )}
    </figure>
  );
}
