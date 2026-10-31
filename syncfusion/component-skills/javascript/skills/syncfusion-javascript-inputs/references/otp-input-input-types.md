# Input Types and Value in OTP Input

## Table of Contents
- [type Property Overview](#type-property-overview)
- [Number Type](#number-type)
- [Text Type](#text-type)
- [Password Type](#password-type)
- [value Property](#value-property)

---

## type Property Overview

The `type` property controls the input type of each OTP field. Choose based on the expected OTP format:

| Value | HTML Input Type | Use Case |
|---|---|---|
| `'number'` | `number` | Numeric-only OTPs (default) |
| `'text'` | `text` | Alphanumeric OTPs (letters + numbers) |
| `'password'` | `password` | Hidden/masked entry for security |

The default value is `'number'` (`OtpInputType.Number`).

---

## Number Type

Ideal for standard numeric OTP codes. Accepts digits only.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234,
    type: 'number'
});
otpInput.appendTo('#number_otp');
```

Since `number` is the default, this is equivalent to:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234
});
otpInput.appendTo('#number_otp');
```

---

## Text Type

Suitable when the OTP includes both letters and numbers (alphanumeric codes).

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 'e3c7',
    type: 'text'
});
otpInput.appendTo('#text_otp');
```

---

## Password Type

Masks entered characters — use for secure PIN or passphrase entry where the value should not be visible on screen.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: '1234',
    type: 'password'
});
otpInput.appendTo('#password_otp');
```

---

## value Property

The `value` property sets the initial OTP value. It accepts both `string` and `number`.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// String value
let otpInput: OtpInput = new OtpInput({
    value: '1234'
});
otpInput.appendTo('#otp_default');
```

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// Number value
let otpInput: OtpInput = new OtpInput({
    value: 1234
});
otpInput.appendTo('#otp_default');
```

### Choosing Type Based on Use Case

| OTP Format | Recommended `type` | Example Value |
|---|---|---|
| 4-digit SMS code | `'number'` | `1234` |
| 6-digit TOTP | `'number'` | `'482917'` |
| Alphanumeric token | `'text'` | `'a3b9'` |
| Secure PIN | `'password'` | `'4821'` |
