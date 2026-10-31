# Accessibility — Syncfusion TypeScript Range Slider

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Overview

The Range Slider follows established accessibility guidelines and standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | Full |
| Section 508 | Full |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation Support | Full |
| Accessibility Checker Validation | Full |
| Axe-core Accessibility Validation | Full |

The control is validated using both [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) and [axe-core](https://www.npmjs.com/package/axe-core) during automated testing.

---

## WAI-ARIA Attributes

The Range Slider follows [WAI-ARIA slider patterns](https://www.w3.org/WAI/ARIA/apg/patterns/slider/):

| Attribute | Purpose |
|---|---|
| `role=slider` | Conveys the slider role to assistive technologies |
| `aria-valuemin` | Indicates the minimum value of the slider |
| `aria-valuemax` | Indicates the maximum value of the slider |
| `aria-valuenow` | Indicates the current value of the slider |
| `aria-valuetext` | Returns the current text of the slider (used with format) |
| `aria-orientation` | Indicates horizontal or vertical orientation |
| `aria-label` | Provides accessible name; used as label text for increase/decrease buttons |

These attributes are automatically set and updated by the component. When you apply `tooltip.format` or custom formatting via `tooltipChange`, the `aria-valuetext` is also updated to reflect the formatted value, ensuring screen readers announce the correct display text.

---

## Keyboard Navigation

The Range Slider follows [keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/alert/#keyboardinteraction):

| Key | Action |
|---|---|
| `Right Arrow` / `Up Arrow` | Increase the slider value by one step |
| `Left Arrow` / `Down Arrow` | Decrease the slider value by one step |
| `Home` | Move to the minimum value (for Range Slider: when second thumb focused, moves to first thumb value) |
| `End` | Move to the maximum value (for Range Slider: when first thumb focused, moves to second thumb value) |
| `Page Up` | Increase the value by `largeStep` |
| `Page Down` | Decrease the value by `largeStep` |

> For Range Sliders with two handles, use `Tab` to move focus between handles. Each handle responds independently to keyboard input.

---

## Ensuring Accessibility

To enable RTL layout for locales that read right-to-left:

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    value: 30,
    enableRtl: true
});
slider.appendTo('#slider');
```

To verify accessibility in your application:
1. Use the [Syncfusion accessibility sample](https://ej2.syncfusion.com/accessibility/slider.html) as a reference
2. Run [axe-core](https://www.npmjs.com/package/axe-core) or [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) on your page
3. Test with a screen reader (NVDA, JAWS, VoiceOver) to validate aria attributes and keyboard flow
