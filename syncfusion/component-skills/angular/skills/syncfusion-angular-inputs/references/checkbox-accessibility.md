# Accessibility and RTL — Syncfusion Angular CheckBox

## Table of Contents
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Screen Reader Support](#screen-reader-support)

---

## Accessibility Compliance

The Syncfusion Angular CheckBox meets the following standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | Full |
| Section 508 | Full |
| Screen Reader | Full |
| Right-To-Left | Full |
| Color Contrast | Full |
| Mobile Device | Full |
| Keyboard Navigation | Full |
| Accessibility Checker validation | Full |
| axe-core validation | Full |

---

## WAI-ARIA Attributes

The CheckBox follows the [WAI-ARIA checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). The following ARIA attribute is applied automatically:

| Attribute | Purpose |
|-----------|---------|
| `aria-disabled` | Indicates the checkbox is perceivable but non-interactive when `disabled="true"` |

No manual ARIA attributes are needed — the component handles these automatically.

---

## Keyboard Interaction

| Key | Action |
|-----|--------|
| `Space` | Toggles the CheckBox state (checked ↔ unchecked) when focused |

The CheckBox naturally participates in tab order. Focus is visually indicated by the default theme styles.

---

## Right-to-Left (RTL) Support

Enable RTL rendering with the `enableRtl` property. In RTL mode, the checkbox and its label are mirrored for locales such as Arabic and Hebrew:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-checkbox label="Default" [enableRtl]="true"></ejs-checkbox>
    </div>`
})
export class AppComponent { }
```

**What changes in RTL mode:**
- The checkbox frame appears on the **right** side of the label
- Layout direction mirrors horizontally
- Works in combination with `labelPosition`

> **Tip:** For application-wide RTL, use the global `enableRtl` configuration from `@syncfusion/ej2-base` rather than setting it per component.

---

## Screen Reader Support

The CheckBox renders a native `<input type="checkbox">` element underneath, which screen readers (NVDA, JAWS, VoiceOver) natively interpret as a checkbox. The `label` property maps to the input's accessible name, so no additional `aria-label` is needed when `label` is set.

**Accessibility best practices:**
- Always provide a meaningful `label` — avoid empty checkboxes
- Use `disabled` rather than hiding checkboxes for read-only form states (screen readers still announce disabled checkboxes)
- When using `indeterminate`, provide context in the label so users understand the partial selection state (e.g., "Select All (partially selected)")
