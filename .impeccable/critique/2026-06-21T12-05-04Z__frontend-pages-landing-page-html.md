---
target: frontend/pages/landing-page.html
total_score: 29
p0_count: 1
p1_count: 2
timestamp: 2026-06-21T12-05-04Z
slug: frontend-pages-landing-page-html
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Solid scroll tracking and clear navigation items. |
| 2 | Match System / Real World | 3 | Navigation and content terminology match expectations. |
| 3 | User Control and Freedom | 3 | Easy navigation through links, but lacks in-page controls. |
| 4 | Consistency and Standards | 3 | Color choices are consistent with Mapúa and AWS branding, but contrast is poor. |
| 5 | Error Prevention | 4 | Static landing page prevents input errors. |
| 6 | Recognition Rather Than Recall | 3 | Simple navigation structure, but cards lack distinguishing visual cues. |
| 7 | Flexibility and Efficiency | 2 | No keyboard accelerators or advanced interaction modes. |
| 8 | Aesthetic and Minimalist Design | 1 | Extremely poor text contrast on cards and busy background competing with text. |
| 9 | Error Recovery | 4 | No complex form entry or error states on this view. |
| 10 | Help and Documentation | 2 | Basic nav links are present, but no contextual search or help features. |
| **Total** | | **29/40** | **Acceptable** |

#### Anti-Patterns Verdict

**LLM assessment**: The layout of the cards section feels like a generic bootstrap-style SaaS landing page template. Using identically sized, aligned cards without icons or micro-interactions on top of a highly detailed, hand-drawn anime forest background causes readability to collapse. The default font Poppins is used for all text, making the typographic hierarchy feel flat and uninspiring.

**Deterministic scan**: The layout scanner identified a `single-font` warning: Poppins is used for the entire page body and headings. Adding a secondary display font (like Montserrat or Lexend) for display headings will immediately elevate the typography.

#### Overall Impression
The background artwork of the lush forest is fantastic and fits the Mapúa student club aesthetic perfectly, but the layout is currently a generic template. The text readability is a critical issue that must be resolved, and the cloud transition at the top needs scaling and positioning adjustments to feel premium and seamless.

#### What's Working
- The translucent nav bar has a clean glass backdrop blur that looks very modern.
- The color choices are bright and friendly, matching the club's welcoming student-centric vibe.

#### Priority Issues

- **[P0] Accessibility (Text Contrast)**: Card titles and descriptions in "DEPARTMENTS", "OFFICES", "VISION", and "MISSION" use dark blue/indigo text on a translucent card over a busy green/dark forest background. Contrast is extremely low, violating WCAG readability standards.
  - *Why it matters*: Users cannot read the text, leading to high abandonment and poor accessibility.
  - *Fix*: Change the card text color to high-contrast white or soft cream, and increase the opacity of the glassmorphic card backgrounds.
  - *Suggested command*: `$impeccable polish`
- **[P1] Identical Card Grid (Layout Sameness)**: The four cards are identical in size and shape, sitting in a flat row. This creates a monotonous, templated visual layout.
  - *Why it matters*: It lacks dynamic interest and makes the organization's core values feel like dry bullet points.
  - *Fix*: Introduce distinct visual cues (like SVGs or custom icons), vary card sizes, or arrange them in an asymmetrical staggered layout.
  - *Suggested command*: `$impeccable layout`
- **[P1] Transition Seam Gaps**: Gaps or hard lines are visible where the hero sky meets the forest clouds transition.
  - *Why it matters*: It breaks the illusion of continuous vertical scrolling, exposing the underlying blue background color.
  - *Fix*: Scale `Transition_Clouds_New.png` to `1.6` and adjust `top` position/scroll translation factors.
  - *Suggested command*: `$impeccable layout`
- **[P2] Typographic Monotony**: Poppins is used for both headings and paragraph copy.
  - *Why it matters*: Visual hierarchy feels flat; headers do not pop out or establish immediate importance.
  - *Fix*: Use a bold geometric font like Montserrat or Lexend for display headings, keeping Poppins for body text.
  - *Suggested command*: `$impeccable typeset`

#### Persona Red Flags

**Sam (Accessibility-Dependent User)**: Completely unable to read the dark blue card titles and text over the busy, dark forest background. Sam will leave the site immediately.

**Jordan (First-Timer)**: Finds the identical, text-heavy cards unengaging and has to read through paragraphs to understand what the club does, with no clear icons or graphics to help recognize the sections.

#### Minor Observations
- The yellow links in the header nav bar have weak contrast on the light translucent glass background.
- Hover effects on cards are simple and would benefit from smooth lift, glow, or gradient border transitions.

#### Questions to Consider
- What if we used custom AWS-themed icons on the cards to make them immediately recognizable?
- How about using a dark overlay or increasing the backdrop blur of the cards to separate the text from the busy artwork?
- Should we stagger the layout of the four cards to feel more organic?
