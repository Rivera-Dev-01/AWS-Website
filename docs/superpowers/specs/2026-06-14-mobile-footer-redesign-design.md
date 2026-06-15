# Mobile Footer Redesign Spec

## Overview
Redesigning the footer of the AWS website specifically for mobile viewport sizes. The update focuses on increasing the prominence of the AWS logo and standardizing the styling of social media icons, while adding TikTok and Instagram to the roster.

## Changes

### 1. Logo Enlargement (Mobile View)
- The main AWS logo in the footer (`.footer-brand-logo`) will be enlarged.
- Current dimensions on mobile: `100px` by `100px`.
- Target dimensions on mobile: `140px` by `140px`.
- Layout: Will remain horizontally centered above the "AWS Learning Club" text.

### 2. Social Media Icons
- **New Additions:** TikTok and Instagram logos will be integrated alongside the existing Facebook and LinkedIn icons.
- **Glassmorphic Styling:** All 4 social media links will adopt a modern glassmorphic look:
  - Each icon will sit inside a container with a dark translucent background (`rgba(61, 59, 59, 0.17)`) and a glass blur (`backdrop-filter: blur(13.17px)`).
  - The containers will have a subtle border (`1.02px solid rgba(255, 255, 255, 0.15)`) and rounded corners (`border-radius: 18px`).
- **Warm Sunset Gradient:** Behind the logo itself, a vibrant gradient circle will be applied to give each icon a consistent pop of color:
  - Gradient: `linear-gradient(180deg, rgba(255, 183, 0, 0.95) 0%, rgba(242, 175, 0, 0.95) 30.29%, rgba(255, 111, 8, 0.95) 78.37%)`
  - Fully rounded (`border-radius: 50%`) underneath the icon graphic.
- **Layout:** The icons will be evenly spaced in a flex container centered in the mobile layout.

## Assets
- The TikTok and Instagram logos will be moved from the user's Downloads folder to `frontend/assets/shared/components/` and appropriately named.

## Error Handling & Fallbacks
- `backdrop-filter` is not supported on all browsers. As a fallback, the `rgba` background will provide a darker overlay that ensures contrast even without the blur effect.
