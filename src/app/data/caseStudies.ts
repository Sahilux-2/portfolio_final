import pickwiseMarkdown from "../../../case_study_v4.md?raw";

export interface TocItem {
  id: string;
  label: string;
  /** Nested nav items — only used for user-story sections */
  children?: TocItem[];
}

/** Full section titles for desktop headings and the sidebar. Mobile keeps the short TOC label. */
const DESKTOP_TOC_LABELS: Record<string, string> = {
  Persona: "User persona",
  Problems: "The three problems",
  Analysis: "Competitive analysis",
  "Story 1": "User story 1",
  "Story 2": "User story 2",
  "Story 3": "User story 3",
  Analytics: "Analytics implementation",
  Learnings: "My learnings",
};

export function desktopTocLabel(label: string): string {
  return DESKTOP_TOC_LABELS[label] ?? label;
}

/** Sub-section nav under User story 1–3 only. Keys become `#section-NN--{key}` anchors. */
export const USER_STORY_SUBNAV = [
  // Story 1/3 use "The solution"; story 2 leads with laptop details as the solution.
  {
    key: "solution",
    match: /^(the\s+)?solution\b|^laptop details\b/i,
    label: "Solution",
  },
  { key: "why-this-solution", match: /^why this solution/i, label: "Why this solution" },
  {
    key: "recommendations",
    match: /^the recommendations screen\b/i,
    label: "Recommendations",
  },
  {
    key: "comparison",
    match: /^comparison\b/i,
    label: "Comparison",
  },
  {
    key: "how-it-works",
    match: /^how it works behind the scenes/i,
    label: "How it works",
  },
  {
    key: "measure-success",
    match: /^how i measure success/i,
    label: "Measure success",
  },
] as const;

export function matchUserStorySubnav(heading: string) {
  const text = heading.trim();
  return USER_STORY_SUBNAV.find((entry) => entry.match.test(text)) ?? null;
}

export function isUserStorySection(label: string): boolean {
  return /^Story [123]$/.test(label);
}

export interface CaseStudySection {
  id: string;
  label: string;
  /** Section number as written in the markdown (e.g. "05"), if any */
  number?: string;
  /** Section heading as written in the markdown */
  heading?: string;
  /** Markdown body (without the top-level heading) */
  body: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  sections: CaseStudySection[];
  toc: TocItem[];
}

/**
 * Parses case_study_v4.md into sections.
 * - Everything before the first numbered "# NN. ..." heading is the Overview.
 * - Each numbered h1 becomes its own section / TOC entry.
 */
function parseCaseStudy(md: string) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const title = (lines.find((l) => /^# /.test(l)) ?? "# Pickwise").replace(/^# /, "").trim();
  const numbered = /^# (\d{2})\.\s+(.*)$/;

  const firstNumbered = lines.findIndex((l) => numbered.test(l));
  const overviewLines = lines.slice(0, firstNumbered);

  // Drop the document title (first h1) and pull the second h1 as the headline
  const titleIdx = overviewLines.findIndex((l) => /^# /.test(l));
  overviewLines.splice(titleIdx, 1);
  const headlineIdx = overviewLines.findIndex((l) => /^# /.test(l));
  const subtitle = overviewLines[headlineIdx].replace(/^# /, "").trim();
  overviewLines.splice(headlineIdx, 1);

  const sections: CaseStudySection[] = [
    {
      id: "overview",
      label: "Overview",
      body: overviewLines.join("\n").replace(/\n---\s*(\n|$)/g, "\n").trim(),
    },
  ];

  /** Short TOC / section titles — keep mobile nav scannable */
  const tocLabel = (heading: string) => {
    const base = heading.split(" — ")[0].trim();
    const map: Record<string, string> = {
      "User persona": "Persona",
      "The three problems": "Problems",
      "Competitive analysis": "Analysis",
      "User story 1": "Story 1",
      "User story 2": "Story 2",
      "User story 3": "Story 3",
      "Analytics implementation": "Analytics",
      "My learnings": "Learnings",
    };
    return map[base] ?? base;
  };

  let current: { number: string; heading: string; buf: string[] } | null = null;
  const flush = () => {
    if (!current) return;
    sections.push({
      id: `section-${current.number}`,
      label: tocLabel(current.heading),
      number: current.number,
      heading: current.heading,
      body: current.buf.join("\n").trim(),
    });
  };

  for (const line of lines.slice(firstNumbered)) {
    const m = line.match(numbered);
    if (m) {
      flush();
      current = { number: m[1], heading: m[2].trim(), buf: [] };
    } else if (current) {
      current.buf.push(line);
    }
  }
  flush();

  return { title, subtitle, sections };
}

function userStorySubnav(section: CaseStudySection): TocItem[] | undefined {
  if (!isUserStorySection(section.label)) return undefined;

  const seen = new Set<string>();
  const children: TocItem[] = [];

  for (const line of section.body.split("\n")) {
    const m = line.match(/^##\s+(.+)$/);
    if (!m) continue;
    const entry = matchUserStorySubnav(m[1]);
    if (!entry || seen.has(entry.key)) continue;
    seen.add(entry.key);
    children.push({
      id: `${section.id}--${entry.key}`,
      label: entry.label,
    });
  }

  return children.length > 0 ? children : undefined;
}

const parsed = parseCaseStudy(pickwiseMarkdown);

export const PICKWISE_CASE_STUDY: CaseStudyData = {
  slug: "pickwise",
  title: parsed.title,
  category: "Product Design & Engineering",
  subtitle: parsed.subtitle,
  sections: parsed.sections,
  toc: parsed.sections.map(({ id, label, ...rest }) => ({
    id,
    label,
    children: userStorySubnav({ id, label, ...rest }),
  })),
};
