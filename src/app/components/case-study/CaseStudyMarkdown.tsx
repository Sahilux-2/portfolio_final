import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const sans = "font-['Satoshi:Regular',sans-serif]";
const bold = "font-['Satoshi:Bold',sans-serif]";

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

const components: Components = {
  h1: ({ children }) => (
    <h2 className="font-editorial text-[30px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[#0d0b36] tracking-tight mb-5">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="font-editorial text-[24px] sm:text-[30px] leading-[1.2] text-[#0d0b36] mt-10 mb-4">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className={`${bold} text-[18px] sm:text-[20px] text-[#0d0b36] mt-8 mb-2.5`}>{children}</h4>
  ),
  p: ({ children }) => (
    <p className={`${sans} text-[15px] sm:text-[16px] leading-[1.75] text-[#52525b] mb-4`}>
      {children}
    </p>
  ),
  strong: ({ children }) => <strong className="font-semibold text-[#0d0b36]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[#e84a27] underline decoration-dotted underline-offset-4 hover:text-[#0d0b36] transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-5 flex flex-col gap-2.5 pl-0 list-none">{children}</ul>
  ),
  ol: ({ children }) => <ol className="my-5 flex flex-col gap-2.5 pl-5 list-decimal">{children}</ol>,
  li: ({ children }) => (
    <li
      className={`${sans} relative pl-5 text-[15px] sm:text-[16px] leading-[1.7] text-[#52525b] before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:size-[6px] before:rounded-[1px] before:bg-[#e84a27]`}
    >
      {children}
    </li>
  ),
  hr: () => null,
  code: ({ children }) => (
    <code className="font-mono text-[13px] bg-[#f2f3f6] text-[#0d0b36] rounded-md px-1.5 py-0.5 border border-black/[0.04]">
      {children}
    </code>
  ),
  blockquote: ({ children }) =>
    isVisualPlaceholder(children) ? (
      <aside className="my-8 rounded-2xl border border-dashed border-[#e84a27]/40 bg-[#e84a27]/[0.04] p-5 sm:p-6 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_li]:text-[14px]">
        <span className="inline-block mb-2 text-[11px] font-mono uppercase tracking-wider text-[#e84a27] font-semibold">
          Visual · to be added
        </span>
        {children}
      </aside>
    ) : (
      <blockquote className="my-8 pl-6 border-l-2 border-[#e84a27] font-editorial italic text-[20px] sm:text-[22px] text-[#334155] leading-relaxed [&_p]:text-inherit [&_p]:font-editorial [&_p]:text-[20px] [&_p]:sm:text-[22px]">
        {children}
      </blockquote>
    ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-black/[0.06] bg-white">
      <table className="w-full min-w-[560px] border-collapse text-left">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#f2f3f6]">{children}</thead>,
  th: ({ children }) => (
    <th className={`${bold} px-4 py-3 text-[12px] uppercase tracking-wider text-[#6e6d97]`}>
      {children}
    </th>
  ),
  tr: ({ children }) => <tr className="border-t border-black/[0.05] first:border-t-0">{children}</tr>,
  td: ({ children }) => (
    <td className={`${sans} px-4 py-3 align-top text-[14px] leading-relaxed text-[#52525b]`}>
      {children}
    </td>
  ),
};

export function CaseStudyMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
