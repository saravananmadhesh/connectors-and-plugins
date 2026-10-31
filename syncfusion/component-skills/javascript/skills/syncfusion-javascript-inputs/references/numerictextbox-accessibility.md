# Accessibility – Syncfusion TypeScript NumericTextBox

## Compliance Summary

The NumericTextBox meets the following accessibility standards:

| Standard | Support |
|---|---|
| WCAG 2.2 | Full |
| Section 508 | Full |
| Screen Reader | Full |
| Right-To-Left | Full |
| Color Contrast | Full |
| Mobile Device | Full |
| Keyboard Navigation | Full |
| Accessibility Checker | Full |
| Axe-core Validation | Full |

---

## WAI-ARIA Attributes

The NumericTextBox uses the `spinbutton` ARIA role and sets the following ARIA attributes based on component state:

| Attribute | Purpose |
|---|---|
| `aria-live` | Indicates priority of live region updates |
| `aria-valuemin` | Reflects the `min` property value |
| `aria-valuemax` | Reflects the `max` property value |
| `aria-valuenow` | Reflects the current `value` |
| `aria-disabled` | Set when `enabled: false` |
| `aria-readonly` | Set when `readonly: true` |
| `aria-invalid` | Set when value is out of range (in non-strict mode) |
| `aria-label` | Provides accessible name for screen readers |

These attributes are managed automatically by the component – no manual ARIA configuration is required.

---

## Keyboard Interaction

The NumericTextBox follows [WAI-ARIA spinbutton keyboard practices](https://www.w3.org/TR/wai-aria/#spinbutton):

| Key | Action |
|---|---|
| `Arrow Up` | Increments the value by `step` |
| `Arrow Down` | Decrements the value by `step` |

Keyboard interaction works even when spin buttons are hidden (`showSpinButton: false`).

---

## Basic Accessible Setup

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10,
  min: 0,
  max: 100,
  step: 1,
  placeholder: 'Quantity',
  floatLabelType: 'Auto'
  // ARIA attributes (aria-valuemin, aria-valuemax, aria-valuenow) are set automatically
});

numeric.appendTo('#numeric');
```

---

## Ensuring Accessibility

The NumericTextBox's accessibility is validated using:
- **accessibility-checker** (automated accessibility audit tool)
- **axe-core** (open-source accessibility testing library)

To test your implementation, use any of these tools:
- [axe DevTools browser extension](https://www.deque.com/axe/devtools/)
- [NVDA](https://www.nvaccess.org/) or [JAWS](https://www.freedomscientific.com/products/software/jaws/) screen readers
- Browser built-in accessibility inspector (Chrome DevTools → Accessibility panel)
