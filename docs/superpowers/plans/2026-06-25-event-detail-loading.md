# Event Detail Loading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the event detail loading spinner so it disappears after event data renders, without changing the mobile event-detail layout.

**Architecture:** Keep the existing mobile-safe DOM structure: `#event-detail-root` remains the page wrapper and `.event-detail-shell` remains its child. Change JavaScript to render against the existing root instead of `document`, then scope the spinner pseudo-element to an explicit loading class that is removed after `renderEventDetail()` completes.

**Tech Stack:** Static HTML, plain JavaScript, existing CSS, browser/manual verification.

---

### Task 1: Restore Renderer Target Without Touching Mobile Markup

**Files:**
- Modify: `frontend/js/event-detail.js`
- Verify: `node -c frontend/js/event-detail.js`

- [ ] **Step 1: Confirm the current root cause**

Run:

```bash
rg -n "document.getElementById\\(\"event-detail-container\"\\)\\|e.dataset.eventSlug\\|injectMobileWaves" frontend/js/event-detail.js
```

Expected: `renderEventDetail()` uses `document.getElementById("event-detail-container")||document`, then writes `e.dataset.eventSlug`, which is unsafe when `e` is `document`.

- [ ] **Step 2: Replace the unsafe fallback with the existing page root**

In `frontend/js/event-detail.js`, change both container lookups:

```js
document.getElementById("event-detail-container")||document
```

to:

```js
document.getElementById("event-detail-container")||document.getElementById("event-detail-root")
```

Expected: `renderEventDetail()` and `showEventError()` target the existing root wrapper when no `#event-detail-container` exists.

- [ ] **Step 3: Verify JavaScript syntax**

Run:

```bash
node -c frontend/js/event-detail.js
```

Expected: no output and exit code `0`.

### Task 2: Make Spinner State Explicit

**Files:**
- Modify: `frontend/pages/event-detail.html`

- [ ] **Step 1: Scope the spinner pseudo-element to a loading class**

In `frontend/pages/event-detail.html`, update the inline style:

```css
#event-detail-root::before
```

to:

```css
#event-detail-root.is-loading::before
```

Expected: the spinner can be turned off by removing `is-loading`, instead of staying attached forever.

- [ ] **Step 2: Add the loading class to the existing root only**

Change:

```html
<main id="event-detail-root">
```

to:

```html
<main id="event-detail-root" class="is-loading">
```

Expected: no new wrapper, no id added to `.event-detail-shell`, and no mobile markup structure change.

- [ ] **Step 3: Reveal the root only after rendering succeeds**

Replace the inline script's early reveal:

```js
document.getElementById("event-detail-root").style.visibility="visible";
```

with:

```js
var r=document.getElementById("event-detail-root");
```

After `renderEventDetail();`, replace the existing listener-only block:

```js
var r=document.getElementById("event-detail-root");
r&&r.addEventListener("click",handleRootClick)
```

with:

```js
if(r){
  r.style.visibility="visible";
  r.classList.remove("is-loading");
  r.addEventListener("click",handleRootClick)
}
```

Expected: the spinner remains while the render function runs, then disappears when DOM/data rendering is complete.

### Task 3: Verify Desktop and Mobile

**Files:**
- Read/verify only: `frontend/pages/event-detail.html`
- Read/verify only: `frontend/js/event-detail.js`

- [ ] **Step 1: Verify git diff is limited**

Run:

```bash
git diff -- frontend/pages/event-detail.html frontend/js/event-detail.js
```

Expected: only the renderer fallback and spinner lifecycle changed.

- [ ] **Step 2: Verify mobile render state**

Open:

```text
http://localhost:8000/event-detail.html?event=student-community-day
```

At a mobile viewport around `430x932`, verify:

```js
document.getElementById("event-detail-root").className === ""
document.body.getAttribute("data-event-slug") === "student-community-day"
getComputedStyle(document.querySelector(".event-detail-hero-mobile")).display === "block"
getComputedStyle(document.querySelector(".event-detail-hero")).display === "none"
document.querySelector(".event-detail-mobile-waves").children.length === 7
```

Expected: mobile layout renders, wave layer exists, and spinner is no longer active.

- [ ] **Step 3: Verify desktop render state**

At a desktop viewport, verify:

```js
document.getElementById("event-detail-root").className === ""
document.body.getAttribute("data-event-slug") === "student-community-day"
getComputedStyle(document.querySelector(".event-detail-hero")).display !== "none"
```

Expected: desktop event detail renders and the spinner is no longer active after render.

