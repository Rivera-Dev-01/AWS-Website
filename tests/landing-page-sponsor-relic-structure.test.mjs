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
  /class="sponsorship-kicker"[^>]*>Forest Relic Showcase</,
  "sponsor section should include the forest relic showcase kicker"
);

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

assert.match(
  html,
  /class="partner-item partner-item-1 is-active"/,
  "first partner item should expose a stagger hook"
);

assert.match(
  html,
  /class="sponsor-spotlight"/,
  "sponsor section should include the desktop spotlight panel"
);

for (const label of [
  "AWS Learning Club - TUP Manila",
  "AWS Learning Club - Spade",
  "Bitskwela",
  "Tutorials Dojo",
  "Datacamp Donates",
  "KadaKareer",
  "UXPH",
  "Google Developer Groups on Campus Mapua University",
  "COMBINES Mapua",
]) {
  assert.match(
    html,
    new RegExp(`data-partner-name="${label.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}"`),
    `sponsor section should preserve ${label} in the relic wall`
  );
}

assert.match(
  js,
  /function initSponsorSpotlight\(/,
  "landing page JS should initialize sponsor spotlight behavior"
);

assert.match(
  js,
  /section\.addEventListener\("mouseleave"/,
  "landing page JS should restore the spotlight default on mouseleave"
);

assert.match(
  js,
  /initSponsorSpotlight\(\);/,
  "landing page should call initSponsorSpotlight on load"
);

assert.match(
  css,
  /\.sponsor-spotlight\b/,
  "landing page CSS should style the sponsor spotlight"
);

assert.match(
  css,
  /\.partners-marquee-wrapper\b/,
  "landing page CSS should preserve marquee styling for mobile sponsors"
);

assert.match(
  css,
  /relic-stone-slab\.webp/,
  "sponsor relic cards should use the shared generated stone slab texture"
);

assert.match(
  css,
  /--tilt:/,
  "sponsor relic cards should expose a curated rotation variable"
);

console.log("landing-page sponsor relic structure checks passed");
