# About Us Mobile — Hero Content & Vision/Mission Refinements

**Date:** 2026-06-01  
**Figma Ref:** `jsBVat13FyjCaUryNd7vGM` node `209-709`  
**Files edited:** `frontend/css/styles.css`, `frontend/pages/about.html`

---

## 1. Hero Gradient Card — One Seamless Card

The entire hero content area is one continuous gradient card (white → yellow → orange) with **sharp bottom corners** (0px radius). No separate Purpose-driven.png image.

### Gradient
`linear-gradient(180deg, #FFFFFF 0%, #FFF8E1 25%, #FFDF6B 55%, #FBB515 80%, #FE9206 100%)`

### Content Stack (top to bottom)
1. **"Build the future with"** — 18px Poppins SemiBold, navy `#1C3466`
2. **"AWS CLOUD TECHNOLOGY"** — 42px Montserrat 900, gradient text `#FF6F09 → #FFB700`
3. **Description** — 14px Poppins 500, `#333`, max-width 340px (two lines)
4. **"Learn More" button** — filled orange gradient bg (`#FFB700 → #FF6F09`), **white text**, 85% width
5. **"PURPOSE-DRIVEN ACTION"** — 28px Poppins 800, navy gradient text (`#4363A6 → #1C3466`), letter-spacing 1px, 32px top padding / 40px bottom padding

### Bottom Corners
`border-bottom-left-radius: 0 !important; border-bottom-right-radius: 0 !important;`

---

## 2. Vision/Mission Cards

### Icon + Label
- Gap reduced from 10px → **6px** (icon right beside text)
- Font size increased from 26px → **28px** (matching Figma `style_NFYAQS`)
- Added `text-shadow: 0px 4px 5px rgba(0,0,0,0.25)` per Figma

### Card Size
- Width: 55% → **58%**
- Min-height: 180px → **220px**

### Mission Lower Offset
- Inactive translateY: 55px → **75px** (more vertical separation)

---

## 3. HTML Change

Replaced `<img src="Purpose-driven.png">` with `<div class="mobile-pda-text">PURPOSE-DRIVEN ACTION</div>` in about.html line 62.

---

## 4. Constraints
- All mobile styles inside `@media (max-width: 768px)` — desktop untouched
- CSS-only changes except the single HTML element swap
