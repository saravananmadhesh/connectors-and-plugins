# Input Types & Value — Angular OTP Input

## Overview

The OTP Input supports three input types that control validation and display behavior. Choose the type based on the character set your OTP uses and the security requirements of your application. The `textTransform` property further controls case normalization.

---

## Input Types

Set the input type using the `type` property. Accepts string values: `'number'`, `'text'`, `'password'`, or the `OtpInputType` enum.

### Number Type (Default)

Restricts input to numeric digits (0–9). This is the standard choice for most OTP use cases such as SMS verification codes, bank PINs, or app authentication codes.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" type="number"></div>
  `
})
export class AppComponent { }
```

> **Default:** `OtpInputType.Number`. You don't need to specify `type` unless changing from the default.

### Text Type

Accepts both letters and numbers (alphanumeric). Use this when OTP codes include letters, such as product activation keys or mixed-character verification codes.

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" type="text"></div>
  `
})
export class AppComponent { }
```

### Password Type

Masks each character as it is entered (renders as `•` or `*`). Use for sensitive PIN entry where the code should not be visible on screen — for example, in banking applications or secure admin portals.

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="4" type="password"></div>
  `
})
export class AppComponent { }
```

---

## Text Transform

The `textTransform` property normalizes the case of text typed into the OTP fields. Useful when using `type="text"` for alphanumeric codes to ensure consistent storage or comparison.

| Value | Behavior |
|-------|----------|
| `'none'` (default) | Input is stored as typed |
| `'uppercase'` | All input is converted to uppercase |
| `'lowercase'` | All input is converted to lowercase |

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <!-- Force all input to uppercase regardless of Caps Lock state -->
    <div ejs-otpinput
      id="otpinput"
      [length]="6"
      type="text"
      textTransform="uppercase">
    </div>
  `
})
export class AppComponent { }
```

---

## Value Property

Use the `value` property to set the OTP programmatically. Accepts a `string` or `number`. The value is distributed across input fields left-to-right.

**Binding a value in the template:**

```html
<div ejs-otpinput [length]="6" [value]="otpValue"></div>
```

**Setting via component class:**

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput [length]="6" [value]="prefillCode"></div>
    <button (click)="clearOtp()">Clear</button>
  `
})
export class AppComponent {
  public prefillCode: string = '123456';

  clearOtp() {
    this.prefillCode = '';
  }
}
```

> **Tip:** If `value` length exceeds the configured `length`, only the first N characters fill the fields. Excess characters are ignored.

---

## Choosing the Right Type

| Scenario | Recommended type |
|---|---|
| SMS verification code (digits) | `number` |
| Bank/app PIN | `password` |
| Alphanumeric activation key | `text` |
| Alphanumeric, case-insensitive | `text` + `textTransform="uppercase"` |
| Sensitive PIN not visible on screen | `password` |

---

## See Also

- [Appearance](./appearance.md) — Configure length, styling modes, separators
- [Events](./events.md) — Respond when each digit is entered or full OTP is complete
- [API Reference](./api.md) — `type`, `value`, `textTransform` property details
