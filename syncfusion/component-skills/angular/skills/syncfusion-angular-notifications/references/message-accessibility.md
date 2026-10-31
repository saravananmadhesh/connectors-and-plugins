# Accessibility – Syncfusion Angular Message

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [RTL Support](#rtl-support)
- [Screen Reader Support](#screen-reader-support)
- [Testing Accessibility](#testing-accessibility)

---

## Compliance Overview

The Syncfusion Angular Message component meets all major accessibility standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker validation | ✅ Full |
| axe-core validation | ✅ Full |

---

## WAI-ARIA Attributes

The Message component follows the [WAI-ARIA alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/):

| Attribute | Purpose |
|-----------|---------|
| `role="alert"` | Conveys significant contextual messages to assistive technology users. Causes screen readers to announce the message immediately. |
| `aria-label` | Provides an accessible name for the close icon button when `showCloseIcon` is `true`. |

These attributes are applied automatically — no manual configuration is required.

---

## Keyboard Interaction

When `showCloseIcon` is `true`, the close icon is keyboard-accessible:

| Key | Action |
|-----|--------|
| `Tab` / `Shift + Tab` | Move focus to/from the close icon |
| `Enter` | Close the focused message |
| `Space` | Close the focused message |

There is no keyboard interaction for messages without a close icon, since they are purely informational.

---

## RTL Support

Enable right-to-left layout for languages such as Arabic or Hebrew using the `enableRtl` property:

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-message content="يرجى قراءة التعليقات بعناية" severity="Info" [enableRtl]="true"></ejs-message>
  `
})
export class AppComponent { }
```

When `enableRtl` is `true`, the icon appears on the right and text flows right-to-left.

---

## Screen Reader Support

Because the component uses `role="alert"`, screen readers (NVDA, JAWS, VoiceOver, etc.) will:
- Automatically announce the message content when the Message component is rendered or becomes visible.
- Announce the close action when the close icon is activated.

No additional markup or ARIA attributes are needed for basic screen reader functionality.

---

## Testing Accessibility

Syncfusion validates the Message component's accessibility using:
- **accessibility-checker** npm package
- **axe-core** npm package

To test in your app, use either tool in your test suite or run them against your rendered pages. Both tools will confirm compliance with the WCAG 2.2 and Section 508 standards.
