# Accessibility — Syncfusion Angular Button

## Table of Contents
- [Overview](#overview)
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [Ensuring Accessibility in Your App](#ensuring-accessibility-in-your-app)

---

## Overview

The Syncfusion Angular Button component is built to meet accessibility guidelines including:

- **ADA** (Americans with Disabilities Act)
- **Section 508**
- **WCAG 2.2** (Web Content Accessibility Guidelines)
- **WAI-ARIA** roles and patterns

---

## Compliance Summary

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | Full |
| Section 508 | Full |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |
| Axe-core Validation | Full |

---

## WAI-ARIA Attributes

The Button component follows the [WAI-ARIA button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides an accessible name for icon-only buttons where no visible text label exists |

**Icon-only button example:**

When using a round or icon-only button with no text content, add `aria-label` to describe the action:

```html
<!-- Without aria-label: screen readers announce nothing meaningful -->
<button ejs-button cssClass="e-round" iconCss="e-icons e-plus" [isPrimary]="true"></button>

<!-- With aria-label: accessible to screen reader users -->
<button ejs-button cssClass="e-round" iconCss="e-icons e-plus"
  [isPrimary]="true" aria-label="Add item"></button>
```

> **Important:** Predefined color styles (`e-primary`, `e-danger`, etc.) convey meaning visually only. Do not rely on color alone — always pair with descriptive button text or `aria-label`.

---

## Keyboard Interaction

The Button component follows the [WAI-ARIA keyboard interaction guideline for buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/#keyboardinteraction):

| Key | Action |
|---|---|
| `Space` | When the button has focus, pressing Space activates the button (triggers click) |
| `Enter` | Natively activates the button (standard HTML behavior) |
| `Tab` | Moves focus to the next interactive element |
| `Shift + Tab` | Moves focus to the previous interactive element |

> Disabled buttons (when `[disabled]="true"`) are removed from the tab order and cannot be focused.

---

## Screen Reader Support

- Button text content is automatically announced by screen readers.
- For icon-only buttons, use `aria-label` to describe the button action.
- For toggle buttons, consider adding `aria-pressed` to communicate the active/inactive state to assistive technologies:

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button #togglebtn ejs-button cssClass="e-flat" [isToggle]="true"
      [attr.aria-pressed]="isActive"
      (click)="onToggle()">
      {{ isActive ? 'Pause' : 'Play' }}
    </button>
  `
})
export class AppComponent {
  isActive = false;

  onToggle() {
    this.isActive = !this.isActive;
  }
}
```

---

## Ensuring Accessibility in Your App

Syncfusion validates Button accessibility using:

- **[accessibility-checker](https://www.npmjs.com/package/accessibility-checker)** — automated WCAG checks
- **[axe-core](https://www.npmjs.com/package/axe-core)** — automated accessibility rule engine

**Best practices for your implementation:**

1. **Always provide visible text** or `aria-label` for every button.
2. **Don't use color alone** to communicate button purpose — pair `e-danger` or `e-success` with descriptive text.
3. **Test with keyboard navigation** — tab to the button and use Space/Enter to activate it.
4. **Test with a screen reader** (NVDA, VoiceOver, or JAWS) to verify announced labels and states.
5. **Ensure sufficient color contrast** — the default Syncfusion themes meet WCAG AA contrast ratios.
