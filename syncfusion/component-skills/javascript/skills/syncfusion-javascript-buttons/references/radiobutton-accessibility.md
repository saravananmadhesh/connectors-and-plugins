# Accessibility — Syncfusion JavaScript RadioButton

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Overview

The Syncfusion EJ2 RadioButton component meets all major accessibility standards:

| Accessibility Criteria          | Compliance |
|---------------------------------|------------|
| WCAG 2.2                        | ✅ Full    |
| Section 508                     | ✅ Full    |
| ADA (Americans with Disabilities Act) | ✅ Full |
| Screen Reader Support           | ✅ Full    |
| Right-To-Left (RTL) Support     | ✅ Full    |
| Color Contrast                  | ✅ Full    |
| Mobile Device Support           | ✅ Full    |
| Keyboard Navigation Support     | ✅ Full    |
| Accessibility Checker Validation | ✅ Full   |
| Axe-core Accessibility Validation | ✅ Full  |

The component follows [WAI-ARIA RadioGroup patterns](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

---

## WAI-ARIA Attributes

The RadioButton component uses the following ARIA attribute:

| Attribute        | Purpose                                                                                      |
|------------------|----------------------------------------------------------------------------------------------|
| `aria-disabled`  | Indicates that the RadioButton is perceivable but not editable or operable (disabled state). |

The native `<input type="radio">` element carries implicit ARIA role `radio`, so no additional `role` attribute is needed.

---

## Keyboard Interaction

The RadioButton follows the [WAI-ARIA keyboard interaction guideline for radio groups](https://www.w3.org/WAI/ARIA/apg/patterns/radio/#keyboardinteraction):

| Key                        | Action                                          |
|----------------------------|-------------------------------------------------|
| `Up Arrow` / `Left Arrow`  | Move focus to and select the **previous** option in the group |
| `Down Arrow` / `Right Arrow` | Move focus to and select the **next** option in the group |

> Users navigating with arrow keys within a RadioButton group automatically select the option they move to — there is no need to press `Space` or `Enter` to confirm.

---

## Screen Reader Support

The RadioButton component is fully compatible with major screen readers, including:

- NVDA (NonVisual Desktop Access)
- JAWS (Job Access With Speech)
- VoiceOver (macOS and iOS)
- TalkBack (Android)

Screen readers announce:
- The role: "radio"
- The label text (set via `label` property)
- The state: "checked" or "not checked"
- Whether the control is disabled

---

## Ensuring Accessibility

Syncfusion validates the RadioButton's accessibility compliance using:

- [`accessibility-checker`](https://www.npmjs.com/package/accessibility-checker) — automated accessibility testing
- [`axe-core`](https://www.npmjs.com/package/axe-core) — rule-based accessibility engine

### Implementation best practices

To ensure your RadioButton group is fully accessible:

1. **Always set `name`** — Groups RadioButtons so assistive technologies understand they are mutually exclusive options.

```typescript
let rb1: RadioButton = new RadioButton({ label: 'Option 1', name: 'group1' });
let rb2: RadioButton = new RadioButton({ label: 'Option 2', name: 'group1' });
```

2. **Always set `label`** — The `label` property provides the accessible name for the RadioButton. Without it, screen readers may announce the button without context.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Agree to terms', name: 'agreement' });
```

3. **Use `disabled` instead of removing elements** — Disabled RadioButtons remain in the DOM and are announced by screen readers as "dimmed" or "unavailable", giving users context.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Unavailable option', name: 'group', disabled: true });
```

4. **Wrap groups in a `<fieldset>` with `<legend>`** for semantic grouping:

```html
<fieldset>
  <legend>Payment Method</legend>
  <input id="radio1" type="radio" />
  <input id="radio2" type="radio" />
</fieldset>
```

5. **Ensure sufficient color contrast** — Syncfusion's built-in themes meet WCAG 2.2 contrast ratios. If you customize colors via `cssClass`, verify they meet a minimum 4.5:1 contrast ratio for normal text.
