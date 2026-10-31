# API Reference — Angular OTP Input

**Source:** https://ej2.syncfusion.com/angular/documentation/api/otp-input/  
**Class:** `OtpInputComponent`  
**Selector:** `ejs-otpinput`  
**Module:** `OtpInputModule` from `@syncfusion/ej2-angular-inputs`

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
- [Enum Types](#enum-types)
- [Usage Examples](#usage-examples)

---

## Properties

### ariaLabels `string[]`

Defines the `aria-label` attribute for each individual input field in the OTP component. Each string in the array corresponds to the ARIA label for the field at the same index position.

- **Default:** `[]`
- **Template binding:** `[ariaLabels]="ariaLabels"`

```typescript
public ariaLabels: string[] = ['OTP digit 1', 'OTP digit 2', 'OTP digit 3', 'OTP digit 4'];
```

```html
<div ejs-otpinput [ariaLabels]="ariaLabels"></div>
```

---

### autoFocus `boolean`

Specifies whether the first OTP input field should automatically receive keyboard focus when the component is rendered.

- **Default:** `false`
- **Template binding:** `[autoFocus]="true"`

```html
<div ejs-otpinput [autoFocus]="true"></div>
```

---

### cssClass `string`

Applies one or more CSS class names to the OTP Input container for custom styling. Supports Syncfusion predefined state classes.

- **Default:** `''`
- **Predefined classes:** `e-success`, `e-warning`, `e-error`
- **Template binding:** `cssClass="e-error"`

```html
<div ejs-otpinput cssClass="e-success"></div>
<div ejs-otpinput [cssClass]="dynamicCssClass"></div>
```

---

### disabled `boolean`

When `true`, the component is disabled and does not accept user input. All input fields are rendered in a non-interactive state.

- **Default:** `false`
- **Template binding:** `[disabled]="true"`

```html
<div ejs-otpinput [disabled]="isDisabled"></div>
```

---

### enablePersistence `boolean`

When `true`, persists the component's state (including entered value) across page reloads using browser local storage.

- **Default:** `false`

```html
<div ejs-otpinput [enablePersistence]="true"></div>
```

---

### enableRtl `boolean`

When `true`, renders the component in right-to-left layout for RTL language support (Arabic, Hebrew, etc.).

- **Default:** `false`

```html
<div ejs-otpinput [enableRtl]="true"></div>
```

---

### htmlAttributes `{ [key: string]: string }`

Specifies additional HTML attributes to apply to the OTP component's root element. Use for `data-*` attributes, `title`, `name`, `aria-describedby`, and similar attributes.

- **Default:** `{}`
- **Template binding:** `[htmlAttributes]="htmlAttributes"`

```typescript
public htmlAttributes = { name: 'otp-input', title: 'Enter verification code' };
```

```html
<div ejs-otpinput [htmlAttributes]="htmlAttributes"></div>
```

---

### length `number`

Specifies the number of individual input boxes to render. Determines how many characters the OTP requires.

- **Default:** `4`
- **Template binding:** `[length]="6"`

```html
<div ejs-otpinput [length]="6"></div>
```

---

### locale `string`

Overrides the global culture and localization setting for this specific component instance. Use an IETF language tag (e.g., `'ar'`, `'fr'`, `'de'`).

- **Default:** `''` (inherits global culture, which defaults to `'en-US'`)

```html
<div ejs-otpinput locale="ar"></div>
```

---

### placeholder `string`

Hint text displayed inside each input field before the user enters a value.

- **Single character:** All fields display the same character.
- **Multi-character string:** Each character is mapped to the corresponding field (up to `length`).
- **Default:** `''`

```html
<!-- Single character — all fields show 'x' -->
<div ejs-otpinput placeholder="x"></div>

<!-- Multi-character — fields show: 1 | 2 | 3 | 4 | 5 | 6 -->
<div ejs-otpinput [length]="6" placeholder="123456"></div>
```

---

### separator `string`

A character or string rendered between each input field as a visual separator. The separator does not affect the submitted value.

- **Default:** `''`

```html
<div ejs-otpinput separator="-"></div>
<div ejs-otpinput separator="/"></div>
```

---

### stylingMode `string | OtpInputStyle`

Controls the visual style variant of the input fields.

- **Default:** `OtpInputStyle.Outlined` (`'outlined'`)
- **Values:** `'outlined'` | `'filled'` | `'underlined'`

```html
<div ejs-otpinput stylingMode="outlined"></div>
<div ejs-otpinput stylingMode="filled"></div>
<div ejs-otpinput stylingMode="underlined"></div>
```

---

### textTransform `string | TextTransform`

Specifies case transformation applied to text entered into OTP fields. Primarily useful with `type="text"` for alphanumeric OTPs.

- **Default:** `TextTransform.None` (`'none'`)
- **Values:** `'none'` | `'uppercase'` | `'lowercase'`

```html
<div ejs-otpinput type="text" textTransform="uppercase"></div>
```

---

### type `string | OtpInputType`

Specifies the input type for all OTP fields.

- **Default:** `OtpInputType.Number` (`'number'`)
- **Values:** `'number'` | `'text'` | `'password'`

| Value | Behavior |
|-------|----------|
| `'number'` | Accepts digits 0–9 only |
| `'text'` | Accepts any alphanumeric character |
| `'password'` | Masks entered characters |

```html
<div ejs-otpinput type="number"></div>
<div ejs-otpinput type="text"></div>
<div ejs-otpinput type="password"></div>
```

---

### value `string | number`

The current value of the OTP input. Distributes across input fields from left to right.

- **Default:** `''`

```html
<div ejs-otpinput [value]="'1234'"></div>
<div ejs-otpinput [value]="otpValue"></div>
```

---

## Methods

### focusIn()

Sets keyboard focus to the first available OTP input field. Call this programmatically to direct user attention to the OTP component.

**Returns:** `void`

```typescript
import { Component, ViewChild } from '@angular/core';
import { OtpInputComponent, OtpInputModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [OtpInputModule],
  selector: 'app-root',
  template: `
    <div ejs-otpinput #otpRef id="otpinput" [length]="6"></div>
    <button (click)="focusOtp()">Focus OTP</button>
  `
})
export class AppComponent {
  @ViewChild('otpRef') otpInput!: OtpInputComponent;

  focusOtp(): void {
    this.otpInput.focusIn();
  }
}
```

---

### focusOut()

Removes keyboard focus from the OTP input component if it is currently focused.

**Returns:** `void`

```typescript
this.otpInput.focusOut();
```

---

### destroy()

Destroys the OTP Input component instance and cleans up DOM elements and event listeners. Call when removing the component dynamically.

**Returns:** `void`

```typescript
this.otpInput.destroy();
```

---

## Events

### blur `EmitType<OtpFocusEventArgs>`

Fires when any OTP input field loses focus.

```html
<div ejs-otpinput (blur)="onBlur($event)"></div>
```

### created `EmitType<Event>`

Fires after the component finishes rendering.

```html
<div ejs-otpinput (created)="onCreated()"></div>
```

### focus `EmitType<OtpFocusEventArgs>`

Fires when any OTP input field receives focus.

```html
<div ejs-otpinput (focus)="onFocus($event)"></div>
```

### input `EmitType<OtpInputEventArgs>`

Fires each time the value in any single OTP field changes.

```html
<div ejs-otpinput (input)="onInput($event)"></div>
```

### valueChanged `EmitType<OtpChangedEventArgs>`

Fires when the complete OTP value is entered (all fields filled, length matches `length` property).

```html
<div ejs-otpinput (valueChanged)="onValueChanged($event)"></div>
```

---

## Event Argument Interfaces

### OtpFocusEventArgs

Used by `focus` and `blur` events.

| Property | Type | Description |
|----------|------|-------------|
| (standard event args) | — | Contains context about the focused/blurred field |

**Import:**
```typescript
import { OtpFocusEventArgs } from '@syncfusion/ej2-angular-inputs';
```

### OtpInputEventArgs

Used by the `input` event.

| Property | Type | Description |
|----------|------|-------------|
| (standard event args) | — | Contains the changed field's current value |

**Import:**
```typescript
import { OtpInputEventArgs } from '@syncfusion/ej2-angular-inputs';
```

### OtpChangedEventArgs

Used by the `valueChanged` event.

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | The complete OTP string after all fields are filled |

**Import:**
```typescript
import { OtpChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
```

---

## Enum Types

### OtpInputStyle

Controls the `stylingMode` property.

| Member | Value | Description |
|--------|-------|-------------|
| `Outlined` | `'outlined'` | Border on all sides (default) |
| `Filled` | `'filled'` | Solid background, no border |
| `Underlined` | `'underlined'` | Bottom border only |

```typescript
import { OtpInputStyle } from '@syncfusion/ej2-inputs';
// Usage: stylingMode="outlined" | "filled" | "underlined"
```

### OtpInputType

Controls the `type` property.

| Member | Value | Description |
|--------|-------|-------------|
| `Number` | `'number'` | Digits only (default) |
| `Text` | `'text'` | Alphanumeric |
| `Password` | `'password'` | Masked input |

```typescript
import { OtpInputType } from '@syncfusion/ej2-inputs';
// Usage: type="number" | "text" | "password"
```

### TextTransform

Controls the `textTransform` property.

| Member | Value | Description |
|--------|-------|-------------|
| `None` | `'none'` | No transformation (default) |
| `Uppercase` | `'uppercase'` | Convert to uppercase |
| `Lowercase` | `'lowercase'` | Convert to lowercase |

```typescript
import { TextTransform } from '@syncfusion/ej2-inputs';
// Usage: textTransform="none" | "uppercase" | "lowercase"
```

---

## Usage Examples

### All Properties Combined

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
      type="number"
      stylingMode="outlined"
      placeholder="·"
      separator="-"
      textTransform="none"
      [autoFocus]="true"
      [disabled]="false"
      [enableRtl]="false"
      [enablePersistence]="false"
      cssClass=""
      [ariaLabels]="labels"
      [htmlAttributes]="attrs"
      [value]="initialValue"
      (created)="onCreated()"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (input)="onInput($event)"
      (valueChanged)="onValueChanged($event)">
    </div>
  `
})
export class AppComponent {
  public labels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
  public attrs = { title: 'Enter 6-digit OTP', name: 'otp' };
  public initialValue = '';

  onCreated() { }
  onFocus(args: any) { }
  onBlur(args: any) { }
  onInput(args: any) { }
  onValueChanged(args: OtpChangedEventArgs) {
    console.log('Complete OTP:', args.value);
  }
}
```
