import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync(
  new URL("../frontend/pages/landing-page.html", import.meta.url),
  "utf8"
);
const css = readFileSync(
  new URL("../frontend/css/landing-page.css", import.meta.url),
  "utf8"
);
const desktopCss = readFileSync(
  new URL("../frontend/css/landing-page-desktop.css", import.meta.url),
  "utf8"
);
const forestAsset = new URL(
  "../frontend/assets/landing-page/backgrounds/Himas-Archive-Three-Stones.png",
  import.meta.url
);

assert.ok(
  existsSync(forestAsset),
  "Hima archive background asset should exist in landing-page backgrounds"
);

assert.match(
  css + desktopCss,
  /Himas-Archive-Three-Stones\.png/,
  "events styling should reference the Hima archive background"
);

assert.match(
  html,
  /class="[^"]*event-archive-panel/,
  "landing-page events should use persistent archive panels"
);

for (const slug of [
  "kiro-workshop",
  "student-community-day",
  "byte-forward-hackathon",
]) {
  assert.match(
    html,
    new RegExp(`event-detail\\.html\\?event=${slug}`),
    `landing-page events should link to ${slug}`
  );
}

for (const label of ["Workshop", "Community", "Hackathon"]) {
  assert.match(
    html,
    new RegExp(`class="event-meta-chip"[^>]*>${label}<`),
    `landing-page events should show ${label} metadata chip`
  );
}

assert.match(
  html,
  /class="event-archive-cta"[^>]*>View event</,
  "landing-page events should include visible View event actions"
);

console.log("landing-page forest events structure checks passed");
