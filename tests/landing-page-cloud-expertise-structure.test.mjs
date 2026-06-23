import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../frontend/pages/landing-page.html", import.meta.url),
  "utf8"
);
const css = readFileSync(
  new URL("../frontend/css/landing-page-desktop.css", import.meta.url),
  "utf8"
);

assert.match(
  html,
  /class="exp-staircase-scene"/,
  "landing-page.html should include a dedicated staircase scene layer"
);

assert.match(
  html,
  /class="exp-card-shell"/,
  "landing-page.html should include the stone-and-glass shell wrapper for staircase cards"
);

assert.match(
  css,
  /Staircase_BG\.png/,
  "landing-page-desktop.css should reference the cinematic staircase background asset"
);

assert.match(
  css,
  /GreenBushEdges\.png/,
  "landing-page-desktop.css should reference the rooted foliage edge asset"
);

assert.match(
  css,
  /\.exp-staircase-transition-veil/,
  "landing-page-desktop.css should include a dedicated veil that hides the title-to-staircase seam"
);

assert.match(
  css,
  /\.exp-card-side-foliage/,
  "landing-page-desktop.css should include side foliage wrappers for the staircase cards"
);

assert.match(
  html,
  /class="exp-staircase-divider"/,
  "landing-page.html should include a dedicated divider ledge between the title section and the restarted staircase section"
);

assert.match(
  html,
  /class="exp-staircase-cards-group"/,
  "landing-page.html should group the lower staircase cards into their own restarted section"
);

const staircaseSceneRule = css.match(/\.exp-staircase-scene\s*\{[^}]*\}/)?.[0] ?? "";
const staircaseDividerRule = css.match(/\.exp-staircase-divider\s*\{[^}]*\}/)?.[0] ?? "";

assert.ok(
  staircaseSceneRule,
  "landing-page-desktop.css should define the lower staircase scene layer"
);

assert.doesNotMatch(
  staircaseSceneRule,
  /transform:\s*translateY/,
  "the lower staircase scene should stay anchored under the divider instead of translating and exposing a blue stripe"
);

assert.match(
  staircaseDividerRule,
  /background:\s*none/,
  "the staircase divider should only position foliage, not render as a filled dark overlay"
);

console.log("landing-page cloud expertise staircase structure checks passed");
