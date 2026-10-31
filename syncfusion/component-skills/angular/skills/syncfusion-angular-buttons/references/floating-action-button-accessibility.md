# Accessibility – Syncfusion Angular Floating Action Button

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [RTL Support](#rtl-support)
- [Screen Reader Support](#screen-reader-support)
- [Icon-Only FAB Accessibility](#icon-only-fab-accessibility)

---

## Compliance Overview

The Syncfusion Angular FAB meets the following accessibility standards:

| Accessibility Criteria | Supported |
|------------------------|-----------|
| WCAG 2.2 | ✅ Yes |
| Section 508 | ✅ Yes |
| Screen Reader Support | ✅ Yes |
| Right-To-Left (RTL) Support | ✅ Yes |
| Color Contrast | ✅ Yes |
| Mobile Device Support | ✅ Yes |
| Keyboard Navigation Support | ✅ Yes |
| Accessibility Checker Validation | ✅ Yes |
| Axe-core Accessibility Validation | ✅ Yes |

---

## WAI-ARIA Attributes

The FAB follows the [WAI-ARIA button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

| Attribute | Purpose |
|-----------|---------|
| `aria-label` | Provides an accessible name for icon-only FABs where no visible text is present |

Set `aria-label` directly in the template when using an icon-only FAB:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit"
      aria-label="Edit record" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

---

## Keyboard Interaction

The FAB follows the [WAI-ARIA keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/button/#keyboardinteraction):

| Key | Action |
|-----|--------|
| `Space` | Activates the FAB when it has focus — equivalent to a click |

The FAB inherits standard browser focus behavior; use `Tab` to move focus to the FAB and `Space` to activate it.

---

## RTL Support

Enable right-to-left rendering by setting `enableRtl="true"`. This mirrors icon placement and layout for RTL languages such as Arabic and Hebrew:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <button ejs-fab id="fab" iconCss="e-icons e-edit" content="Edit"
      [enableRtl]="true" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

---

## Screen Reader Support

- Use `content` to give screen readers a meaningful label when the FAB has visible text.
- For **icon-only** FABs, set `aria-label` on the `<button>` element to describe the action.
- Predefined styles (e.g., `e-danger`, `e-success`) are purely visual; always include descriptive `content` or `aria-label` text for users relying on assistive technologies.

---

## Icon-Only FAB Accessibility

When no `content` is provided, ensure the FAB is still accessible:

```typescript
import { FabModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [FabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative;min-height:350px;border:1px solid;"></div>
    <!-- Icon-only FAB with accessible label -->
    <button ejs-fab id="fab" iconCss="e-icons e-edit"
      aria-label="Edit" title="Edit" target="#targetElement"></button>
  `
})
export class AppComponent { }
```

Both `aria-label` and `title` are recommended for icon-only FABs: `aria-label` for screen readers, `title` for sighted users as a tooltip.
