# Placeholder in OTP Input

The `placeholder` property sets hint text displayed in each OTP input field until the user enters a value. It guides users on expected input format.

## Single Character Placeholder

When a **single character** is provided, the same character is shown as a placeholder in **all** input fields.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// All 4 fields show 'x' as placeholder
let otpInput: OtpInput = new OtpInput({
    placeholder: 'x'
});
otpInput.appendTo('#default_otp');
```

Common single-character placeholder choices:

| Character | Common Use |
|---|---|
| `'x'` | Generic digit hint |
| `'0'` | Numeric hint |
| `'_'` | Underscore blank |
| `'·'` | Dot hint |
| `'#'` | Hash hint |

---

## Multi-Character Placeholder

When **multiple characters** are provided, each character from the string is displayed in the corresponding input field, sequentially — useful for showing format hints (e.g., `"wxyz"` shows `w`, `x`, `y`, `z` in each field).

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// Fields show 'w', 'x', 'y', 'z' respectively
let otpInput: OtpInput = new OtpInput({
    placeholder: 'wxyz'
});
otpInput.appendTo('#default_otp');
```

If the placeholder string is shorter than `length`, remaining fields show no placeholder.

---

## Placeholder with Floating Label Style

Combine `placeholder` with `stylingMode` for styled OTP fields:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    placeholder: '0',
    stylingMode: 'outlined'
});
otpInput.appendTo('#otp_input');
```

---

## Notes

- `placeholder` defaults to `''` (empty — no placeholder shown).
- A single-character placeholder replicates the character across all fields.
- A multi-character placeholder distributes characters positionally.
- Placeholder text disappears as soon as the user types in each field.
