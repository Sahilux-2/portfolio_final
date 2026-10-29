import React from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import {
  CaseStudyVisual,
  CaseStudyVisualFrame,
  VISUAL_FRAMES,
  hasCaseStudyVisual,
} from "./CaseStudyVisuals";
import { matchUserStorySubnav } from "../../data/caseStudies";

const sans = "font-satoshi-regular font-['Satoshi:Regular','Satoshi',sans-serif]";
const bold = "font-satoshi-bold font-['Satoshi:Bold','Satoshi',sans-serif]";

function plainTextFromNode(node: React.ReactNode): string {
  return React.Children.toArray(node)
    .map((n) =>
      typeof n === "string"
        ? n
        : React.isValidElement(n)
          ? plainTextFromNode((n as React.ReactElement<{ children?: React.ReactNode }>).props.children)
          : ""
    )
    .join("");
}

function isVisualPlaceholder(children: React.ReactNode): boolean {
  const first = React.Children.toArray(children).find(
    (c) => React.isValidElement(c) && (c.type === "p" || typeof c.type === "function" || c.type === "p")
  ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
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
  return first ? /^\s*\[VISUAL/i.test(text(first.props.children)) : false;
}

type MeasureSuccessState = { active: boolean; inWhy: boolean };

function createComponents(
  variant: "default" | "overview",
  headingIdPrefix: string | undefined,
  measure: MeasureSuccessState
): Components {
  const isOverview = variant === "overview";

  const Strong = ({ children }: { children?: React.ReactNode }) => (
    <strong className={`${bold} font-bold text-[#0d0b36]`}>{children}</strong>
  );

  return {
    h1: ({ children }) => (
      <h2 className="font-editorial text-[24px] sm:text-[34px] md:text-[44px] leading-[1.2] text-[#0d0b36] tracking-tight mb-4 sm:mb-5">
        {children}
      </h2>
    ),
    h2: ({ children }) => {
      const headingText = plainTextFromNode(children).trim();
      const isMeasureSuccess = /^how i measure success$/i.test(headingText);
      measure.active = isMeasureSuccess;
      measure.inWhy = false;

      const subnav =
        headingIdPrefix && !isOverview
          ? matchUserStorySubnav(headingText)
          : null;
      const id = subnav ? `${headingIdPrefix}--${subnav.key}` : undefined;

      return isOverview ? (
        <h3 className={`${bold} mt-8 sm:mt-9 mb-2 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#6e6d97]`}>
          {children}
        </h3>
      ) : (
        <h3
          id={id}
          className={`font-editorial text-[22px] sm:text-[26px] md:text-[30px] leading-[1.25] tracking-tight text-[#0d0b36] mt-12 sm:mt-14 text-balance scroll-mt-32 sm:scroll-mt-28 ${
            isMeasureSuccess ? "mb-6" : "mb-1"
          }`}
        >
          {children}
        </h3>
      );
    },
    h3: ({ children }) => {
      const headingText = plainTextFromNode(children).trim();
      const isWhyMetric =
        measure.active && /^why this metric/i.test(headingText);
      if (isWhyMetric) {
        measure.inWhy = true;
        return (
          <h4
            className={`${bold} text-[17px] sm:text-[19px] md:text-[20px] leading-snug text-[#0d0b36] mt-0 mb-3`}
          >
            {children}
          </h4>
        );
      }

      measure.inWhy = false;
      if (!/^how i measure success$/i.test(headingText)) {
        measure.active = false;
      }

      return (
        <h4 className={`${bold} text-[17px] sm:text-[19px] md:text-[20px] leading-snug text-[#0d0b36] mt-10 sm:mt-12 mb-3`}>
          {children}
        </h4>
      );
    },
    p: ({ children }) => {
      // Markdown passes the unevaluated img element here, so data-case-study-media
      // is not on props yet. A video renderer returns a div, which cannot sit inside p.
      const nodes = React.Children.toArray(children).filter(
        (c) => !(typeof c === "string" && c.trim() === "")
      );
      const only = nodes[0];
      const src = React.isValidElement(only)
        ? (only.props as { src?: string }).src
        : undefined;
      if (
        nodes.length === 1 &&
        typeof src === "string" &&
        (/\.mp4($|\?)/i.test(src) || src.startsWith("visual:"))
      ) {
        return <>{only}</>;
      }

      const plainText = (node: React.ReactNode): string =>
        React.Children.toArray(node)
          .map((n) =>
            typeof n === "string"
              ? n
              : React.isValidElement(n)
                ? plainText((n as React.ReactElement<{ children?: React.ReactNode }>).props.children)
                : ""
          )
          .join("");

      const paragraphText = plainText(children).trim();

      // "**User story**" labels above the italic story — tighter gap to the quote.
      if (!isOverview && paragraphText === "User story") {
        return (
          <p className={`${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4a4a5c] mb-2 break-words`}>
            {children}
          </p>
        );
      }

      // Lead-ins before example quotes (e.g. "…might say:") — 4px gap to the quote.
      if (!isOverview && /say:$/i.test(paragraphText)) {
        return (
          <p className={`${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4a4a5c] mb-1 break-words`}>
            {children}
          </p>
        );
      }

      // "How I measure success" — primary/secondary metric lines (20px below).
      if (
        measure.active &&
        /^(primary|secondary) metric:/i.test(paragraphText)
      ) {
        measure.inWhy = false;
        return (
          <p className={`${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4a4a5c] mb-5 break-words`}>
            {children}
          </p>
        );
      }

      // "Why this metric" body — 20px between paragraphs, 48px after the block.
      if (measure.inWhy) {
        return (
          <p
            className={`why-metric-p ${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4a4a5c] mb-12 break-words [&:has(+.why-metric-p)]:mb-5`}
          >
            {children}
          </p>
        );
      }

      // A paragraph that is entirely bold plain text is a key takeaway: give it a callout treatment.
      const onlyProps = React.isValidElement(only)
        ? (only.props as { children?: React.ReactNode })
        : undefined;
      const isEntirelyBold =
        !isOverview &&
        nodes.length === 1 &&
        React.isValidElement(only) &&
        (only.type === "strong" || only.type === Strong) &&
        React.Children.toArray(onlyProps?.children).every((c) => typeof c === "string");
      if (isEntirelyBold) {
        const boldText = plainText(onlyProps?.children).trim();
        // Bold label lines ending with ":" — Satoshi Bold; padding-top so gap can't collapse with the list.
        if (boldText.endsWith(":")) {
          return (
            <p
              className={`${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#0d0b36] pt-4 mb-5 break-words`}
            >
              {children}
            </p>
          );
        }

        measure.active = false;
        measure.inWhy = false;
        return (
          <aside
            className={`${sans} mt-6 mb-8 sm:mb-10 rounded-xl bg-[#f0f0f7] px-5 py-5 sm:px-8 sm:py-7 text-[15px] sm:text-[16.5px] leading-[1.7] text-[#2f2f2f] break-words [&_strong]:font-['Satoshi:Medium',sans-serif] [&_strong]:font-medium [&_strong]:text-[#2f2f2f]`}
          >
            {children}
          </aside>
        );
      }

      return (
        <p
          className={
            isOverview
              ? `${sans} max-w-[700px] text-[16px] sm:text-[18px] leading-[1.75] text-[#3a3a4d] mb-4 break-words first:mb-6`
              : `${sans} max-w-[720px] text-[15px] sm:text-[16px] leading-[1.8] text-[#4a4a5c] mb-5 break-words`
          }
        >
          {children}
        </p>
      );
    },
    strong: Strong,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => {
      if (href?.startsWith("highlight:")) {
        return (
          <strong
            className={`${bold} font-bold text-[#0d0b36] underline underline-offset-[3px] decoration-[#0d0b36]`}
          >
            {children}
          </strong>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#0d0b36] font-['Satoshi:Bold',sans-serif] underline decoration-[#6e6d97] decoration-dotted underline-offset-4 hover:text-[#6e6d97] transition-colors break-all"
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => {
      if (src && /\.mp4($|\?)/i.test(src)) {
        return (
          <div
            data-case-study-media
            className="mt-3 mb-2 sm:mt-4 sm:mb-3 w-full min-w-0 overflow-hidden rounded-xl sm:rounded-2xl border border-[#d1d1ed] bg-[#0d0b36]/[0.04] shadow-xs"
          >
            <video
              className="block w-full h-auto bg-black"
              controls
              playsInline
              preload="metadata"
              title={alt || "Product walkthrough"}
            >
              {/* Original file from /public — served as-is, no re-encoding */}
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

      const visualKey = src?.startsWith("visual:") ? src.slice("visual:".length) : null;
      const frame = visualKey ? VISUAL_FRAMES[visualKey] : undefined;
      if (frame) {
        return <CaseStudyVisualFrame frame={frame} />;
      }

      return (
        <img
          data-case-study-media
          src={src}
          alt={alt ?? ""}
          className="my-6 sm:my-8 w-full h-auto rounded-xl sm:rounded-2xl border border-[#d1d1ed]"
          loading="lazy"
        />
      );
    },
    ul: ({ children }) => (
      <ul className="max-w-[720px] mt-2 mb-6 flex flex-col gap-2.5 sm:gap-3 pl-0 list-none">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="max-w-[720px] mt-2 mb-6 flex flex-col gap-5 sm:gap-6 pl-5 list-decimal text-[15px] sm:text-[16px] text-[#4a4a5c] [&_li]:pl-1 sm:[&_li]:pl-1.5 [&_li]:before:hidden">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        className={`${sans} relative pl-5 sm:pl-6 text-[15px] sm:text-[16px] leading-[1.7] text-[#4a4a5c] before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:size-[5px] sm:before:size-[6px] before:rounded-[1px] before:bg-[#0d0b36]`}
      >
        {children}
      </li>
    ),
    hr: () => null,
    code: ({ children }) => (
      <code className="font-mono text-[12px] sm:text-[13px] bg-[#f0f0f7] text-[#0d0b36] rounded-md px-1.5 py-0.5 border border-[#d1d1ed] break-all">
        {children}
      </code>
    ),
    blockquote: ({ children }) => {
      if (hasCaseStudyVisual(children)) {
        return <CaseStudyVisual>{children}</CaseStudyVisual>;
      }

      if (isVisualPlaceholder(children)) {
        return (
          <aside className="my-6 sm:my-8 rounded-xl sm:rounded-2xl border border-dashed border-[#d1d1ed] bg-[#f0f0f7] p-4 sm:p-6 text-[#6e6d97] [&_p]:mb-2 [&_p:last-child]:mb-0 [&_p]:text-[#6e6d97] [&_p]:text-[13.5px] sm:[&_p]:text-[15px] [&_li]:text-[13px] sm:[&_li]:text-[14px] [&_strong]:text-[#0d0b36]">
            <span className="inline-block mb-1.5 sm:mb-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6e6d97] font-semibold">
              Visual · to be added
            </span>
            {children}
          </aside>
        );
      }

      return (
        <blockquote className="my-6 sm:my-8 pl-4 sm:pl-6 border-l-2 border-[#0d0b36] font-editorial italic text-[18px] sm:text-[22px] text-[#0d0b36] leading-relaxed [&_p]:text-inherit [&_p]:font-editorial [&_p]:text-[18px] sm:[&_p]:text-[22px]">
          {children}
        </blockquote>
      );
    },
    table: ({ children }) => (
      <div className="mt-3.5 mb-4 sm:mt-5.5 sm:mb-6 w-full min-w-0">
        <div className="sm:hidden flex items-center justify-end gap-1 text-[11px] font-['Satoshi:Medium',sans-serif] text-[#6e6d97] mb-1.5 px-0.5">
          <span>Swipe table to view all →</span>
        </div>
        <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-[#d1d1ed] bg-white custom-scrollbar shadow-xs">
          <table className="w-full min-w-[460px] sm:min-w-[560px] border-collapse text-left">{children}</table>
        </div>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-[#f0f0f7]">{children}</thead>,
    th: ({ children }) => (
      <th className={`${bold} px-3.5 sm:px-4 py-2.5 sm:py-3 text-[11.5px] sm:text-[12px] uppercase tracking-wider text-[#6e6d97] whitespace-nowrap`}>
        {children}
      </th>
    ),
    tr: ({ children }) => <tr className="border-t border-[#d1d1ed]/70 first:border-t-0">{children}</tr>,
    td: ({ children }) => (
      <td className={`${sans} px-3.5 sm:px-4 py-3 sm:py-3.5 align-top text-[13.5px] sm:text-[14px] leading-relaxed text-[#4a4a5c]`}>
        {children}
      </td>
    ),
  };
}

export function CaseStudyMarkdown({
  children,
  className,
  variant = "default",
  headingIdPrefix,
}: {
  children: string;
  className?: string;
  variant?: "default" | "overview";
  /** When set (user-story sections), matching h2s get stable `#prefix--key` ids for TOC. */
  headingIdPrefix?: string;
}) {
  const measureRef = React.useRef<MeasureSuccessState>({
    active: false,
    inWhy: false,
  });
  // Reset before each pass so Strict Mode double-render can't leak flags.
  measureRef.current.active = false;
  measureRef.current.inWhy = false;

  const components = React.useMemo(
    () => createComponents(variant, headingIdPrefix, measureRef.current),
    [variant, headingIdPrefix]
  );

  return (
    <div
      className={`[&>:first-child]:mt-0 [&>:last-child:not(.why-metric-p)]:mb-0 ${className ?? ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        urlTransform={(url) =>
          url.startsWith("visual:") || url.startsWith("highlight:")
            ? url
            : defaultUrlTransform(url)
        }
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
