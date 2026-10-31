# Accessibility — Syncfusion Angular DropDownButton

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [RTL Support](#rtl-support)
- [Screen Reader Support](#screen-reader-support)
- [Ensuring Accessibility in Your App](#ensuring-accessibility-in-your-app)

---

## Compliance Summary

The Syncfusion Angular DropDownButton is built to meet the following accessibility standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | Full |
| Section 508 | Full |
| Screen Reader | Full |
| Right-To-Left (RTL) | Full |
| Color Contrast | Full |
| Mobile Device | Full |
| Keyboard Navigation | Full |
| Accessibility Checker Validation | Full |
| Axe-core Validation | Full |

---

## WAI-ARIA Attributes

The DropDownButton component automatically applies the following ARIA attributes to ensure assistive technologies can interpret the component correctly:

| Attribute | Purpose |
|---|---|
| `role="button"` | Identifies the button element as an interactive button |
| `role="menu"` | Applied to the dropdown popup, marking it as a menu |
| `role="menuitem"` | Applied to each popup action item |
| `aria-haspopup` | Informs assistive tech that clicking the button reveals a popup |
| `aria-expanded` | Indicates whether the popup is currently open (`true`) or closed (`false`) |
| `aria-owns` | Associates the popup element with the button for DOM hierarchy clarity |
| `aria-disabled` | Marks the component as perceivable but not operable when `disabled` is `true` |

These attributes are managed automatically — no manual ARIA configuration is required.

---

## Keyboard Navigation

The DropDownButton supports the following keyboard interactions out of the box:

| Key | Action |
|---|---|
| `Enter` | Opens the popup (if closed), or activates the focused item and closes the popup |
| `Space` | Opens the popup |
| `Esc` | Closes the popup |
| `↑` (Up Arrow) | Moves focus to the previous popup item |
| `Alt + ↑` | Closes the popup |
| `Alt + ↓` | Opens the popup |

No additional configuration is needed to enable keyboard navigation.

---

## RTL Support

Enable right-to-left layout with the `enableRtl` property. This is essential for Arabic, Hebrew, and other RTL languages:

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  template: `
    <button ejs-dropdownbutton [items]="items" content="Message"
      iconCss="ddb-icons e-message"
      enableRtl="true">
    </button>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Edit' },
    { text: 'Delete' },
    { text: 'Mark as Read' },
    { text: 'Like Message' }
  ];
}
```

When RTL is active:
- The button icon moves to the right side
- The popup aligns to the right edge of the button
- Text within popup items flows right to left

---

## Screen Reader Support

The DropDownButton works with screen readers (NVDA, JAWS, VoiceOver) because:
- `aria-haspopup` tells the screen reader that activation opens a menu
- `aria-expanded` announces the open/closed state on each interaction
- `role="menuitem"` on each item allows the screen reader to enumerate options

No extra configuration is needed for screen reader compatibility.

---

## Ensuring Accessibility in Your App

To maintain accessibility compliance in your implementation:

1. **Always provide meaningful `content`** — the button label is read by screen readers. Avoid using only icons without a visible or `aria-label` fallback.

2. **Icon-only buttons** — when using icon-only mode (`e-caret-hide` + no `content`), add an `aria-label` attribute to the `<button>` element:

```html
<button ejs-dropdownbutton [items]="items" iconCss="e-icons e-menu"
  cssClass="e-caret-hide"
  aria-label="More options">
</button>
```

3. **Color contrast** — the default Syncfusion themes meet WCAG AA contrast ratios. When customizing colors via `cssClass`, verify contrast ratios using browser DevTools or a contrast checker.

4. **Focus indicators** — Syncfusion themes include visible focus outlines. Avoid CSS that removes `:focus` or `:focus-visible` styles without a replacement.

5. **Disabled state** — use the `disabled` property (not just CSS) to disable the button, so `aria-disabled` is set correctly for assistive technologies.
