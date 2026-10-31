# MaskedTextBox API Reference

Source: https://ej2.syncfusion.com/angular/documentation/api/maskedtextbox/index-default

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Types](#event-argument-types)
- [Accessibility & WAI-ARIA](#accessibility--wai-aria)

## Import

```typescript
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

// In app.module.ts
imports: [MaskedTextBoxModule]
```

---

## Properties

### `mask` · string · Default: `null`

Sets the input mask to enforce input format. Accepts standard mask elements, custom characters, and regular expressions. When empty, behaves as a plain text input.

```html
<ejs-maskedtextbox mask="000-000-0000"></ejs-maskedtextbox>
```

---

### `value` · string · Default: `null`

Gets or sets the raw value of the MaskedTextBox — without literals and prompt characters. Use `getMaskedValue()` method to retrieve the value in masked format.

```html
<ejs-maskedtextbox mask="(999) 9999-999" [value]="'8674321756'"></ejs-maskedtextbox>
```

---

### `placeholder` · string · Default: `null`

Sets the hint text shown when the MaskedTextBox is empty. Acts as a floating label when used with `floatLabelType`.

```html
<ejs-maskedtextbox mask="000-000-0000" placeholder="Enter phone number"></ejs-maskedtextbox>
```

---

### `floatLabelType` · FloatLabelType · Default: `"Never"`

Controls floating label behavior. Options:
- `"Never"` — label does not float
- `"Always"` — label always floats above the input
- `"Auto"` — label floats when input is focused or has a value

```html
<ejs-maskedtextbox mask="000-000-0000" placeholder="Phone" floatLabelType="Auto"></ejs-maskedtextbox>
```

---

### `promptChar` · string · Default: `"_"`

Sets the prompt symbol displayed at unfilled mask positions.

```html
<ejs-maskedtextbox mask="999-999-9999" promptChar="#"></ejs-maskedtextbox>
```

---

### `customCharacters` · `{ [x: string]: string }` · Default: `null`

Maps non-mask literal characters in the mask to their accepted input values. Each key is a mask character and the value is a comma-separated string of accepted characters.

```typescript
// Component
export class AppComponent {
  customChars: { [key: string]: string } = {
    P: 'P,A,p,a',
    M: 'M,m'
  };
}
```

```html
<!-- Template -->
<ejs-maskedtextbox 
  mask="00:00 >PM" 
  [customCharacters]="customChars">
</ejs-maskedtextbox>
```

---

### `cssClass` · string · Default: `null`

Applies additional CSS classes to the root element for custom styling.

```html
<ejs-maskedtextbox mask="00000" cssClass="e-style"></ejs-maskedtextbox>
```

---

### `enabled` · boolean · Default: `true`

Enables or disables the MaskedTextBox component.

```html
<ejs-maskedtextbox mask="000-000-0000" [enabled]="false"></ejs-maskedtextbox>
```

---

### `readonly` · boolean · Default: `false`

When `true`, the user cannot change the input value.

```html
<ejs-maskedtextbox mask="000-000-0000" value="123-456-7890" [readonly]="true"></ejs-maskedtextbox>
```

---

### `showClearButton` · boolean · Default: `false`

When `true`, displays a clear (×) icon inside the input to reset the value.

```html
<ejs-maskedtextbox mask="000-000-0000" [showClearButton]="true"></ejs-maskedtextbox>
```

---

### `enableRtl` · boolean · Default: `false`

Renders the component in right-to-left direction.

```html
<ejs-maskedtextbox mask="000-000-0000" [enableRtl]="true"></ejs-maskedtextbox>
```

---

### `enablePersistence` · boolean · Default: `false`

When `true`, persists the `value` state in browser storage and restores it after page reload.

```html
<ejs-maskedtextbox mask="000-000-0000" [enablePersistence]="true"></ejs-maskedtextbox>
```

---

### `htmlAttributes` · `{ [key: string]: string }` · Default: `{}`

Passes additional HTML attributes to the underlying input element. If a property is also set directly, the property value takes precedence.

```typescript
// Component
export class AppComponent {
  htmlAttr: any = { 
    name: 'phonenumber', 
    tabindex: '-1' 
  };
}
```

```html
<!-- Template -->
<!-- Add name and tabindex via HTML attributes -->
<ejs-maskedtextbox 
  mask="000000" 
  [htmlAttributes]="htmlAttr" 
  [value]="'6000021'">
</ejs-maskedtextbox>

<!-- Show numeric keypad on mobile devices -->
<ejs-maskedtextbox 
  mask="999-99999" 
  [htmlAttributes]="{ type: 'tel' }">
</ejs-maskedtextbox>
```

---

### `locale` · string · Default: `""`

Overrides the global culture/localization for this component. Default is `'en-US'`.

```html
<ejs-maskedtextbox mask="000-000-0000" locale="en-US"></ejs-maskedtextbox>
```

---

### `width` · number | string · Default: `null`

Sets the width of the MaskedTextBox.

```html
<!-- With string value -->
<ejs-maskedtextbox mask="000-000-0000" width="300px"></ejs-maskedtextbox>

<!-- With numeric value -->
<ejs-maskedtextbox mask="000-000-0000" [width]="300"></ejs-maskedtextbox>
```

---

## Methods

Methods are accessed via a template reference variable with `@ViewChild`.

```typescript
import { ViewChild } from '@angular/core';

export class AppComponent {
  @ViewChild('maskInput') maskInput: any;

  callMethod() {
    this.maskInput.focusIn();
  }
}
```

### `focusIn()` → void

Programmatically sets focus to the MaskedTextBox.

```typescript
// Auto-focus on component load
ngAfterViewInit(): void {
  this.maskInput.focusIn();
}
```

---

### `focusOut()` → void

Removes focus from the MaskedTextBox if it is currently focused.

```typescript
this.maskInput.focusOut();
```

---

### `getMaskedValue()` → string

Returns the current value in masked format (including literals like dashes). Use `value` property for the raw value without literals.

```typescript
// mask="000-000-0000", user typed "1234567890"
const raw    = this.maskInput.value;            // "1234567890"
const masked = this.maskInput.getMaskedValue(); // "123-456-7890"
```

---

### `destroy()` → void

Removes the component from the DOM and detaches all event handlers. Restores the original input element.

```typescript
this.maskInput.destroy();
```

---

### `getPersistData()` → string

Returns the properties that are maintained in the persisted state (used internally for `enablePersistence`).

```typescript
const persisted = this.maskInput.getPersistData();
```

---

## Events

### `change` · EventEmitter\<MaskChangeEventArgs\>

Fires when the value of the MaskedTextBox changes.

```typescript
// Component
export class AppComponent {
  onMaskChange(event: any): void {
    console.log('Raw value:', event.value);
    console.log('Masked value:', event.maskedValue);
    console.log('Is interacted:', event.isInteracted);
  }
}
```

```html
<!-- Template -->
<ejs-maskedtextbox
  mask="000-000-0000"
  (change)="onMaskChange($event)">
</ejs-maskedtextbox>
```

---

### `focus` · EventEmitter\<MaskFocusEventArgs\>

Fires when the MaskedTextBox receives focus. Use `selectionStart` and `selectionEnd` from the event args to control cursor position.

```typescript
// Component
export class AppComponent {
  onMaskFocus(event: any): void {
    console.log('Focus received');
    console.log('Selection start:', event.selectionStart);
    console.log('Selection end:', event.selectionEnd);
    
    // Set cursor at start
    event.selectionStart = 0;
    event.selectionEnd = 0;
  }
}
```

```html
<!-- Template -->
<ejs-maskedtextbox
  mask="000-000-0000"
  (focus)="onMaskFocus($event)">
</ejs-maskedtextbox>
```

---

### `blur` · EventEmitter\<MaskBlurEventArgs\>

Fires when the MaskedTextBox loses focus.

```typescript
// Component
export class AppComponent {
  onMaskBlur(event: any): void {
    console.log('Focus lost');
  }
}
```

```html
<!-- Template -->
<ejs-maskedtextbox
  mask="000-000-0000"
  (blur)="onMaskBlur($event)">
</ejs-maskedtextbox>
```

---

### `created` · EventEmitter\<Object\>

Fires when the MaskedTextBox component is created and rendered.

```html
<ejs-maskedtextbox
  mask="000-000-0000"
  (created)="onCreated()">
</ejs-maskedtextbox>
```

```typescript
onCreated(): void {
  console.log('MaskedTextBox created');
}
```

---

### `destroyed` · EventEmitter\<Object\>

Fires when the MaskedTextBox component is destroyed.

```html
<ejs-maskedtextbox
  mask="000-000-0000"
  (destroyed)="onDestroyed()">
</ejs-maskedtextbox>
```

```typescript
onDestroyed(): void {
  console.log('MaskedTextBox destroyed');
}
```

---

## Event Argument Types

### MaskChangeEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Raw value without literals and prompt characters |
| `maskedValue` | string | Value including mask literals |
| `isInteracted` | boolean | Whether the change was triggered by user interaction |

### MaskFocusEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `selectionStart` | number | Starting position of text selection |
| `selectionEnd` | number | Ending position of text selection |
| `maskedValue` | string | The full masked string including literals |

### MaskBlurEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Current raw value at blur time |
| `maskedValue` | string | Masked value at blur time |

---

## Accessibility & WAI-ARIA

The MaskedTextBox component provides built-in accessibility features:

- **ARIA attributes**: `role="textbox"`, `aria-label`, `aria-describedby`
- **Keyboard navigation**: Supports Tab, Shift+Tab, Arrow keys
- **Screen reader support**: Announces mask format and validation errors
- **WCAG 2.2 compliance**: Meets Level AA standards
- **Section 508 compliance**: Compatible with U.S. federal accessibility standards

### Accessible Implementation

```html
<label for="phone-input">Phone Number (Format: XXX-XXX-XXXX)</label>
<ejs-maskedtextbox
  id="phone-input"
  mask="000-000-0000"
  placeholder="Enter phone number"
  aria-label="Phone number input"
  aria-describedby="phone-help">
</ejs-maskedtextbox>
<span id="phone-help" class="help-text">Enter your 10-digit phone number</span>
```

## Reference Documentation

For complete API documentation, visit:
https://ej2.syncfusion.com/angular/documentation/api/maskedtextbox/index-default
