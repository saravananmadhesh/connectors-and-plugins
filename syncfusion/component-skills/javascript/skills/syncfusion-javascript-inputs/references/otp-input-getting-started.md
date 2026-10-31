# Getting Started with Syncfusion TypeScript OTP Input

## Table of Contents
- [Dependencies](#dependencies)
- [Installation and CSS Setup](#installation-and-css-setup)
- [Basic Initialization](#basic-initialization)
- [Setting and Reading Values](#setting-and-reading-values)
- [Auto Focus on Render](#auto-focus-on-render)

---

## Dependencies

```
@syncfusion/ej2-inputs
  └── @syncfusion/ej2-base
```

Install via npm:

```bash
npm install @syncfusion/ej2-inputs
```

---

## Installation and CSS Setup

Import the required CSS styles. Use the Material theme or any other built-in Syncfusion theme:

```css
/* styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/otp-input/index.css";
```

---

## Basic Initialization

**HTML** — place a `<div>` element with an `id` as the container:

```html
<div id="otp_input"></div>
```

**TypeScript** — import and initialize the OTP Input:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({});
otpInput.appendTo('#otp_input');
```

With common options:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    placeholder: 'x',
    stylingMode: 'outlined'
});
otpInput.appendTo('#otp_input');
```

---

## Setting and Reading Values

### Set value at initialization

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: '1234'
});
otpInput.appendTo('#otp_input');
```

Value can be a string or number:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234   // number also accepted
});
otpInput.appendTo('#otp_input');
```

### Read value programmatically

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({});
otpInput.appendTo('#otp_input');

// Access the current value at any time
let currentOtp: string | number = otpInput.value;
console.log('OTP value:', currentOtp);
```

### Read value from the `valueChanged` event

`valueChanged` fires when all OTP fields are filled and the component loses focus — the ideal place to trigger OTP verification:

```typescript
import { OtpInput, OtpChangedEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    valueChanged: (args: OtpChangedEventArgs) => {
        console.log('Complete OTP entered:', args.value);
        // Call your verification API here
    }
});
otpInput.appendTo('#otp_input');
```

---

## Auto Focus on Render

Set `autoFocus: true` to focus the first OTP input field automatically when the component renders — useful for OTP verification screens where the user should start typing immediately:

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    autoFocus: true
});
otpInput.appendTo('#otp_input');
```

---

## Notes

- The OTP Input renders into a `<div>` container, not a native `<input>` element.
- `appendTo` accepts both a CSS selector string (`'#otp_input'`) and an `HTMLElement`.
- `length` defaults to `4` if not specified.
- `value` accepts both `string` and `number` types.
- The `valueChanged` event fires only when the value matches the OTP length AND the component focus-outs — use `input` for real-time per-field tracking.
