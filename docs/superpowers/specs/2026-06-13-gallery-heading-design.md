# Gallery Heading Component Design

## 1. Overview
Redesign the Gallery heading area on the event details page to match the new Figma layout, replacing the existing simple `<h2>More Events</h2>` (or gallery title) with a highly stylized, two-column flexbox layout featuring vertical gradient decorative bars.

## 2. Architecture & Components

### 2.1 HTML Structure
The `.event-detail-gallery-section` will be updated to include a new `.event-detail-gallery-header` container.
- **Flex Container:** `.event-detail-gallery-header` set to `display: flex; justify-content: space-between;`.
- **Left Column:** `.gallery-header-left`
  - Contains "Memorable Highlights from" (`<span>`)
  - Contains "The Previous" (`<span>`)
  - Contains the dynamic event title (`<h3 data-gallery-event-title>`)
- **Right Column:** `.gallery-header-right`
  - Contains the paragraph describing the gallery.

### 2.2 CSS Styling
- **Typography:** The text styles provided from the Figma CSS will be mapped to the respective elements, utilizing `-webkit-background-clip: text` for gradients.
- **Decorative Bars:** The left and right vertical colored bars (Rectangles 207 & 208) will be implemented as `::before` pseudo-elements on `.gallery-header-left` and `.gallery-header-right`. This ensures they scale automatically with the content height.

### 2.3 JavaScript Integration
- In `event-detail.js`, the `renderEventDetail` or `renderGallery` function will be updated to inject the current `event.title` into the `[data-gallery-event-title]` element.

## 3. Scope & Boundaries
This implementation is localized strictly to the Gallery section header on the event details page. It does not alter the underlying gallery grid logic or any other page sections.

## 4. Edge Cases
- **Long Event Titles:** By using Flexbox and pseudo-elements, if a long event title wraps to a second line, the vertical left bar will automatically stretch to match the new height.
