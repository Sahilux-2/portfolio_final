# Pickwise

# Effortless laptop picking and buying for non-technical first-time buyers.

Find, compare, and buy the right laptop without reading text walls or risking stale data.

---

## Live product

**[Try Pickwise](https://pickwise-azure.vercel.app/questionnaire/use-case)**

## GitHub repository

**[View the source code](https://github.com/Sahilux-2/pickwise)**

## Product walkthrough

![Product walkthrough](/pickwise-full-walkthrough.mp4)

End-to-end journey: from entering software needs to live buying options.

---

# 02. Context

While looking for high-end laptops myself, I faced certain problems that arrived due to some of my traits and the existing solutions (AI chatbots, Laptop Arena etc) not catering to them.

So decided to solve the problems to the maximum extent I can and build the product end-to-end.

# 03. User persona

Neil is a college fresher.

Wants to buy his first laptop.

Will mostly use it for game development and light gaming.

[Has no technical knowledge about laptop specs.](highlight:)

But knows what he wants to use the laptop for.

[Has a short attention span and prefers concise content with straightforward experiences.](highlight:)

This is a working persona based on my own experience and the target scenario. I used it to guide my decisions, rather than treating it as a persona validated through formal user interviews.

# 04. User actions/needs

3 needs/actions of the persona while looking for a laptop, specifically valid for this target user:

1. Explore & pick laptop/s.
2. Comparing few picked laptops.
3. Exploring different online & offline buying options to know which one is best for them.

# 05. Current scenario

### Existing platforms

Laptop Arena, Gadgets Now, Help me choose (By Microsoft), Smartprix etc.

- All display technical specs.
- Some provide buying options, but that too only online options.
- Comparison is all in technical terms.

### AI chatbots (ChatGPT, Claude, Gemini etc)

- All text layout, requiring to read through all texts. And the target user has low attention span & prefers concise experiences/content.
- Does web search to fetch laptops, sometimes leads to hallucinations. Displayed phone when asked for laptops (technical edge case).
- Multiple, dedicated prompts require constant user effort.
- Single, large prompt leads to content overload with text, especially when comparing laptops. Even after explicitly stating it to be concise.

AI chatbots try to fulfill the 3 user needs to a certain extent. But fail at some crucial points, especially for the target user.

### Asking other people

- Requires additional effort to connect & contact people.
- Multiple opinions leads to paradox of choice.

### Why not just watch YouTube reviews?

YouTube reviews are useful, but users still need to find reviewers they trust, watch multiple videos, understand technical terminology, and figure out whether a review applies to their own budget and workload.

The problem isn't that reviews are useless. It's that users still have to connect all that information to their own needs.

# 06. User story 1

*As a non-technical, first-time buyer with a short attention span, I want to find laptops that fit within my needs without having to learn specs terminology or read through paragraphs of text, so that I can quickly narrow down my choices without experiencing cognitive overload or prompt exhaustion.*

## The Solution: A 3-Step Questionnaire

I designed a linear flow (Use Case → Preferences → Budget → Recommendations) to collect parameters without forcing users to understand hardware specifications.

### Friction over Clutter

I split the inputs across three screens with a progress indicator rather than building one long form. For a beginner with a short attention span, reducing cognitive load per screen is more important than reducing the total click count.

## UI & Interaction Decisions

### Use Cases over Specifications

The flow asks, “What will you use the laptop for?” Users can type their needs or select "Quick Picks" (e.g., Game Development, Video Editing). To prevent UI overwhelm, common choices remain visible while the wider library is searchable.

![Choose instead of type](visual:quick-picks)

### Inline Clarification (No Modals)

If an input is too broad (e.g., "editing"), the UI asks a follow-up question inline. This preserves context without interrupting the flow with a modal or making the user feel like they triggered an error state.

![Clarify without interrupting](visual:inline-clarification)

### Separating Preferences

I separated "Needs" (workload) from "Preferences" (portability, cooling) to distinguish hardware requirements from everyday usability.

### Smart Budget Expectations

Instead of a generic slider, Pickwise calculates a recommended minimum budget based on the user's workload and provides realistic Quick Picks. This actively prevents "no-match" dead ends caused by unrealistic budget expectations.

For example, if the recommended minimum is ₹95,000, the user might see ₹90,000, ₹1 lakh, ₹1.1 lakh, and ₹1.2 lakh.

![Set realistic budget expectations](visual:budget)

### Familiar Recommendation Cards

I used standard e-commerce patterns (image, name, price) and intentionally hid dense technical specs at this stage to avoid information overload.

Users can edit their inputs, open laptop details, add laptops to Compare, or save them to Wishlist.

## Edge Cases Handled

- **Vague use case:** Triggers inline clarification.
- **Budget too low / No exact match:** Displays a clear "no-exact-match" state and surfaces the closest feasible alternatives.
- **Matches use case but exceeds budget:** Explicitly labels the budget mismatch on the result card.
- **Matches use case but misses preference:** Retains the result but visually labels the trade-off.
- **No preferences selected:** Continue using the use case and budget.
- **AI or network failure:** Preserves user inputs and falls back to deterministic results and predefined copy.

> **[VISUAL 07: RECOMMENDATIONS AND EDGE CASES]**

## Behind the Scenes: Technical Architecture

**Data & Logic:** Built on a curated `laptops.ts` catalogue (~30 items) and `workloads.ts` which maps software to hardware minimums.

**AI Integration:** The `/api/recommend` route uses the Gemini API strictly to normalize free-text inputs into structured tags and generate explanation copy. The actual filtering and ranking engine is deterministic.

**Performance:** Uses caching and Upstash rate limiting to reduce redundant network requests.

## Technical Trade-offs

The primary limitation is scale: relying on a manually curated catalogue restricts recommendations to approximately 30 laptops rather than the entire market, meaning missing data could exclude a viable machine. However, I deliberately chose structured, deterministic rules over raw LLM evaluation because they are structurally sound, easier to test, and completely eliminate the risk of AI hallucinating hardware specs.

## How I measure success

**Primary metric:** Percentage of users adding a laptop to Compare or Wishlist.

### Why this metric?

Completing the questionnaire doesn't necessarily mean users found the recommendations useful. Adding a laptop to Compare or Wishlist is a stronger signal that they've found something worth considering.

**Secondary metric:** Onboarding completion rate.

### Why this metric?

This tells me whether users are completing the starting flow. If multiple users abandon the questionnaire, I'd investigate where they're dropping off and find out why.

# 07. User story 2

*As a non-technical, first-time buyer, I want to easily evaluate the real-world differences between my shortlisted laptops, so that I can make a confident decision without needing to memorize technical specifications or manually go through long chat responses & excessive text-layouts.*

## Laptop Details, Conclusion First, Evidence After

- **Initial idea:** Explain every specification in simple language.
- **Problem:** Repetitive copy and clutter as explanations vary by workload and preferences.
- **Solution:** One global fit summary with three states:
  - Strong match for your needs
  - Good match with one trade-off
  - Not the best match for your needs
- Highlight specific mismatches separately.

**Global summary = Conclusion · Specs = Evidence**

## Comparison, Explain the Differences

- **Layout:** Familiar comparison table for easy side-by-side scanning.
- **Relevant specs first:** Prioritise specs based on the user's needs.
- **No forced winner:** Highlight meaningful differences without declaring a winner in every row.
- **Final verdict:** Summarise the comparison after showing the evidence.

### Reusable Specification Copy

- **Problem:** Raw specifications require technical knowledge; unique contextual explanations are difficult to maintain.
- **Solution:** A reusable copy library maps capability levels to predefined, plain-language explanations.
- **Coverage:** Processor, graphics, RAM, storage, weight and other relevant properties.
- **Why not AI-generated copy for every spec?** Higher cost, latency and inconsistent wording.
- **AI's role:** Interpret free-text inputs and generate the overall comparison verdict; predefined copy explains individual specifications.

## Behind the scenes

- `translations.ts` stores reusable specification explanations.
- Application rules map laptop data to capability levels.
- Separate rules handle properties such as OS compatibility.
- Gemini generates the structured comparison verdict.
- Caching, retries, timeouts and fallback logic improve reliability.

## Trade-offs & Limitations

- Explanations depend on accurate laptop data and capability-mapping rules.
- Copy must avoid exaggerated performance claims.
- **Global fit summary:** Communicates the overall conclusion.
- **Specification library:** Explains individual differences.

Together, they create a consistent, easy-to-understand comparison experience.

## How I measure success

**Primary metric:** Percentage of users who proceed from Compare to buying options by clicking a recommended laptop.

### Why this metric?

The purpose of comparison is to help users make a decision. Progressing from Compare to buying options is a useful signal that the user is ready to take the next step.

I measure this transition specifically from the comparison screen, excluding users who navigate directly from laptop details to buying options.

This metric doesn't prove that users understood the comparison or chose the right laptop. It tells me whether they're progressing to the next step.

# 08. User story 3

*As a first-time buyer, I want to view accurate online and nearby offline buying options for my final choice, so that I can pick a buying option effortlessly without having to risk clicking hallucinated or outdated links.*

## The Solution

- **Unified buying-options screen:** Combines online retailers and nearby offline stores in one list.
- **Information shown:** Retailer/store name, price where available, category, and store location.
- **Data sources:** Search and place APIs, not AI-generated links.
- **Familiar table/list layout:** Makes options easy to scan and compare.

## Why One Unified List?

- **Rejected:** Separating options into “Better” and “Other” categories.
- **Reason:** Available data can't reliably rank every option by price, trust, warranty, returns, delivery, distance, and availability.
- **Chosen:** One list with a Recommended label when supported by available evidence.
- Removed the secondary details drawer because it largely repeated existing information.

![One list for online and offline options](visual:buying-options-iteration)

## Why Request Location at This Stage?

- **Rejected:** Requesting location during onboarding.
- **Reason:** Users have no immediate need to share their location at that point.
- **Chosen:** Contextual permission modal when users explore nearby stores.
- **Why a modal?** Location is a prerequisite for nearby-store discovery, not a separate journey.
- **Fallback:** Users can deny permission and still view online options.

## Why Show Partial Results?

- **No nearby stores** → Keep online options visible.
- **No online results** → Keep nearby stores visible.
- **Neither available** → Show an appropriate empty/unavailable state.
- **Reason:** One failed data source shouldn't hide useful results from another.

![No offline stores nearby](visual:no-offline-stores)

![No online options available](visual:no-online-options)

## Behind the Scenes

### Online Options (SerpApi)

- `/api/buying-options` retrieves Google organic search results for India.
- Uses retailer query templates and trusted-host checks.
- Falls back to retailer search links when reliable direct results aren't available.
- In-memory caching, request deduplication, timeouts, and retries help manage failures.

### Offline Stores (Geoapify)

- `/api/stores` handles reverse geocoding, nearby-place discovery, and address geocoding.
- Uses timeouts and returns an empty/unavailable state when requests fail.
- Finds nearby stores but doesn't verify laptop-specific inventory.

## Edge Cases & Trade-offs

- **Location denied:** Continue with online options.
- **One source fails:** Preserve results from the other source.
- **Both sources fail or return no usable options:** Explain that no suitable results were found through currently supported sources.
- **Price missing or unreliable:** Don't invent or present it as verified.
- **Inventory uncertainty:** A nearby store's existence doesn't confirm that it stocks the selected laptop.

## Key Limitation

Pickwise consolidates available search results and nearby-store information, but cannot guarantee complete retailer coverage, current prices, product availability, or the objectively safest and cheapest option.

**Design principle:** Be transparent about what the data supports rather than presenting uncertain information as fact.

## How I measure success

**Primary metric:** Buying-options outbound click-through rate.

### Why this metric?

An outbound click shows that the user found an option worth exploring. It doesn't prove that the user completed a purchase; that would require reliable conversion data from the retailer.

**Secondary metric:** Recommended-option click-through rate.

### Why this metric?

I wanted to measure whether the recommendation label helps users identify an option worth considering.

Only users who are shown a Recommended option should be included. If no option is recommended, that session shouldn't count towards this metric.

# 09. Analytics implementation

## Measuring the journey without forcing account creation

I implemented anonymous event tracking to measure important stages of the user journey.

### Why anonymous authentication?

Pickwise is a utility for an infrequent, high-intent task. I didn't want users to create an account before they could get value from the product.

At the same time, I needed a way to associate analytics events and reviews with an anonymous user identity.

Firebase Anonymous Authentication provides that identity without a signup or login wall. Questionnaire inputs, Wishlist, Compare state, and journey progress remain in browser storage; they aren't synced across devices.

**Anonymous identity for analytics and reviews. Browser storage for the local journey.**

The `trackEvent` function sends allowlisted events to Firestore. Rules restrict client writes, prohibit client reads, and require authentication. Analytics failures don't interrupt the core experience.

This demonstrates that instrumentation is implemented and recording events. It isn't evidence of improved conversion or validated user outcomes.

# 10. My learnings

## Understanding the WHY matters more than adding more information.

The biggest learning from Pickwise was that the problem wasn't simply a lack of laptop information.

A lot of information already exists. The difficult part is translating what the user wants to do into technical requirements, understanding the practical differences between laptops, and finding a place to buy.

That changed how I approached the product. Instead of building another catalogue or technical filter system, I designed around the decisions the user was actually trying to make.

## Every solution needs a reason.

I learned to question my first ideas instead of committing to the first solution that looked right.

Should all questions appear on one screen? Should every specification have its own human-language explanation? Should every comparison row declare a winner? Should buying options be split into better and other options?

For each decision, I considered the alternatives and what they would mean for Neil. That helped me avoid adding complexity when a simpler solution addressed the same problem.

## AI doesn't need to make every decision.

Pickwise uses AI, but it doesn't delegate every decision to an AI model.

Structured data and deterministic rules handle laptop filtering, ranking, and fit evaluation. Gemini helps interpret natural-language inputs and generate explanations. Reusable copy, structured responses, validation, and fallbacks make the system more predictable.

This also makes it easier to test the product and understand why a particular recommendation was made.

## Engineering constraints are part of product design.

Building the buying-options experience exposed a real limitation: finding a store isn't the same as knowing whether a particular laptop is in stock there.

Similarly, search-derived prices don't guarantee current availability or the final purchase price.

These limitations affected what Pickwise could honestly promise. **A good UI cannot compensate for missing data.**

## Reliability is part of the experience.

Building Pickwise required more than connecting APIs. I had to consider timeouts, rate limits, caching, retries, validation, fallback paths, and automated tests.

Vitest covers approximately 174 unit and API tests. Playwright tests the questionnaire-to-comparison-to-buying-options journey, including granted and denied geolocation.

These safeguards help make the application more predictable, although they don't replace testing with real users.

## Design, product, and engineering are connected.

Recommendations depend on structured data and evaluation rules. Comparison language depends on how specifications are normalized. Buying options depend on external data sources. Analytics depend on correctly recording the events used to measure behaviour.

Building Pickwise end-to-end made these relationships tangible. I had to think about what the user sees, how each feature works, what data supports it, and what happens when something fails.

**Pickwise started with a problem I experienced myself. Building it end-to-end helped me turn that problem into connected product decisions, design patterns, engineering logic, and measurable behaviours, while staying clear about what the product can and cannot yet verify.**