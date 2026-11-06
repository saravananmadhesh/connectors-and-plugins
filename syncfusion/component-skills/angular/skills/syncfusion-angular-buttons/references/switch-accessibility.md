# Accessibility — Syncfusion Angular Switch

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Accessibility](#rtl-accessibility)
- [Color Contrast](#color-contrast)
- [Testing Accessibility](#testing-accessibility)

---

## Compliance Overview

The Syncfusion Angular Switch meets the following accessibility standards:

| Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| ADA | ✅ Full |
| Screen Reader | ✅ Full |
| RTL Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker (IBM) | ✅ Validated |
| Axe-core | ✅ Validated |

---

## WAI-ARIA Attributes

The Switch follows the [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) specification.

| Attribute | Purpose |
|---|---|
| `role="switch"` | Identifies the element as a switch widget to assistive technologies |
| `aria-checked` | Communicates the current checked (`true`) or unchecked (`false`) state |
| `aria-disabled` | Indicates the switch is perceivable but not operable when `disabled` is `true` |

These attributes are applied automatically by the component. No manual ARIA configuration is required for standard use.

**Custom `aria-label` via `htmlAttributes`:**
```html
<ejs-switch [htmlAttributes]="{'aria-label': 'Enable notifications'}"></ejs-switch>
```

Providing a meaningful `aria-label` is recommended when the Switch has no visible text label, so screen reader users understand the control's purpose.

---

## Keyboard Interaction

The Switch supports keyboard navigation per the [WAI-ARIA keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/switch/#keyboardinteraction):

| Key | Action |
|---|---|
| `Tab` | Move focus to the Switch |
| `Shift + Tab` | Move focus away from the Switch (backwards) |
| `Space` | Toggle the Switch state (checked ↔ unchecked) when focused |

The Switch receives focus via tabbing or programmatic `focusIn()`. A visible focus ring is rendered automatically when using keyboard navigation.

---

## Screen Reader Support

- The Switch announces its current state (`on` / `off`) and role (`switch`) to screen readers
- State changes are communicated immediately via `aria-checked`
- The `disabled` state is announced via `aria-disabled="true"`
- Compatible with NVDA, JAWS, VoiceOver (macOS/iOS), and TalkBack (Android)

**Best practice:** Always associate a visible label or provide `aria-label` / `aria-labelledby`:

```html
<!-- Option 1: Visible label with htmlAttributes -->
<label id="wifi-label">Wi-Fi</label>
<ejs-switch [htmlAttributes]="{'aria-labelledby': 'wifi-label'}"></ejs-switch>

<!-- Option 2: aria-label directly -->
<ejs-switch [htmlAttributes]="{'aria-label': 'Enable Wi-Fi'}"></ejs-switch>
```

---

## RTL Accessibility

Enable RTL for right-to-left language support. The Switch layout reverses visually, and the direction is reflected in the accessibility tree.

```html
<ejs-switch [enableRtl]="true" [checked]="true"></ejs-switch>
```

RTL is fully supported with screen readers in RTL languages (Arabic, Hebrew, etc.).

---

## Color Contrast

The default Syncfusion themes (Material, Bootstrap 5, Fluent, High Contrast) meet WCAG 2.2 contrast requirements:
- **Normal vision:** Minimum 4.5:1 ratio for text, 3:1 for UI components
- **High Contrast theme:** Specifically designed for users with low vision or color blindness

To use the high contrast theme:
```css
@import '../node_modules/@syncfusion/ej2-base/styles/highcontrast.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/highcontrast.css';
```

When applying custom colors via `cssClass`, verify contrast ratios with tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

---

## Testing Accessibility

Validate the Switch's accessibility compliance with these tools:

**Automated tools:**
- [axe DevTools](https://www.deque.com/axe/) browser extension
- [IBM accessibility-checker](https://www.npmjs.com/package/accessibility-checker)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome DevTools

**Manual testing:**
1. Navigate to the Switch using `Tab` only
2. Toggle using `Space` — confirm state changes and screen reader announcements
3. Verify focus indicator is visible
4. Test with NVDA + Firefox or VoiceOver + Safari

**Live accessibility sample:**
[https://ej2.syncfusion.com/accessibility/switch.html](https://ej2.syncfusion.com/accessibility/switch.html)
