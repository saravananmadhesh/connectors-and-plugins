# Accessibility — Angular OTP Input

## Overview

The Syncfusion Angular OTP Input is built to meet the following accessibility standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| ADA | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Passed |
| Axe-core Validation | ✅ Passed |

---

## WAI-ARIA Attributes

The OTP Input uses the following ARIA attributes automatically:

| Attribute | Purpose |
|-----------|---------|
| `role="group"` | Groups the individual input fields into a logical collection |
| `aria-label` | Provides descriptive text for each input field (set via `ariaLabels` property) |

---

## ariaLabels — Per-Field ARIA Labels

The `ariaLabels` property accepts an array of strings. Each string becomes the `aria-label` attribute for the corresponding input field. This is essential for screen reader users, who need context for each individual field.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      id="otpinput"
      [length]="4"
      [ariaLabels]="otpLabels">
    </div>
  `
})
export class AppComponent {
  public otpLabels: string[] = [
    'OTP digit 1',
    'OTP digit 2',
    'OTP digit 3',
    'OTP digit 4'
  ];
}
```

> Provide as many labels as there are fields (`ariaLabels.length` should match `length`). Screen readers announce each label as the user tabs between fields.

---

## htmlAttributes — Additional HTML Attributes

The `htmlAttributes` property allows you to pass extra HTML attributes directly to the OTP container element. Use this to add custom `data-*` attributes, `title`, `role` overrides, or test IDs.

```typescript
import { Component } from '@angular/core';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      id="otpinput"
      [length]="6"
      [htmlAttributes]="otpAttributes">
    </div>
  `
})
export class AppComponent {
  public otpAttributes: { [key: string]: string } = {
    'title': 'Enter your 6-digit verification code',
    'data-testid': 'otp-input',
    'name': 'verification-code'
  };
}
```

---

## RTL Support

Enable right-to-left layout using the `enableRtl` property. This reverses the input field order and text direction, suitable for Arabic, Hebrew, and other RTL languages.

```html
<div ejs-otpinput id="otpinput" [length]="6" [enableRtl]="true"></div>
```

> RTL affects field order (right-to-left focus traversal) and ARIA attribute directions. Combine with an RTL-aware Syncfusion theme for full visual consistency.

---

## Keyboard Navigation

All keyboard interactions work without mouse access:

| Key | Action |
|-----|--------|
| `Left Arrow` | Moves focus to the previous input field |
| `Right Arrow` | Moves focus to the next input field |
| `Tab` | Moves initial focus into the OTP group, then advances field by field |
| `Shift + Tab` | Moves focus to the previous input field |

> Keyboard navigation is automatic — no additional configuration needed.

---

## Best Practices

1. **Always set `ariaLabels`** for screen reader accessibility in production applications.
2. **Use `htmlAttributes`** to add a meaningful `title` attribute that describes the overall OTP input purpose.
3. **Pair `ariaLabels` with a visible label** (e.g., a `<label>` or heading above the OTP component) so both sighted and non-sighted users have context.
4. **Test with screen readers** (NVDA, JAWS, VoiceOver) to verify the announced field labels make sense in sequence.
5. **Verify color contrast** when using custom themes or `cssClass` overrides.

---

## Accessible OTP Form Example

```typescript
import { Component } from '@angular/core';
import { OtpInputModule, OtpChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <section aria-labelledby="otp-heading">
      <h2 id="otp-heading">Enter Verification Code</h2>
      <p id="otp-description">
        A 6-digit code was sent to your registered mobile number.
      </p>
      <div ejs-otpinput
        id="otpinput"
        [length]="6"
        [ariaLabels]="otpLabels"
        [htmlAttributes]="otpAttrs"
        [autoFocus]="true"
        (valueChanged)="onOtpComplete($event)">
      </div>
    </section>
  `
})
export class AppComponent {
  public otpLabels: string[] = [
    'Digit 1 of 6',
    'Digit 2 of 6',
    'Digit 3 of 6',
    'Digit 4 of 6',
    'Digit 5 of 6',
    'Digit 6 of 6'
  ];

  public otpAttrs: { [key: string]: string } = {
    'aria-describedby': 'otp-description',
    'title': 'Enter 6-digit verification code'
  };

  onOtpComplete(args: OtpChangedEventArgs): void {
    console.log('OTP complete:', args.value);
  }
}
```

---

## See Also

- [API Reference](./api.md) — `ariaLabels`, `htmlAttributes`, `enableRtl` property details
- [Events](./events.md) — Handle focus and blur for accessible feedback
- [Appearance](./appearance.md) — CSS classes for state indication
