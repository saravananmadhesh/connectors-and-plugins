# Separator in OTP Input

The `separator` property sets a character or symbol displayed **between** each OTP input field, visually separating them for improved readability.

## Basic Separator Usage

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    separator: '/'
});
otpInput.appendTo('#separator_otp');
```

---

## Common Separator Options

| Separator | Visual Example | Use Case |
|---|---|---|
| `'/'` | `[1] / [2] / [3] / [4]` | Date-like separation |
| `'-'` | `[1] - [2] - [3] - [4]` | Common OTP display |
| `'·'` | `[1] · [2] · [3] · [4]` | Subtle dot separator |
| `':'` | `[1] : [2] : [3] : [4]` | Time-like separation |
| `' '` | `[1]   [2]   [3]   [4]` | Space separator |

---

## Separator with Other Properties

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    separator: '-',
    stylingMode: 'outlined',
    placeholder: '0',
    type: 'number'
});
otpInput.appendTo('#otp_input');
```

---

## Notes

- `separator` defaults to `''` (no separator).
- The separator is purely visual — it is **not** included in the `value`.
- Any string can be used as a separator — single characters work best visually.
- Separator rendering is consistent across all `stylingMode` values.
