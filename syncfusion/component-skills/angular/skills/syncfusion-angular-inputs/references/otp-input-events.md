# Events — Angular OTP Input

## Overview

The OTP Input provides five events covering the component lifecycle and all user interactions. Use these to validate partial input, detect completion, trigger verification, and integrate with forms.

| Event | When it fires | Event arg type |
|-------|--------------|----------------|
| `created` | Component finishes rendering | `Event` |
| `focus` | A field receives focus | `OtpFocusEventArgs` |
| `blur` | A field loses focus | `OtpFocusEventArgs` |
| `input` | A single field value changes | `OtpInputEventArgs` |
| `valueChanged` | All fields are filled (full OTP entered) | `OtpChangedEventArgs` |

---

## created

Fires once after the component is fully rendered and ready. Use for post-render setup, such as programmatic focus via `focusIn()`.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" (created)="onCreated()"></div>
  `
})
export class AppComponent {
  onCreated(): void {
    console.log('OTP Input is ready');
  }
}
```

---

## focus

Fires each time one of the individual input fields receives focus. The `OtpFocusEventArgs` argument provides context about which field gained focus.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpFocusEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" (focus)="onFocus($event)"></div>
  `
})
export class AppComponent {
  onFocus(args: OtpFocusEventArgs): void {
    console.log('Field focused:', args);
  }
}
```

---

## blur

Fires when a field loses focus (user tabs away or clicks elsewhere). Use to validate partial input or show helpful hints.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpFocusEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" (blur)="onBlur($event)"></div>
    <p *ngIf="blurMessage">{{ blurMessage }}</p>
  `
})
export class AppComponent {
  public blurMessage: string = '';

  onBlur(args: OtpFocusEventArgs): void {
    this.blurMessage = 'Please complete all OTP fields.';
  }
}
```

---

## input

Fires each time the value of any single OTP field changes (on every keystroke). The `OtpInputEventArgs` argument includes the current per-field value.

Use this for live input tracking, analytics, or progressive validation.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpInputEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput id="otpinput" [length]="6" (input)="onInput($event)"></div>
  `
})
export class AppComponent {
  onInput(args: OtpInputEventArgs): void {
    console.log('Field value changed:', args);
  }
}
```

---

## valueChanged

Fires when the user has filled all OTP fields (the total entry length matches the configured `length`). This is the primary event for triggering OTP verification.

The `OtpChangedEventArgs` argument contains the complete `value` string.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      id="otpinput"
      [length]="6"
      (valueChanged)="onOtpComplete($event)">
    </div>
    <p>Status: {{ statusMessage }}</p>
  `
})
export class AppComponent {
  public statusMessage: string = 'Enter your OTP';

  onOtpComplete(args: OtpChangedEventArgs): void {
    this.statusMessage = `Verifying OTP: ${args.value}`;
    this.verifyOtp(args.value);
  }

  private verifyOtp(otp: string): void {
    // Call your backend verification service here
  }
}
```

---

## Practical Pattern: Auto-Submit with Disable on Completion

A common UX pattern — disable the OTP input and show a loading state as soon as the user enters the full code:

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      id="otpinput"
      [length]="6"
      [disabled]="isVerifying"
      [cssClass]="otpCssClass"
      (valueChanged)="handleOtpComplete($event)">
    </div>
    <p>{{ statusMessage }}</p>
  `
})
export class AppComponent {
  public isVerifying = false;
  public otpCssClass = '';
  public statusMessage = 'Enter your 6-digit code';

  handleOtpComplete(args: OtpChangedEventArgs): void {
    this.isVerifying = true;
    this.statusMessage = 'Verifying...';

    // Simulate async verification
    setTimeout(() => {
      const isValid = args.value === '123456';
      this.isVerifying = false;
      this.otpCssClass = isValid ? 'e-success' : 'e-error';
      this.statusMessage = isValid ? 'Verified successfully!' : 'Invalid OTP. Try again.';
    }, 1500);
  }
}
```

---

## Using Multiple Events Together

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpFocusEventArgs, OtpInputEventArgs, OtpChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      id="otpinput"
      [length]="6"
      (created)="onCreated()"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (input)="onInput($event)"
      (valueChanged)="onValueChanged($event)">
    </div>
  `
})
export class AppComponent {
  onCreated(): void { /* component ready */ }
  onFocus(args: OtpFocusEventArgs): void { /* field focused */ }
  onBlur(args: OtpFocusEventArgs): void { /* field blurred */ }
  onInput(args: OtpInputEventArgs): void { /* digit entered */ }
  onValueChanged(args: OtpChangedEventArgs): void { /* OTP complete */ }
}
```

---

## See Also

- [API Reference](./api.md) — Full event arg interface definitions
- [Appearance](./appearance.md) — CSS class states for success/error feedback
- [Accessibility](./accessibility.md) — Keyboard interaction and ARIA
