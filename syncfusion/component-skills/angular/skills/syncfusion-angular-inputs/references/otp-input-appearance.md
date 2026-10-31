# Appearance — Angular OTP Input

## Table of Contents
- [Setting Input Length](#setting-input-length)
- [Disabled State](#disabled-state)
- [CSS Classes (State Styles)](#css-classes-state-styles)
- [Separator](#separator)
- [Placeholder](#placeholder)
- [Styling Modes](#styling-modes)

---

## Setting Input Length

The `length` property controls how many individual input boxes are rendered. Default is `4`.

```html
<!-- 6-digit OTP -->
<div ejs-otpinput id="otpinput" [length]="6"></div>
```

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `<div ejs-otpinput [length]="otpLength"></div>`
})
export class AppComponent {
  public otpLength: number = 6;
}
```

> **Tip:** Match `length` to your backend OTP configuration (e.g., 4 for PIN, 6 for standard OTP, 8 for extended codes).

---

## Disabled State

Use the `disabled` property to prevent user input. Useful during submission processing or when the OTP has already been verified.

```html
<!-- Static disabled OTP display -->
<div ejs-otpinput [length]="6" [disabled]="true" value="123456"></div>
```

**Dynamic disable during submission:**

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      [length]="6"
      [disabled]="isSubmitting"
      (valueChanged)="onOtpComplete($event)">
    </div>
  `
})
export class AppComponent {
  public isSubmitting = false;

  onOtpComplete(args: any) {
    this.isSubmitting = true;
    // verify OTP...
  }
}
```

> **Default:** `false`. The component is interactive by default.

---

## CSS Classes (State Styles)

Use the `cssClass` property to apply visual feedback states. These use predefined Syncfusion CSS class names.

| CSS Class | Usage |
|-----------|-------|
| `e-success` | OTP verified successfully |
| `e-warning` | OTP entry requires attention |
| `e-error` | OTP verification failed |

```typescript
@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput
      [length]="6"
      [cssClass]="otpState"
      (valueChanged)="verifyOtp($event)">
    </div>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class AppComponent {
  public otpState: string = '';
  public message: string = '';

  verifyOtp(args: any) {
    if (args.value === '123456') {
      this.otpState = 'e-success';
      this.message = 'OTP verified!';
    } else {
      this.otpState = 'e-error';
      this.message = 'Invalid OTP. Please try again.';
    }
  }
}
```

> You can also combine classes: `cssClass="e-error my-custom-class"`.

---

## Separator

The `separator` property inserts a visual character or symbol between each OTP input field. Useful for grouping digits visually (e.g., phone numbers, activation keys).

```html
<!-- Hyphen separator: [ 1 ] - [ 2 ] - [ 3 ] - [ 4 ] -->
<div ejs-otpinput [length]="4" separator="-"></div>
```

```html
<!-- Slash separator -->
<div ejs-otpinput [length]="6" separator="/"></div>
```

> **Default:** `''` (no separator). The separator is purely visual and is not included in the submitted `value`.

---

## Placeholder

The `placeholder` property shows hint text inside each input box until the user types. Two modes:

### Single Character Placeholder

When a single character is provided, all fields display the same character:

```html
<!-- All fields show 'x' as placeholder -->
<div ejs-otpinput [length]="6" placeholder="x"></div>
```

### Per-Field Placeholder String

When a multi-character string is provided, each character in the string maps to the respective input field (up to `length`):

```html
<!-- Fields show: A | B | C | D | E | F -->
<div ejs-otpinput [length]="6" placeholder="ABCDEF"></div>
```

```html
<!-- Fields show: 0 | 0 | 0 | 0 -->
<div ejs-otpinput [length]="4" placeholder="0000"></div>
```

> Placeholder is only shown when the field is empty and unfocused. It does not affect the submitted value.

---

## Styling Modes

The `stylingMode` property controls the visual presentation of each OTP input box. Three built-in modes match common design systems.

### Outlined (Default)

Visible border with a background. Provides clear visual boundaries — the recommended choice for most use cases.

```html
<div ejs-otpinput [length]="6" stylingMode="outlined"></div>
```

### Filled

Solid background color, no border. Creates a modern, compact look. Use in designs that emphasize fill-based field differentiation.

```html
<div ejs-otpinput [length]="6" stylingMode="filled"></div>
```

### Underlined

Only a bottom border — minimalist style. Works well in space-constrained layouts or mobile-first designs.

```html
<div ejs-otpinput [length]="6" stylingMode="underlined"></div>
```

### Comparing Styling Modes

| Mode | Visual style | Best for |
|------|--------------|----------|
| `outlined` | Border all sides | Standard forms, high visibility |
| `filled` | Solid background | Modern UI, dashboard design |
| `underlined` | Bottom border only | Mobile, minimal design |

---

## Combining Appearance Properties

```html
<!-- 6-digit, filled style, hyphen separator, single-char placeholder, error state -->
<div ejs-otpinput
  [length]="6"
  stylingMode="filled"
  separator="-"
  placeholder="·"
  cssClass="e-error">
</div>
```

---

## See Also

- [Input Types & Value](./input-types-and-value.md) — number, text, password modes
- [Events](./events.md) — Respond when OTP is complete
- [Accessibility](./accessibility.md) — ARIA labels, RTL, keyboard navigation
