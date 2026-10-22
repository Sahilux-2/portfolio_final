import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const sans = "font-satoshi-regular font-['Satoshi:Regular','Satoshi',sans-serif]";
const bold = "font-satoshi-bold font-['Satoshi:Bold','Satoshi',sans-serif]";

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

function createComponents(variant: "default" | "overview"): Components {
  const isOverview = variant === "overview";

  return {
    h1: ({ children }) => (
      <h2 className="font-editorial text-[24px] sm:text-[34px] md:text-[44px] leading-[1.2] text-[#0d0b36] tracking-tight mb-4 sm:mb-5">
        {children}
      </h2>
    ),
    h2: ({ children }) =>
      isOverview ? (
        <h3 className={`${bold} mt-8 sm:mt-9 mb-2 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] text-[#6e6d97]`}>
          {children}
        </h3>
      ) : (
        <h3 className="font-editorial text-[22px] sm:text-[26px] md:text-[30px] leading-[1.25] tracking-tight text-[#0d0b36] mt-12 sm:mt-14 mb-4 sm:mb-5 text-balance">
          {children}
        </h3>
      ),
    h3: ({ children }) => (
      <h4 className={`${bold} text-[17px] sm:text-[19px] md:text-[20px] leading-snug text-[#0d0b36] mt-10 sm:mt-12 mb-3`}>
        {children}
      </h4>
    ),
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
      if (nodes.length === 1 && typeof src === "string" && /\.mp4($|\?)/i.test(src)) {
        return <>{only}</>;
      }

      // A paragraph that is entirely bold plain text is a key takeaway: give it a callout treatment.
      const onlyProps = React.isValidElement(only)
        ? (only.props as { children?: React.ReactNode })
        : undefined;
      const isCallout =
        !isOverview &&
        nodes.length === 1 &&
        React.isValidElement(only) &&
        only.type === "strong" &&
        React.Children.toArray(onlyProps?.children).every((c) => typeof c === "string");
      if (isCallout) {
        return (
          <p className={`${sans} my-8 sm:my-10 rounded-r-xl border-l-[3px] border-[#0d0b36] bg-[#f6f6fb] px-4 py-4 sm:px-6 sm:py-5 text-[15.5px] sm:text-[17px] leading-[1.65] text-[#0d0b36] break-words`}>
            {children}
          </p>
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
    strong: ({ children }) => (
      <strong className={`${bold} font-bold text-[#0d0b36]`}>{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[#0d0b36] font-['Satoshi:Bold',sans-serif] underline decoration-[#6e6d97] decoration-dotted underline-offset-4 hover:text-[#6e6d97] transition-colors break-all"
      >
        {children}
      </a>
    ),
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
      <ol className="max-w-[720px] mt-2 mb-6 flex flex-col gap-2.5 sm:gap-3 pl-5 list-decimal text-[15px] sm:text-[16px] text-[#4a4a5c]">
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
    blockquote: ({ children }) =>
      isVisualPlaceholder(children) ? (
        <aside className="my-6 sm:my-8 rounded-xl sm:rounded-2xl border border-dashed border-[#d1d1ed] bg-[#f0f0f7] p-4 sm:p-6 text-[#6e6d97] [&_p]:mb-2 [&_p:last-child]:mb-0 [&_p]:text-[#6e6d97] [&_p]:text-[13.5px] sm:[&_p]:text-[15px] [&_li]:text-[13px] sm:[&_li]:text-[14px] [&_strong]:text-[#0d0b36]">
          <span className="inline-block mb-1.5 sm:mb-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6e6d97] font-semibold">
            Visual · to be added
          </span>
          {children}
        </aside>
      ) : (
        <blockquote className="my-6 sm:my-8 pl-4 sm:pl-6 border-l-2 border-[#0d0b36] font-editorial italic text-[18px] sm:text-[22px] text-[#0d0b36] leading-relaxed [&_p]:text-inherit [&_p]:font-editorial [&_p]:text-[18px] sm:[&_p]:text-[22px]">
          {children}
        </blockquote>
      ),
    table: ({ children }) => (
      <div className="my-8 sm:my-10 w-full min-w-0">
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
}: {
  children: string;
  className?: string;
  variant?: "default" | "overview";
}) {
  const components = React.useMemo(() => createComponents(variant), [variant]);

  return (
    <div className={`[&>:first-child]:mt-0 [&>:last-child]:mb-0 ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
