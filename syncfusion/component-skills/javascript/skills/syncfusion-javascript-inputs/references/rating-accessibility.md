# Accessibility – Syncfusion TypeScript Rating

## Overview

The Rating component meets the following accessibility standards:

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | ✅ Full |
| Section 508 Support | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left (RTL) Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation Support | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Accessibility Validation | ✅ Full |

---

## WAI-ARIA Attributes

The Rating component follows the [WAI-ARIA Slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) and uses the following ARIA attributes:

| Attribute | Purpose |
|---|---|
| `role="slider"` | Identifies the component as a range input where the user selects a value within a specified range |
| `role="button"` | Applied to the reset button — identifies it as a clickable element that resets the rating to its minimum value |
| `aria-label` | Provides an accessible name for the Rating component |
| `aria-valuemin` | Defines the minimum selectable value (maps to `min` property) |
| `aria-valuemax` | Defines the maximum selectable value (maps to `itemsCount` property) |
| `aria-valuenow` | Reflects the currently selected rating value (maps to `value` property) |
| `aria-hidden` | Specifies whether the reset button is interactive (set to `true` when hidden) |

---

## Keyboard Navigation

The Rating component follows the [WAI-ARIA keyboard interaction guideline for sliders](https://www.w3.org/WAI/ARIA/apg/patterns/slider/#keyboardinteraction):

| Key | Action |
|---|---|
| `Arrow Up` | Increases the rating value |
| `Arrow Right` | Increases the rating value (in RTL mode: decreases) |
| `Arrow Down` | Decreases the rating value |
| `Arrow Left` | Decreases the rating value (in RTL mode: increases) |
| `Space` | When the Reset Button is focused, resets the rating to the `min` value |

---

## RTL Support

Enable right-to-left layout for RTL languages:

```ts
import { Rating } from '@syncfusion/ej2-inputs';

let rating: Rating = new Rating({
  value: 3,
  enableRtl: true
});
rating.appendTo('#rating');
```

In RTL mode, `Arrow Left` increases the value and `Arrow Right` decreases it.

---

## Ensuring Accessibility

The Rating component is validated using:

- **accessibility-checker** — automated DOM-level accessibility audit
- **axe-core** — industry-standard accessibility testing library

Both tools confirm full compliance with WCAG 2.2 and Section 508 standards.
