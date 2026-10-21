# Pickwise

# Enabling first-time buyers to choose the right laptop & find where to buy it, without requiring technical knowledge.

Pickwise helps first-time laptop buyers find laptops that suit their software needs, understand the differences between them, and find available online and offline buying options—all in one place.

---

## 02. Live product

**[Try Pickwise](https://pickwise-azure.vercel.app/questionnaire/use-case)**

## 03. GitHub repository

**[View the source code](https://github.com/Sahilux-2/pickwise)**

## 04. Product walkthrough

![Product walkthrough](/pickwise-full-walkthrough.mp4)

A short video showing the complete journey, from entering requirements to finding a suitable laptop and its buying options.

---

# 05. Context — Why did I build Pickwise?

## Finding the right laptop shouldn't require becoming a laptop expert.

I faced this problem myself when I was looking for a laptop for demanding software usage.

I knew what I wanted to do with the laptop, but I didn't know exactly what hardware specifications I needed. I had to research software requirements, understand specifications, compare different laptops, and figure out where to buy the one I eventually chose.

There was plenty of information available, but I still had to do the work of connecting everything myself.

This made me think: **Why should someone need to understand laptop specifications just to find a laptop that suits their needs?**

I wanted to explore a simpler way of doing this, where users could start with what they want to do instead of having to understand laptop hardware first.

I started with my own experience and then looked at existing platforms to understand how they were solving these problems and where there was room to do things differently.



# 06. User persona

## Neil — an 18-year-old college fresher

Neil is an 18-year-old college fresher in Lucknow. He has chosen Game Development as his career path and wants to buy his first laptop.

He'll mostly use it to run game engines and play light games. He knows what he'll be using the laptop for, but he only has surface-level technical knowledge. For example, he knows what RAM and ROM are, but isn't confident evaluating other laptop specifications.

His budget is ₹75,000–₹85,000.

Neil also has a short attention span, so he prefers concise content and short, straightforward experiences.

**His main need is simple: find a laptop that suits his work without spending hours trying to understand technical specifications.**

This is a working persona based on my own experience and the target scenario. I used it to guide my decisions, rather than treating it as a persona validated through formal user interviews.


# 07. The three problems

## 01. Finding suitable laptops

Users know what they want to do with a laptop, but may not know which hardware specifications their software requires.

For example, Neil wants to get into game development, but he may not know what processor, graphics card, or RAM configuration he should look for.

**The problem:** Users have to figure out the technical requirements themselves before they can identify suitable laptops.

## 02. Understanding the differences between laptops

Even after finding a few suitable laptops, users still need to compare their specifications and figure out what those differences actually mean for their work.

Two laptops might have similar prices but differ in graphics performance, cooling, battery life, or weight.

**The problem:** Users have to interpret technical specifications to understand which laptop is better suited to their needs.

## 03. Finding where to buy the chosen laptop

After deciding which laptop they want, users still need to search retailer websites, compare prices, and look for nearby offline stores.

**The problem:** The buying process is spread across multiple sources, so users have to continue researching even after choosing a laptop.



# 08. Competitive analysis — Why do these problems exist?

Since I had already experienced the problem myself, I wanted to understand how existing solutions handled these specific difficulties.

I reviewed six platforms: Laptop Arena, Microsoft's Help Me Choose, Gadgets 360, Gadgets Now, Smartprix, and 91mobiles.

I focused on three things:

- Can users start with what they want to do instead of laptop names or technical specifications?
- Can users understand the practical differences between laptops without interpreting the specifications themselves?
- Can users move from choosing a laptop to finding buying options without doing all the research again?

## What I observed

| Platform | Key takeaway from my review |
|---|---|
| **Laptop Arena** | Specification-led discovery, extensive comparisons, and a single Amazon buying link in the experience reviewed. |
| **Microsoft Help Me Choose** | Windows-focused recommendations; the experience I reviewed didn't cover the broader comparison and buying journey I wanted to solve. |
| **Gadgets 360** | Product-led discovery, lengthy comparisons, and limited buying links in the experience reviewed. |
| **Gadgets Now** | Visual indicators highlight differences, but users still need to interpret the specifications. |
| **Smartprix** | Price trends and comparison indicators help, but users still need to understand technical differences. |
| **91mobiles** | Product-led discovery and extensive comparisons, with limited purchasing support in the experience reviewed. |

These are observations from the platforms I reviewed at the time, not a claim that these platforms fail for every user.

### Why not just watch YouTube reviews?

YouTube reviews are useful, but users still need to find reviewers they trust, watch multiple videos, understand technical terminology, and figure out whether a review applies to their own budget and workload.

The problem isn't that reviews are useless. It's that users still have to connect all that information to their own needs.

### Why not just use AI?

A general-purpose AI assistant can explain specifications and recommend laptops. But a conversational answer alone doesn't necessarily give users a consistent way to browse actual products, compare them visually, and find current buying options.

I saw an opportunity to bring together structured laptop data, recommendation rules, understandable comparisons, and buying information in one purpose-built experience.

### The opportunity

**Existing platforms already provide parts of the solution. I wanted Pickwise to connect those tasks around the user's needs, instead of making users do all the interpretation themselves.**



# 09. User story 1 — Finding suitable laptops

**User story**

*As a first-time buyer who knows what they'll use the laptop for but lacks technical knowledge, I want to easily identify laptops that can run my software so I can shortlist suitable options without understanding specifications.*

## The solution

I designed a three-step questionnaire:

**Use case → Preferences → Budget → Recommendations**

The idea was to collect what Pickwise needs to recommend laptops without asking users to understand hardware specifications first.

## Why this solution?

### Why three questionnaire screens instead of one?

At first, I considered putting all three questions on one screen. This would reduce the number of screens and let users see everything upfront.

But that meant Neil would have to process three different questions and input types at once. Since he's already unfamiliar with laptop buying and prefers short experiences, a long form could make the task feel more demanding than it needs to be.

I went with three focused screens instead. Each screen asks one main question, and a progress indicator tells the user how many steps remain.

**My reasoning:** Reducing the number of screens isn't always the best solution. In this case, making each step easier to understand was more important.

> **[VISUAL 05 — QUESTIONNAIRE ITERATIONS]**
>
> Show the initial single-screen questionnaire concept beside the final three-step flow.
>
> Callout: *“One focused question per screen, with clear progress.”*

### Why start with the use case instead of specifications?

I could have started with traditional filters such as processor, RAM, and graphics. But that would require users to understand specifications before they could get useful recommendations.

Instead, the first question asks:

**“What will you use the laptop for?”**

Users can type their needs in their own words or select from Quick Picks.

### Why Quick Picks?

I wanted users to complete the task quickly without having to type every requirement or know the exact name of their software.

Quick Picks include common workloads such as Game Development, 3D Modeling, Video Editing, Architecture, and Software Development. Users can also search for other workloads or tools.

I considered showing the entire library upfront, but that would make the first screen overwhelming. Instead, I kept common choices visible and made the wider library searchable.

**This way, users can pick a common option quickly without losing the flexibility to describe more specific needs.**

### Why inline clarification instead of a modal?

A broad answer like “editing” might not give Pickwise enough information to recommend suitable laptops.

I considered asking for clarification in a modal, but that would interrupt the flow and put another layer over the existing input.

I chose inline clarification because the user can answer the follow-up in the same context.

For example: *“What kind of designing or editing will you be doing?”*

It's not an error state. The user hasn't done anything wrong; Pickwise just needs a little more information.

### Why collect preferences separately?

Two laptops can run the same software but provide very different everyday experiences.

After understanding the workload, Pickwise asks what matters to the user personally, such as portability, battery life, cooling, or display quality.

This helps separate what the user **needs** from what they **prefer**.

### Why a recommended minimum budget and a small set of Quick Picks?

I considered having a detailed budget drawer with lots of predefined options. But the user's use case and preferences already influence what budget is realistic.

A large drawer would add unnecessary work and could show arbitrary amounts that don't make sense for their requirements.

Instead, Pickwise provides a recommended minimum budget and a few useful Quick Picks around it.

For example, if the recommended minimum is ₹95,000, the user might see ₹90,000, ₹1 lakh, ₹1.1 lakh, and ₹1.2 lakh.

This makes budget selection quicker and helps users understand the likely cost before proceeding. It also reduces the chances of running into a no-match result simply because the selected budget is unrealistic.

It doesn't eliminate every no-match case, but it gives users more information before they continue.

> **[VISUAL 06 — QUICK PICKS AND BUDGET]**
>
> Show the use-case Quick Picks drawer, inline clarification state, and budget screen with the recommended minimum.
>
> Add short callouts: **“Choose instead of type”**, **“Clarify without interrupting”**, and **“Set realistic budget expectations.”**

## The recommendations screen

I followed familiar laptop and e-commerce website patterns instead of inventing a new listing layout. Users already understand product cards, prices, and clicking a product to see its details.

I kept the cards simple, showing laptop images, names, and prices. Since users have already entered their requirements, showing lots of technical specifications at this stage would just add more information to process.

Users can edit their inputs, open laptop details, add laptops to Compare, or save them to Wishlist.

I also designed a no-exact-match state. If no laptop satisfies all the user's requirements, Pickwise shows the closest alternatives instead of making them look like perfect matches.

### Edge cases I designed for

- **Vague use case:** Ask an inline clarification question.
- **Budget too low:** Explain the recommended minimum and show feasible alternatives where available.
- **No laptop matches all inputs:** Show a clear no-exact-match state and the closest alternatives.
- **Laptop matches the use case but exceeds budget:** Explain the budget mismatch.
- **Laptop matches use case and budget but misses a preference:** Keep the result if it's still relevant, but make the trade-off clear.
- **No preferences selected:** Continue using the use case and budget.
- **AI or network request fails:** Preserve user inputs and fall back to deterministic results and predefined copy where possible.

> **[VISUAL 07 — RECOMMENDATIONS AND EDGE CASES]**
>
> Show the normal listing beside the no-exact-match state. Add callouts to the result cards, Edit inputs, and explanation of the closest alternatives.

## How it works behind the scenes

The recommendation system combines structured data, deterministic rules, and AI-assisted interpretation.

**Curated data:** `laptops.ts` contains approximately 30 curated laptops with specifications, tags, and INR prices. `workloads.ts` maps use cases to minimum and recommended hardware requirements.

**Input normalization:** The `/api/recommend` route can use Gemini to translate free-text inputs into known workload and tag keys.

**Recommendation engine:** The system filters and ranks laptops using structured requirements. The core evaluation doesn't depend on an AI network request.

**Explanations:** Gemini generates structured recommendation explanations where available. If AI fails, predefined logic and copy can still present results.

**Caching and rate limiting:** Caching and Upstash rate limiting help reduce repeated requests and manage external-service usage.

### Technical trade-offs and limitations

The curated catalogue gives me control over the data and evaluation rules, but it covers only approximately 30 laptops rather than every laptop available in the market.

This means recommendations are limited by the products and information available. If a specification is missing or outdated, Pickwise may not be able to evaluate that laptop reliably.

I also need to distinguish between a confirmed mismatch and information the system doesn't have. Missing data shouldn't automatically mean that a laptop is unsuitable.

I chose a structured catalogue and deterministic rules because they're easier to test and reason about than asking an AI model to judge every laptop without consistent product data.

## How I measure success

**Primary metric:** Percentage of users adding a laptop to Compare or Wishlist.

### Why this metric?

Completing the questionnaire doesn't necessarily mean users found the recommendations useful. Adding a laptop to Compare or Wishlist is a stronger signal that they've found something worth considering.

**Secondary metric:** Onboarding completion rate.

### Why this metric?

This tells me whether users are completing the starting flow. If multiple users abandon the questionnaire, I'd investigate where they're dropping off and find out why.

These metrics tell me about user behaviour, not whether every recommendation is technically suitable. That would require additional evaluation and user testing.

# 10. User story 2 — Understanding and comparing laptops

**User story**

*As a first-time buyer, I want to quickly understand the practical differences between two or more similar laptops without understanding technical specifications, so I can confidently choose one.*

## Laptop details — conclusion first, evidence after

Initially, I explored showing human-language explanations for individual specifications directly on the laptop details page.

For example, instead of showing only the amount of RAM, the page could say that the laptop handles heavy multitasking well.

But I realised this wouldn't scale well.

Each specification could have multiple capability levels, and the wording could depend on the user's workload, preferences, and other requirements. Writing and maintaining unique sentences for every combination would create a large, repetitive library. The page could also become cluttered by explaining every single specification.

I needed a simpler way to communicate the overall result without repeating the same message throughout the page.

### Why the global fit summary?

I moved the overall interpretation into one global fit container with three fixed states:

- **Strong match for your needs**
- **Good match with one trade-off**
- **Not the best match for your needs**

The supporting copy stays consistent, while specific trade-offs or unmet requirements are shown separately.

For example, a strong match might say:

*“Meets your use case, preferences and budget.”*

A good match could say:

*“Meets most of your needs, with one thing to consider.”*

### Why this is more scalable

The global container gives users one overall conclusion, regardless of how many specifications or preferences they have.

The technical specifications remain available as evidence, and important mismatches can be highlighted individually.

Instead of maintaining contextual copy for every possible combination, I only need a small, consistent set of global states and separate logic for specific trade-offs.

**Global summary = conclusion. Specs = evidence.**

> **[VISUAL 08 — LAPTOP DETAILS ITERATION]**
>
> Show the earlier concept with human-language copy repeated across specification rows beside the final global fit summary and technical-specification layout.
>
> Callout: *“One overall conclusion, instead of repeating the interpretation for every spec.”*

## Comparison — explain what the differences actually mean

The details page explains one laptop. The comparison page helps users understand how multiple laptops differ and which one is better suited to their needs.

I used a table-like layout because it's a familiar way to compare products and makes it easier to scan the same specification across several laptops.

I also followed existing laptop and e-commerce patterns for the details and comparison layouts instead of adding unfamiliar interactions without a clear benefit.

### Why a reusable natural-language specification library?

I considered showing raw technical values in the comparison table, but users would still have to interpret those values themselves, the exact problem Pickwise is trying to solve.

I also explored contextual copy for individual specifications, but creating unique sentences for every combination of user needs and laptop capabilities would be difficult to maintain.

Instead, I created a reusable natural-language specification library that maps normalized capability levels to short, prewritten statements.

| Specification | Low | Medium | High |
|---|---|---|---|
| Processor | May struggle with demanding software | Handles demanding software well | Handles demanding software smoothly |
| Graphics | Better for lighter graphics work | Handles demanding graphics work well | Handles demanding graphics work smoothly |
| RAM | Better for lighter multitasking | Handles heavy multitasking well | Great for heavy multitasking |
| Storage | May feel limiting for large apps and files | Enough space for apps and projects | Plenty of space for apps, projects and files |
| Weight | Heavier for everyday carrying | Reasonably easy to carry | Easy to carry every day |

The wording is specific to each type of specification. Not everything follows Low/Medium/High; OS compatibility, for example, needs a different approach.

### Why not generate every comparison with AI?

**Consistency:** AI might describe the same capability differently across comparisons, making the experience less predictable.

**Cost and quotas:** Generating copy for every specification in every comparison would consume tokens on repetitive sentences. That would exhaust the available model quota faster and increase costs without adding much value to the user.

**Control:** Prewritten copy mapped through explicit rules is easier to test, inspect, and update. It also reduces the risk of exaggerated or misleading statements.

I chose to use AI where it adds value, interpreting inputs and generating the overall comparison verdict—while using predefined copy for individual specification rows.

### Other design decisions

**Relevant specifications appear first.** The order reflects the user's workload and preferences. Other core specifications follow without another section heading that would make the table more complicated.

**No forced winner indicator.** I considered marking the better laptop in every row, but not every difference represents a meaningful advantage. A forced winner could create false precision.

**The final verdict comes last.** Users see the comparison before receiving the overall conclusion. If multiple laptops are equally suitable, the verdict can acknowledge that instead of inventing a single winner.

> **[VISUAL 09 — COMPARISON EXPERIENCE]**
>
> Show the comparison screen prominently. Add callouts to the relevant-first ordering, human-language copy, and final verdict.
>
> Include a small inset showing how one specification maps to Low, Medium, and High copy.

## How it works behind the scenes

The comparison system uses the same structured laptop catalogue and evaluation approach as the recommendation engine.

- `translations.ts` stores the reusable human-language specification copy.
- Specification values are evaluated using application rules and available product data.
- Normalized capability levels map to the relevant phrases.
- OS compatibility and other non-graded properties use separate rules.
- Gemini can generate a structured comparison verdict through the comparison API.

The implementation includes timeouts, retries, model fall-through, caching, and fallback behaviour so a failed AI request doesn't necessarily block the experience.

### Technical trade-offs and limitations

The copy library depends on reliable rules for mapping actual specifications to capability levels. A phrase is only as reliable as the underlying data and classification logic.

The wording also needs to stay realistic. It should explain capability without promising that a laptop will never lag, overheat, or struggle.

The global fit summary and comparison library therefore serve different purposes: one gives the overall conclusion, and the other explains individual differences.

## How I measure success

**Primary metric:** Percentage of users who proceed from Compare to buying options by clicking a recommended laptop.

### Why this metric?

The purpose of comparison is to help users make a decision. Progressing from Compare to buying options is a useful signal that the user is ready to take the next step.

I measure this transition specifically from the comparison screen, excluding users who navigate directly from laptop details to buying options.

This metric doesn't prove that users understood the comparison or chose the right laptop. It tells me whether they're progressing to the next step.

# 11. User story 3 — Finding where to buy the laptop

**User story**

*As a first-time buyer, I want to know the safest and most cost-effective place to purchase my chosen laptop, online or offline, so I can maximize value and confidence.*

## The solution

I designed a single buying-options screen that presents available online and nearby offline options together.

The screen includes the retailer or store name, price where available, category, and location for offline stores.

I followed a familiar table/list pattern because users need to compare several pieces of information across multiple options. I didn't want to introduce another interaction pattern that would make the data harder to scan.

### Why one unified table?

I considered separating results into **“Better options” and “Other options.”**

But this would imply that Pickwise could reliably rank every retailer and store across price, warranty, returns, trustworthiness, delivery, distance, and availability.

The available data didn't support that level of certainty.

I chose one unified list, with a small **Recommended** label when the available evidence supports a recommendation. This avoids suggesting that one option is objectively the safest or cheapest without enough evidence.

I also removed the secondary details drawer because it would mostly repeat information available on the retailer or map destination.

> **[VISUAL 10 — BUYING OPTIONS ITERATION]**
>
> Show the rejected two-section concept beside the final unified table.
>
> Callouts:
>
> - One list avoids an unreliable overall ranking.
> - A small Recommended pill keeps the recommendation visible without competing with the content.
> - Store and retailer names take users to the relevant destination.

### Why ask for location at this point?

I considered requesting location during onboarding, but that would ask users to share their location before they had a clear reason to do so.

Instead, Pickwise asks when the user reaches buying options and wants to see nearby offline stores.

At this point, the user has already selected or compared laptops and is exploring where to buy one. I expected the permission request to have a better chance of being accepted because the reason is clear and directly related to what they're trying to do.

I chose a contextual modal rather than a separate screen because location is a small prerequisite to the buying task, not a separate journey.

Users can still continue without location access and view online options.

### Why keep partial results visible?

If no nearby stores are found, online options should remain accessible. If online results are unavailable, nearby stores may still help.

Replacing the entire screen with an empty state would hide useful information just because one source failed.

> **[VISUAL 11 — LOCATION AND PARTIAL STATES]**
>
> Show the location modal, the buying-options screen with location enabled, and a partial-result state.
>
> Callout: *“Ask when the location is useful—not before.”*

## How it works behind the scenes

### Online buying options — SerpApi

The `/api/buying-options` route uses SerpApi to retrieve Google organic search results for the Indian market.

The system uses retailer query templates, checks trusted hosts, and provides retailer-search links if it can't obtain a reliable direct result.

I implemented in-memory caching, in-flight request deduplication, timeouts, and retry handling to reduce repeated requests and handle failures.

Search-derived results aren't the same as verified live stock or guaranteed prices.

### Offline-store discovery — Geoapify

The `/api/stores` route uses Geoapify for reverse geocoding and nearby-place discovery. It can also geocode a manually entered address.

The requests have timeouts, and the system returns an empty or unavailable state if the service fails.

However, a nearby-store API tells Pickwise that a store exists in an area. It doesn't tell us whether that store has the selected laptop in stock.

I treated these as two separate problems: finding a nearby store and verifying product-specific inventory.

### Edge cases and trade-offs

- **Online options available, no nearby stores:** Keep online results visible and explain that no nearby stores were found.
- **Nearby stores available, no online match:** Keep offline results visible and explain that the current online search didn't find a matching option.
- **No usable buying options:** Explain that no verified options were found through currently supported sources, rather than claiming the laptop isn't available anywhere.
- **Location permission denied:** Continue with online options.
- **API timeout or failure:** Return an unavailable/empty state and allow recovery.
- **Missing or unreliable price:** Don't invent a price or imply that a search result guarantees current availability.

The main technical limitation is that the online flow relies primarily on search-derived information, while offline discovery identifies nearby stores but doesn't verify their exact inventory.

This means Pickwise can consolidate available buying options, but it cannot guarantee that every retailer has been checked or that an option is objectively the safest and most cost-effective.

I chose to make these limitations explicit instead of creating a more confident-looking interface without the data to support it.

## How I measure success

**Primary metric:** Buying-options outbound click-through rate.

### Why this metric?

An outbound click shows that the user found an option worth exploring. It doesn't prove that the user completed a purchase; that would require reliable conversion data from the retailer.

**Secondary metric:** Recommended-option click-through rate.

### Why this metric?

I wanted to measure whether the recommendation label helps users identify an option worth considering.

Only users who are shown a Recommended option should be included. If no option is recommended, that session shouldn't count towards this metric.

> **[VISUAL 12 — FINAL BUYING OPTIONS]**
>
> Show a readable screenshot of the final buying-options table, with callouts for the recommendation label and location information.

# 12. Analytics implementation

## Measuring the journey without forcing account creation

I implemented anonymous event tracking to measure important stages of the user journey.

### Why anonymous authentication?

Pickwise is a utility for an infrequent, high-intent task. I didn't want users to create an account before they could get value from the product.

At the same time, I needed a way to associate analytics events and reviews with an anonymous user identity.

Firebase Anonymous Authentication provides that identity without a signup or login wall. Questionnaire inputs, Wishlist, Compare state, and journey progress remain in browser storage; they aren't synced across devices.

**Anonymous identity for analytics and reviews. Browser storage for the local journey.**

The `trackEvent` function sends allowlisted events to Firestore. Rules restrict client writes, prohibit client reads, and require authentication. Analytics failures don't interrupt the core experience.

> **[VISUAL 13 — FIREBASE CONSOLE]**
>
> Show Firestore event records and a few key journey events.
>
> Caption: *“Anonymous analytics records important user actions without requiring account creation.”*

This demonstrates that instrumentation is implemented and recording events. It isn't evidence of improved conversion or validated user outcomes.

# 13. My learnings

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