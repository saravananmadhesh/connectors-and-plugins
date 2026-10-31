# Appearance and Configuration in OTP Input

## Table of Contents
- [Setting Input Length](#setting-input-length)
- [Disabled State](#disabled-state)
- [cssClass — Predefined and Custom Styles](#cssclass--predefined-and-custom-styles)
- [Right-to-Left Rendering](#right-to-left-rendering)

---

## Setting Input Length

The `length` property determines how many individual input fields are rendered. Defaults to `4`.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// 6-digit OTP
let otpInput: OtpInput = new OtpInput({
    length: 6
});
otpInput.appendTo('#otp_default');
```

Common lengths:

| Use Case | Recommended Length |
|---|---|
| Standard SMS OTP | 4 |
| Bank / Finance OTP | 6 |
| TOTP (e.g., Google Auth) | 6 |
| Custom PIN | 4–8 |

---

## Disabled State

Set `disabled: true` to render the OTP Input in a disabled state, preventing user interaction. Defaults to `false`.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234,
    disabled: true
});
otpInput.appendTo('#otp_disabled');
```

---

## cssClass — Predefined and Custom Styles

The `cssClass` property adds a CSS class to the OTP Input wrapper. Use predefined state classes or custom class names.

### Predefined State Classes

| Class | Meaning |
|---|---|
| `e-success` | Positive / valid state (green) |
| `e-warning` | Caution state (yellow/orange) |
| `e-error` | Negative / invalid state (red) |

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

// Success state — e.g., OTP verified
let successOtp: OtpInput = new OtpInput({
    value: 1234,
    cssClass: 'e-success'
});
successOtp.appendTo('#otp_success');

// Error state — e.g., invalid OTP
let errorOtp: OtpInput = new OtpInput({
    value: 1234,
    cssClass: 'e-error'
});
errorOtp.appendTo('#otp_error');

// Warning state — e.g., OTP expiring soon
let warningOtp: OtpInput = new OtpInput({
    value: 1234,
    cssClass: 'e-warning'
});
warningOtp.appendTo('#otp_warning');
```

### Dynamic State Change

Switch the `cssClass` after validation response:

```typescript
import { OtpInput, OtpChangedEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    valueChanged: (args: OtpChangedEventArgs) => {
        if (args.value === '123456') {
            otpInput.cssClass = 'e-success';
        } else {
            otpInput.cssClass = 'e-error';
        }
        otpInput.dataBind();
    }
});
otpInput.appendTo('#otp_input');
```

### Custom cssClass

Apply a custom class for full control over styling:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    cssClass: 'my-custom-otp'
});
otpInput.appendTo('#otp_input');
```

```css
.my-custom-otp .e-otp-input-field {
    border-radius: 8px;
    font-size: 1.2rem;
}
```

---

## Right-to-Left Rendering

Enable RTL layout using `enableRtl: true`. The input fields render in right-to-left order:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 4,
    enableRtl: true
});
otpInput.appendTo('#otp_input');
```
