export interface TocItem {
  id: string;
  label: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  heroGradient: {
    from: string;
    via: string;
    to: string;
  };
  overview: {
    lead: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
    problemTitle: string;
    problemDescription: string;
    problemFollowUp: string;
  };
  toc: TocItem[];
}

export const OPENAI_HARDWARE_CASE_STUDY: CaseStudyData = {
  slug: "openai-hardware",
  title: "OpenAI x Hardware",
  category: "Product Strategy & Hardware Experience",
  subtitle: "What should OpenAI build as their first AI device?",
  heroGradient: {
    from: "#EE9A56",
    via: "#E85D3F",
    to: "#A28CE4",
  },
  overview: {
    lead: "As a team of 3 product designers, our goal was to land on a clear vision within 7 weeks.",
    pillars: [
      {
        title: "Product Strategy",
        description: "Thinking broadly about OpenAI, the AI landscape, and exploring widely in the solution space.",
      },
      {
        title: "Prototyping & Testing",
        description: "Going wide in ideation and rapidly testing concepts with users.",
      },
      {
        title: "Iterating with Feedback",
        description: "Continuously iterating on concepts and validating product decisions.",
      },
    ],
    problemTitle: "Problem: ChatGPT is at the top of the stack.",
    problemDescription:
      "ChatGPT is an app, at the top of this technology stack. That's a risky place to be because it means leaves OpenAI at the mercy of the lower layers, like the platform, the operating system, and the hardware.",
    problemFollowUp:
      "Apple and Google are building their own consumer AI ecosystems, but with the advantage of being able to control the full hardware and operating system integration from silicon up.",
  },
  toc: [
    { id: "overview", label: "Overview" },
    { id: "solution", label: "Solution" },
    { id: "core-flows", label: "Core Flows" },
    { id: "research", label: "Research" },
    { id: "form-factors", label: "Exploring Form Factors" },
    { id: "prototyping", label: "Prototyping and Testing" },
    { id: "decisions", label: "Design Decisions" },
    { id: "hardware-constraints", label: "Hardware Constraints" },
    { id: "reflection", label: "Reflection" },
  ],
};
