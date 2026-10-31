# Events in OTP Input

## Table of Contents
- [created](#created)
- [focus](#focus)
- [blur](#blur)
- [input](#input)
- [valueChanged](#valuechanged)
- [Event Argument Types](#event-argument-types)
- [Choosing the Right Event](#choosing-the-right-event)

---

## created

Fires when the OTP Input component has finished rendering. Use it to run initialization logic that requires the component to be in the DOM.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    created: () => {
        console.log('OTP Input is ready');
    }
});
otpInput.appendTo('#otp_default');
```

---

## focus

Fires when any OTP input field gains focus. The `OtpFocusEventArgs` argument provides focus event details.

```typescript
import { OtpInput, OtpFocusEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    focus: (args: OtpFocusEventArgs) => {
        console.log('OTP Input focused');
    }
});
otpInput.appendTo('#otp_default');
```

---

## blur

Fires when the OTP Input loses focus (focus-out from any field). The `OtpFocusEventArgs` argument provides blur event details.

```typescript
import { OtpInput, OtpFocusEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    blur: (args: OtpFocusEventArgs) => {
        console.log('OTP Input blurred');
    }
});
otpInput.appendTo('#otp_default');
```

---

## input

Fires **each time** the value of an individual OTP input field changes. The `OtpInputEventArgs` argument provides change details for each field. Use this for real-time per-field reactions.

```typescript
import { OtpInput, OtpInputEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    input: (args: OtpInputEventArgs) => {
        console.log('Field value changed:', args.value);
    }
});
otpInput.appendTo('#otp_default');
```

---

## valueChanged

Fires when the **complete OTP value** is entered (all fields filled) and the component focus-outs. The `OtpChangedEventArgs` argument provides the full OTP value. This is the primary event for OTP verification.

```typescript
import { OtpInput, OtpChangedEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    valueChanged: (args: OtpChangedEventArgs) => {
        console.log('Complete OTP entered:', args.value);
    }
});
otpInput.appendTo('#otp_default');
```

Practical verification example:

```typescript
import { OtpInput, OtpChangedEventArgs } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6,
    valueChanged: (args: OtpChangedEventArgs) => {
        // args.value contains the full 6-digit OTP string
        verifyOtp(args.value as string);
    }
});
otpInput.appendTo('#otp_input');

function verifyOtp(otp: string): void {
    // Call your API with the OTP
    console.log('Verifying OTP:', otp);
}
```

---

## Event Argument Types

| Event | Argument Type | Import |
|---|---|---|
| `created` | `Event` | — |
| `focus` | `OtpFocusEventArgs` | `@syncfusion/ej2-inputs` |
| `blur` | `OtpFocusEventArgs` | `@syncfusion/ej2-inputs` |
| `input` | `OtpInputEventArgs` | `@syncfusion/ej2-inputs` |
| `valueChanged` | `OtpChangedEventArgs` | `@syncfusion/ej2-inputs` |

---

## Choosing the Right Event

| Goal | Use Event |
|---|---|
| Run code after component renders | `created` |
| Detect user starts typing | `focus` |
| Validate / trigger on complete OTP entry | `valueChanged` |
| Real-time per-keystroke tracking | `input` |
| Cleanup / save on focus-out | `blur` |
