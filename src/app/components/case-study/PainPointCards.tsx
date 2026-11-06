import React from "react";

const CARDS = [
  {
    action: "Explore and shortlist laptops.",
    problem:
      "Users don't understand specs jargon and AI chatbots give dense text paragraphs, lot of scrolling, leading to cognitive overload & user not truly understanding the laptops to choose.",
    solution:
      "Providing a 3-step questionnaire & laptops listing in small and concise chunks. Further, making it even more easy & efficient with quick picks & budget recommendation.",
  },
  {
    action: "Comparing few shortlisted laptops to decide upon one.",
    problem:
      "Need to compare different shortlisted laptops, existing apps show technical specs, AI chatbot gives linear, solely text layout with long tables & paragraphs.",
    solution:
      "A human-language, scalable & reusable specs library with a final verdict that analyzes user inputs & shortlisted laptops and tells which is a better fit for the user.",
  },
  {
    action:
      "Exploring different online & offline buying options to know which one is best for them.",
    problem:
      "Exploring online & offline buying options through traditional AI chatbots can lead to hallucinations, incorrect info along with long text paragraphs and user effort.",
    solution:
      "A simple unified view of all offline & online buying options in a clean & concise table. Shows nearby offline stores & online links of the picked laptop.",
  },
] as const;

/** Pain-point cards adapted from Figma node 4874:33112 (bordered, rounded tiles). */
export function PainPointCards() {
  return (
    <div className="mt-2 flex flex-col gap-6 w-full min-w-0">
      {CARDS.map((card) => (
        <div
          key={card.action}
          className="flex flex-col gap-3 border border-[#f0f0f0] rounded-[18px] px-6 py-5 sm:px-6 sm:py-5"
        >
          <p className="font-['Satoshi:Bold',sans-serif] text-[15px] sm:text-[16px] leading-[1.7] text-[#4a4a5c] m-0">
            {card.action}
          </p>
          <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-[1.7] text-[#4a4a5c] m-0">
            {card.problem}
          </p>
          <p className="font-['Satoshi:Regular',sans-serif] text-[15px] sm:text-[16px] leading-[1.7] text-[#4a4a5c] m-0">
            {card.solution}
          </p>
        </div>
      ))}
    </div>
  );
}
