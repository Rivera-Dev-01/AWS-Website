import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../frontend/pages/landing-page.html", import.meta.url),
  "utf8"
);
const css = readFileSync(
  new URL("../frontend/css/landing-page.css", import.meta.url),
  "utf8"
);
const js = readFileSync(
  new URL("../frontend/js/main.js", import.meta.url),
  "utf8"
);

assert.match(
  html,
  /class="mobile-sea-cloud-transition"/,
  "mobile landing page should include a dedicated Sea to Clouds transition layer"
);

assert.match(
  html,
  /class="mobile-cloud-forest-transition"/,
  "mobile landing page should include a dedicated Clouds to Forest transition layer"
);

assert.match(
  html,
  /class="[^"]*mobile-story-card/,
  "mobile landing page should mark story cards for the cinematic mobile treatment"
);

assert.match(
  html,
  /class="[^"]*mobile-forest-path-card/,
  "mobile Cloud Expertise cards should expose forest path hooks"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*mobile-sea-cloud-transition[\s\S]*Transition_Clouds_New\.png/,
  "mobile CSS should use Transition_Clouds_New.png for the Sea to Clouds seam"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*mobile-cloud-forest-transition[\s\S]*Green_Bush_Transition\.png/,
  "mobile CSS should use Green_Bush_Transition.png for the Clouds to Forest seam"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.events-sponsors-bg::before[\s\S]*Green_Bush_Transition\.png/,
  "mobile CSS should use Green_Bush_Transition.png for forest continuation seams"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*Staircase_BG\.png/,
  "mobile Cloud Expertise styling should be allowed to crop the stronger staircase forest asset"
);

assert.match(
  css,
  /@media\s*\(prefers-reduced-motion:\s*reduce\)/,
  "landing page CSS should include reduced-motion handling for mobile cinematic effects"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.landing-page\s+\.chatbot-trigger-label[\s\S]*display:\s*none/,
  "mobile landing page should compact the chatbot trigger so it does not cover card actions"
);

assert.match(
  html,
  /class="events-carousel-progress"/,
  "mobile event archive should expose a dedicated progress HUD for the peek carousel"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.events-carousel-track\b[\s\S]*display:\s*flex/,
  "mobile event archive should use a horizontal track for a peek carousel"
);

assert.match(
  js,
  /function initLandingPageCarousel\(/,
  "landing page JS should keep a dedicated event archive carousel controller"
);

assert.match(
  js,
  /slide\.classList\.toggle\(\"is-active\"/,
  "event carousel JS should track an active slide state instead of only swapping display"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-carousel-card\b[\s\S]*relic-stone-slab\.webp/,
  "mobile partnership cards should keep the stone slab material"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-card-copy\b[\s\S]*background:/,
  "mobile partnership cards should include a readable copy panel inside the active stone card"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-carousel-card::before\b/,
  "mobile partnership cards should include an inner stone frame for stronger slab readability"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-card-copy\b[\s\S]*url\(["']\.\.\/assets\/landing-page\/partners\/relic-stone-slab\.webp["']\)/,
  "mobile partnership copy panels should reuse the stone slab texture to stay on theme"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-card-copy\b[\s\S]*text-align:\s*center/,
  "mobile partnership copy should center the sponsor description for a cleaner spotlight card"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-carousel-card\b[\s\S]*opacity:\s*1/,
  "mobile partnership cards should stay fully solid instead of fading with opacity"
);

assert.match(
  js,
  /class="partners-marquee-set"/,
  "mobile sponsor section should render duplicated marquee sets for a continuous loop"
);

assert.match(
  js,
  /style\.setProperty\("--marquee-set-width"/,
  "mobile sponsor marquee should measure a full set width for seamless scrolling"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partners-marquee-track\b[\s\S]*animation:\s*partnersMarqueeScroll/,
  "mobile sponsor section should animate a continuous marquee track"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partners-marquee-track\b[\s\S]*gap:\s*0/,
  "mobile sponsor marquee track should not insert a seam between duplicated card sets"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partners-marquee-set\b[\s\S]*padding-right:\s*0/,
  "mobile sponsor marquee sets should not add a blank tail at the loop seam"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partners-marquee-set\b[\s\S]*gap:\s*0/,
  "mobile sponsor marquee sets should place relic cards directly against each other for a touching loop"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partners-marquee-viewport\.is-paused\s+\.partners-marquee-track/,
  "mobile sponsor marquee should pause when the viewport enters its paused state"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-card-copy\b[\s\S]*box-sizing:\s*border-box/,
  "mobile sponsor copy panel should keep its padding inside the card bounds"
);

assert.match(
  js,
  /partner-card-name--xlong/,
  "mobile sponsor marquee should classify extra-long partner names for tighter slab typography"
);

assert.match(
  css,
  /@media\s*\(max-width:\s*768px\)[\s\S]*\.partner-card-logo-frame\b[\s\S]*width:\s*(?:10[0-9]|11[0-9])px/,
  "mobile sponsor relic cards should enlarge the circular logo medallions for stronger branding"
);

console.log("landing-page mobile cinematic structure checks passed");
