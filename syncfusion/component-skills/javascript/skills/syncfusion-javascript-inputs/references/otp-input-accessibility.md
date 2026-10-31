# Accessibility in OTP Input

## Table of Contents
- [Compliance Standards](#compliance-standards)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [ariaLabels Property](#arialabels-property)
- [htmlAttributes Property](#htmlattributes-property)

---

## Compliance Standards

The OTP Input control meets the following accessibility standards:

| Standard | Support |
|---|---|
| WCAG 2.2 | ✅ Supported |
| Section 508 | ✅ Supported |
| Screen Reader | ✅ Supported |
| Right-to-Left | ✅ Supported |
| Color Contrast | ✅ Supported |
| Mobile Device | ✅ Supported |
| Keyboard Navigation | ✅ Supported |

---

## WAI-ARIA Attributes

The OTP Input automatically applies these ARIA attributes:

| Attribute | Purpose |
|---|---|
| `role="group"` | Applied to the container — groups the individual OTP input fields as a collection |
| `aria-label` | Applied to each input field — provides a descriptive label for screen readers |

---

## Keyboard Navigation

| Key | Action |
|---|---|
| `Left Arrow` | Move focus to the previous OTP input field |
| `Right Arrow` | Move focus to the next OTP input field |
| `Tab` | Move initial focus; shift focus to the next input field |
| `Shift + Tab` | Move focus to the previous input field |

---

## ariaLabels Property

The `ariaLabels` property sets the `aria-label` attribute for each individual input field. Provide an array of strings — one per input field — to give screen reader users descriptive field labels.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234,
    ariaLabels: ['First digit', 'Second digit', 'Third digit', 'Fourth digit']
});
otpInput.appendTo('#otp_input');
```

For a 6-digit OTP:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    ariaLabels: [
        'OTP digit 1',
        'OTP digit 2',
        'OTP digit 3',
        'OTP digit 4',
        'OTP digit 5',
        'OTP digit 6'
    ]
});
otpInput.appendTo('#otp_input');
```

- `ariaLabels` defaults to `[]` (empty array — Syncfusion applies default ARIA labels).
- Array length should match the `length` property for correct per-field mapping.

---

## htmlAttributes Property

The `htmlAttributes` property passes extra HTML attributes as key-value pairs to the OTP Input component, enabling additional accessibility or custom data attributes.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234,
    htmlAttributes: { title: 'One-Time Password' }
});
otpInput.appendTo('#otp_input');
```

Multiple attributes:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    htmlAttributes: {
        title: 'Enter your OTP',
        'data-form-field': 'otp',
        name: 'otp-input'
    }
});
otpInput.appendTo('#otp_input');
```

---

## Notes

- Always provide `ariaLabels` in production OTP forms — it significantly improves screen reader experience.
- `ariaLabels` array length should equal the `length` property value.
- `htmlAttributes` defaults to `{}` — no extra attributes applied.
- RTL support is enabled via `enableRtl: true` (see Appearance reference).
