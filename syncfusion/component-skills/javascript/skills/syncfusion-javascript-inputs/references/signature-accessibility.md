# Accessibility – Syncfusion TypeScript Signature

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [Mobile and Touch Device Support](#mobile-and-touch-device-support)
- [Color Contrast](#color-contrast)
- [Ensuring Accessibility in Your Implementation](#ensuring-accessibility-in-your-implementation)

---

## Compliance Summary

The Signature component meets the following accessibility standards:

| Criteria | Status |
|---|---|
| WCAG 2.2 | Supported |
| Section 508 | Supported |
| Screen Reader Support | Supported |
| Right-To-Left Support | Not Applicable |
| Color Contrast | Supported |
| Mobile Device Support | Supported |
| Keyboard Navigation | Supported |
| Accessibility Checker Validation | Supported |
| Axe-core Validation | Supported |

---

## Keyboard Interaction

The Signature component supports the following keyboard shortcuts without any additional configuration:

| Keyboard Shortcut | Action |
|---|---|
| `Ctrl + Z` | Undo the last stroke or action |
| `Ctrl + Y` | Redo the last undone action |
| `Ctrl + S` | Save the signature (triggers `beforeSave` event) |
| `Delete` | Clear all signature strokes from the canvas |

These shortcuts work when the Signature canvas has focus. The `Ctrl + S` shortcut raises the `beforeSave` event, allowing you to customize the file name and type before saving.

---

## Screen Reader Support

The Signature component is designed to work with screen readers. The canvas element receives appropriate ARIA roles and attributes during initialization to communicate its interactive purpose to assistive technologies.

---

## Mobile and Touch Device Support

The Signature component supports drawing with:
- **Mouse** (desktop)
- **Touch** (smartphones and tablets)
- **Stylus/Pen** (touchscreen tablets and digitizers)

The stroke width calculation (via `velocity`, `minStrokeWidth`, `maxStrokeWidth`) adapts naturally to different input speeds, providing a consistent experience across devices.

---

## Color Contrast

To meet WCAG 2.2 color contrast requirements:
- Use a dark `strokeColor` (e.g., `#000000`) against a light `backgroundColor` (e.g., `#ffffff`)
- Avoid low-contrast combinations such as light grey strokes on white background

```ts
import { Signature } from '@syncfusion/ej2-inputs';

let signature: Signature = new Signature({
  strokeColor: '#000000',      // Black strokes – maximum contrast
  backgroundColor: '#ffffff'   // White background
});
signature.appendTo('#signature');
```

---

## Ensuring Accessibility in Your Implementation

When integrating the Signature component into a form or application:

1. **Label the canvas** – Provide a visible label or `aria-label` for the canvas element:
   ```html
   <label for="signature">Please sign below:</label>
   <canvas id="signature" aria-label="Signature pad"></canvas>
   ```

2. **Communicate state changes** – If using `disabled` or `isReadOnly`, update adjacent UI to notify users:
   ```ts
   signature.disabled   = true;
   document.getElementById('signature-status')!.textContent = 'Signature disabled';
   ```

3. **Validate with tools** – Run your page through [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) or [axe-core](https://www.npmjs.com/package/axe-core) to confirm no new violations are introduced by your custom implementation.

4. **Keyboard flow** – Ensure users can tab to the Signature canvas and use keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S, Delete) as alternatives to mouse/touch interactions.
