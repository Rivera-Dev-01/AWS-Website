# About Us Mobile — Hero Content & Vision/Mission Refinements

**Date:** 2026-06-01  
**Figma Ref:** `jsBVat13FyjCaUryNd7vGM` node `209-709`  
**Files to edit:** `frontend/css/styles.css` (mobile media query block, lines 1543–2124)

---

## 1. Hero Gradient Card — Visible Text Content

**Problem:** The hero gradient card has HTML elements for "Build the future with", "AWS CLOUD TECHNOLOGY", description text, and "Learn More" button, but they lack visible styling or are clipped.

**Fix — CSS only (inside `@media max-width: 768px`):**

| Element | Selector | Style |
|---|---|---|
| Subtitle | `.hero-mobile-content h3` | 18px Poppins SemiBold, color `#1C3466`, margin `0 0 8px 0` |
| Title | `.hero-mobile-content .hero-title-gradient` | 42px Montserrat 900, `linear-gradient(180deg, #FF8C00, #FF6600)` background-clip text, no stroke, line-height 1.05 |
| Description | `.hero-mobile-content p` | 14px Poppins 400, color `#333`, line-height 1.6, max-width 280px, centered |
| Button | `.hero-mobile-content .btn-learn-more` | 85% width, 12px vertical padding, 2px solid `#F2AF00` border, rounded 12px, transparent bg, `#F2AF00` text |

These styles already exist in the current CSS but may be overridden by parent styles (inherited desktop `.hero-top-text h1` stroke/fill properties). The fix is to add explicit `!important` overrides on `-webkit-text-stroke: 0 !important` and `-webkit-text-fill-color: transparent !important` on the gradient title.

---

## 2. Purpose-driven.png — Full-Width Flush Bottom Banner

**Problem:** Image should span the entire width of the gradient card, edge-to-edge, flush at the bottom.

**Figma specs:** 430×122px frame at y=872, gradient `linear-gradient(-2deg, #FBB515, #FDDD01)`.

**Fix — CSS only:**

| Property | Value |
|---|---|
| `display` | `block` |
| `width` | `calc(100% + 48px)` (bleeds past 24px padding on each side) |
| `margin` | `24px -24px 0 -24px` (negative margins to go edge-to-edge) |
| `height` | `auto` |
| `border-bottom-left-radius` | `24px` (matches card) |
| `border-bottom-right-radius` | `24px` (matches card) |
| `object-fit` | `cover` |

No HTML changes needed — the `<img class="mobile-pda-img">` element is already in place.

---

## 3. Vision/Mission Cards — Tighter Icon+Label, Bigger Cards, Lower Mission

**Problem:** Icon and label text have too much gap. Cards are slightly small. Mission needs more vertical offset.

### 3a. Icon + Label Tighter Layout

**Current:** `gap: 10px` between icon and label.  
**New:** `gap: 6px` between icon and label.

**Figma spec:** Icon is 38×38px. Label is 28px Poppins ExtraBold 800. Text-shadow `0px 4px 5px rgba(0,0,0,0.25)`.

```css
.vision-card-header,
.mission-card-header {
    gap: 6px !important;  /* was 10px */
}

.vision-card-header h1,
.mission-card-header h1 {
    font-size: 28px !important;  /* was 26px */
    text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25) !important;
}
```

### 3b. Bigger Cards

**Current:** `width: 55%`, `min-height: 180px`.  
**New:** `width: 58%`, `min-height: 220px`.

### 3c. Lower Mission Offset

**Current offsets:**
- Mission inactive: `translateY(55px)`
- Vision inactive: `translateY(55px)`

**New offsets:**
- Mission inactive (bottom-right): `translateX(75px) translateY(75px) scale(0.9)`
- Vision inactive (bottom-left): `translateX(-15px) translateY(75px) scale(0.9)`

This creates more vertical breathing room between the active card and the inactive card behind it.

---

## 4. Scope & Constraints

- **CSS only** — no HTML or JS changes
- **All changes inside `@media (max-width: 768px)`** — desktop untouched
- **File:** `frontend/css/styles.css`, specifically the mobile responsive block starting at line 1543
