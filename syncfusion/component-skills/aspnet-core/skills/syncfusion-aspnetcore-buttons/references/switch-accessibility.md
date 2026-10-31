# Switch Accessibility

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL and Color Contrast](#rtl-and-color-contrast)

---

## Compliance Overview

The Syncfusion ASP.NET Core Switch component meets industry accessibility standards:

| Accessibility Criteria | Compliance |
|---|---|
| WCAG 2.2 | AA |
| Section 508 | Full support |
| Screen Reader | Full support |
| Right-To-Left (RTL) | Full support |
| Color Contrast | Full support |
| Mobile Device | Full support |
| Keyboard Navigation | Full support |
| Accessibility Checker Validation | Full support |

The Switch follows the [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).

---

## WAI-ARIA Attributes

The Switch component uses the following ARIA attributes to communicate state to assistive technologies:

| Attribute | Purpose |
|---|---|
| `role` | Identifies the element as a switch control |
| `aria-disabled` | Indicates the switch is perceivable but not operable (when `disabled="true"`) |

These attributes are automatically rendered by the component — no manual configuration is needed.

---

## Keyboard Interaction

| Key | Action |
|---|---|
| `Space` | When the Switch has focus, pressing Space toggles the switch state (ON ↔ OFF) |

The Switch follows the [WAI-ARIA keyboard interaction guideline](https://www.w3.org/WAI/ARIA/apg/patterns/switch/#keyboardinteraction).

---

## Screen Reader Support

The Switch is fully compatible with screen readers. The `role="switch"` and `aria-checked` attributes communicate the current state (ON/OFF) to screen reader users. When the switch is disabled, `aria-disabled="true"` is announced.

---

## RTL and Color Contrast

- **RTL:** Enable with `enableRtl="true"`. The switch layout flips for right-to-left languages.
- **Color Contrast:** The default themes meet WCAG 2.2 AA color contrast ratios. When using custom colors via `cssClass`, verify contrast ratios manually.

**Example – Accessible RTL Switch:**
```cshtml
<ejs-switch id="rtlSwitch" enableRtl="true"></ejs-switch>
```

---

## Additional Resources

- [Accessibility in Syncfusion ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/common/accessibility)
- [Live accessibility sample](https://ej2.syncfusion.com/accessibility/switch.html)
- [WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
