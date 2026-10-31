# Accessibility – Syncfusion TypeScript TextBox

## Overview

The TextBox component meets the following accessibility standards:

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

The TextBox uses the `textbox` WAI-ARIA role and the following ARIA properties:

| Property | Description |
|---|---|
| `aria-placeholder` | Short hint shown when the TextBox has no value, helping users understand the expected input |
| `aria-labelledby` | Points to the floating label element, enabling screen readers to announce the label |

---

## RTL Support

Enable right-to-left layout by setting `enableRtl: true`:

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let rtlTextBox: TextBox = new TextBox({
  placeholder: 'Enter text',
  floatLabelType: 'Auto',
  enableRtl: true
});
rtlTextBox.appendTo('#rtl');
```

---

## Keyboard Navigation

The TextBox component inherits standard browser keyboard behavior for text inputs:

| Key | Action |
|---|---|
| `Tab` | Moves focus into/out of the TextBox |
| `Shift + Tab` | Moves focus backward |
| Arrow keys | Moves cursor within text |
| `Home` / `End` | Moves cursor to start/end of text |
| `Ctrl + A` | Selects all text |
| `Ctrl + C` / `Ctrl + V` | Copy/paste |

---

## Ensuring Accessibility

The TextBox component is validated using:

- **accessibility-checker** — automated audit tool for DOM-level accessibility
- **axe-core** — industry-standard accessibility testing library

Both tools confirm full compliance with WCAG 2.2 and Section 508 standards.
