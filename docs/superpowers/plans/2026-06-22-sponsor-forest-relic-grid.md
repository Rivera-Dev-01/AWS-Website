# Sponsor Forest Relic Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the desktop Partnership & Sponsors section into a forest-themed staggered relic grid inspired by the angled tile-wall reference while preserving sponsor order, readability, and the current mobile marquee behavior.

**Architecture:** Keep the existing sponsor metadata and mobile marquee logic, but replace the desktop flat grid with a layered composition: a recessed field of empty relic slots, a staggered set of sponsor plaques above it, and one visibly spotlighted active plaque connected to the description panel. Drive the active state through the existing sponsor metadata so the visual redesign stays mostly in HTML/CSS with a small extension to desktop interaction logic.

**Tech Stack:** Vanilla HTML, CSS, and JavaScript; existing landing-page assets and sponsor images; lightweight Node structure tests.

---

### Task 1: Define the staggered relic-wall markup strategy

**Files:**
- Modify: `frontend/pages/landing-page.html`
- Reference: `frontend/pages/landing-page.html:450-612`

- [ ] **Step 1: Map the desktop-only structure changes**

Decide on these structural layers inside `.sponsorship-section`:

```html
<section class="sponsorship-section">
  <div class="sponsorship-shell">
    <div class="sponsorship-header">...</div>
    <div class="sponsorship-relic-stage">
      <div class="sponsorship-relic-backdrop" aria-hidden="true">
        <span class="relic-slot relic-slot-1"></span>
        <span class="relic-slot relic-slot-2"></span>
        <span class="relic-slot relic-slot-3"></span>
      </div>
      <div class="sponsor-spotlight">...</div>
      <div class="partners-container">...</div>
    </div>
  </div>
</section>
```

Expected: The plan keeps the current sponsor header and spotlight content, but introduces a dedicated stage so the decorative recessed slots and sponsor plaques can overlap cleanly.

- [ ] **Step 2: Preserve sponsor order and metadata contract**

Keep the current button order and metadata attributes exactly as the source of truth:

```html
<button
  class="partner-item is-active"
  type="button"
  data-partner-name="AWS Learning Club - TUP Manila"
  data-partner-type="Founding community partner"
  data-partner-description="..."
  data-partner-logo="../assets/landing-page/partners/TUP-Manila.webp"
  data-partner-alt="AWS Learning Club - TUP Manila"
>
```

Expected: No new sponsor data store is introduced; the existing `data-*` contract remains the driver for the spotlight.

- [ ] **Step 3: Add per-item layout hooks for the staggered composition**

Give each sponsor tile a class or data index so CSS can position it with intentional offsets:

```html
<button class="partner-item partner-item-1 is-active" ...>
<button class="partner-item partner-item-2" ...>
<button class="partner-item partner-item-3" ...>
```

Expected: CSS can assign subtle vertical and horizontal nudges without relying on fragile `nth-child()` selectors alone.


### Task 2: Plan the desktop visual composition

**Files:**
- Modify: `frontend/css/landing-page.css`
- Reference: `frontend/css/landing-page.css` sponsor section block near the end

- [ ] **Step 1: Build the recessed relic-slot background**

Add a background field that echoes the reference image’s empty rounded slots, but themed as dark mossy stone:

```css
.sponsorship-relic-backdrop {
  position: absolute;
  inset: 20px 0 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 22px;
  transform: perspective(1200px) rotateX(58deg) rotateZ(-24deg) scale(1.05);
  opacity: 0.62;
}

.relic-slot {
  aspect-ratio: 1 / 0.78;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(18, 22, 18, 0.96), rgba(8, 10, 9, 0.98));
  box-shadow: inset 0 0 0 2px rgba(139, 171, 120, 0.08);
}
```

Expected: The section gets the same “field of slots” energy as the reference, but reads like a forest archive floor rather than a music app.

- [ ] **Step 2: Convert sponsor cards into elevated relic plaques**

Restyle each `.partner-item` to feel like a tile hovering above the recessed wall:

```css
.partner-item {
  position: relative;
  border-radius: 28px;
  transform: translate3d(0, 0, 0);
  box-shadow:
    0 24px 34px rgba(3, 10, 8, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.partner-item.is-active {
  box-shadow:
    0 28px 42px rgba(3, 10, 8, 0.42),
    0 0 0 2px rgba(255, 232, 169, 0.66);
}
```

Expected: The active sponsor tile gets the “featured cover” treatment from the reference without becoming too glossy or too dark.

- [ ] **Step 3: Define the stagger pattern**

Assign subtle offsets so the sponsor wall feels curated:

```css
.partner-item-1 { transform: translateY(18px); }
.partner-item-2 { transform: translate(24px, -8px); }
.partner-item-3 { transform: translateY(-22px); }
.partner-item-4 { transform: translate(-18px, 16px); }
.partner-item-5 { transform: translate(10px, -4px); }
```

Expected: The layout references the diagonal rhythm of the inspiration image, but still preserves readability and hover targets.

- [ ] **Step 4: Anchor the spotlight panel into the same composition**

Move the spotlight so it visually belongs to the relic wall instead of floating above it:

```css
.sponsor-spotlight {
  position: relative;
  z-index: 3;
  max-width: 440px;
  margin: 0 auto 0 0;
}
```

Expected: The spotlight acts like the narrative anchor while the angled sponsor plaques fill the stage around it.


### Task 3: Extend the desktop interaction model

**Files:**
- Modify: `frontend/js/main.js`
- Reference: `frontend/js/main.js:172-220`
- Test: `tests/landing-page-sponsor-relic-structure.test.mjs`

- [ ] **Step 1: Keep the current spotlight metadata flow intact**

Do not replace `initSponsorSpotlight()`. Extend it only if needed:

```js
function applySpotlight(item) {
  items.forEach((entry) => entry.classList.toggle("is-active", entry === item));
  name.textContent = item.dataset.partnerName || "";
  type.textContent = item.dataset.partnerType || "";
  description.textContent = item.dataset.partnerDescription || "";
  logo.src = item.dataset.partnerLogo || logo.src;
  logo.alt = item.dataset.partnerAlt || item.dataset.partnerName || logo.alt;
}
```

Expected: The interaction logic stays stable while the visual language changes around it.

- [ ] **Step 2: Add a desktop-only reset state if composition needs it**

If the visual design benefits from restoring the featured sponsor after mouse leave, add a remembered default:

```js
const defaultItem = section.querySelector(".partner-item.is-active") || items[0];

section.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) applySpotlight(defaultItem);
});
```

Expected: The wall feels composed rather than drifting into arbitrary states after hover exploration.

- [ ] **Step 3: Keep mobile untouched except for style inheritance**

Do not bind new special behavior to the mobile marquee clones beyond what already exists.

Run: no code change if unnecessary
Expected: Mobile continues to use `initSponsorsMarquee()` exactly as today.


### Task 4: Protect the mobile marquee experience

**Files:**
- Modify: `frontend/css/landing-page.css`
- Reference: existing `@media (max-width: 768px)` sponsor rules

- [ ] **Step 1: Explicitly isolate desktop-only 3D effects**

Fence the angled wall treatment behind desktop media rules:

```css
@media (min-width: 769px) {
  .sponsorship-relic-stage { ... }
  .sponsorship-relic-backdrop { ... }
  .partners-container { ... }
}
```

Expected: The mobile layout does not inherit awkward transforms, absolute positioning, or oversized border radii.

- [ ] **Step 2: Keep mobile as a marquee of relic tokens**

Refine, but do not replace, the mobile sponsor strip:

```css
@media (max-width: 768px) {
  .partners-flow-row .partner-item {
    border-radius: 16px;
    min-height: 108px;
  }
}
```

Expected: Mobile still reads as the same sponsor system, just lighter and flatter for smaller screens.


### Task 5: Update the structure test for the new composition

**Files:**
- Modify: `tests/landing-page-sponsor-relic-structure.test.mjs`

- [ ] **Step 1: Add checks for the new relic-stage markup**

Extend the test with assertions like:

```js
assert.match(
  html,
  /class="sponsorship-relic-stage"/,
  "sponsor section should include the relic stage wrapper"
);

assert.match(
  html,
  /class="sponsorship-relic-backdrop"/,
  "sponsor section should include the recessed relic backdrop"
);
```

Expected: The test guards the new structural idea, not just the old spotlight shell.

- [ ] **Step 2: Add checks for stagger hooks**

Assert that the sponsor tiles expose the planned classes:

```js
assert.match(
  html,
  /class="partner-item partner-item-1 is-active"/,
  "first partner item should expose a stagger hook"
);
```

Expected: The plan protects the composition hooks needed for the angled grid.

- [ ] **Step 3: Keep the mobile marquee assertion**

Retain the existing mobile check:

```js
assert.match(
  css,
  /\.partners-marquee-wrapper\b/,
  "landing page CSS should preserve marquee styling for mobile sponsors"
);
```

Expected: The test continues to guard the user-approved mobile behavior.


### Task 6: Verify visually and functionally

**Files:**
- Test: `tests/landing-page-sponsor-relic-structure.test.mjs`
- Test: `tests/landing-page-forest-events-structure.test.mjs`
- Test: `tests/landing-page-cloud-expertise-structure.test.mjs`

- [ ] **Step 1: Run the sponsor structure test**

Run: `node tests/landing-page-sponsor-relic-structure.test.mjs`
Expected: `landing-page sponsor relic structure checks passed`

- [ ] **Step 2: Run the existing landing-page regression checks**

Run: `node tests/landing-page-forest-events-structure.test.mjs`
Expected: `landing-page forest events structure checks passed`

Run: `node tests/landing-page-cloud-expertise-structure.test.mjs`
Expected: `landing-page cloud expertise staircase structure checks passed`

- [ ] **Step 3: Verify desktop composition in the browser**

Review these visual checkpoints at `http://localhost:8000/`:

```text
1. Sponsor wall reads diagonally, not as a plain 3-column grid.
2. Empty recessed slots are visible but quieter than active sponsor plaques.
3. Spotlight panel remains readable and connected to the wall.
4. No sponsor plaque overlaps the section title or footer transition.
5. Sponsor order is unchanged.
```

Expected: The composition clearly echoes the reference image without losing the forest identity.

- [ ] **Step 4: Verify mobile behavior at 375px**

Review these mobile checkpoints:

```text
1. Infinite marquee still loops smoothly.
2. Sponsor tokens are readable and not clipped vertically.
3. No desktop perspective transforms leak into mobile.
4. The section still feels visually connected to the forest archive above it.
```

Expected: Mobile remains stable and familiar while desktop gets the more dramatic redesign.


### Task 7: Commit in focused slices

**Files:**
- Modify: `frontend/pages/landing-page.html`
- Modify: `frontend/css/landing-page.css`
- Modify: `frontend/js/main.js`
- Modify: `tests/landing-page-sponsor-relic-structure.test.mjs`

- [ ] **Step 1: Commit the structural and style work**

Run:

```bash
git add frontend/pages/landing-page.html frontend/css/landing-page.css
git commit -m "feat: redesign sponsors as forest relic wall"
```

Expected: The visual composition lands as one coherent unit.

- [ ] **Step 2: Commit any follow-up interaction or test adjustments**

Run:

```bash
git add frontend/js/main.js tests/landing-page-sponsor-relic-structure.test.mjs
git commit -m "test: cover sponsor relic wall interactions"
```

Expected: The behavioral guardrails land as a second focused slice if needed.
