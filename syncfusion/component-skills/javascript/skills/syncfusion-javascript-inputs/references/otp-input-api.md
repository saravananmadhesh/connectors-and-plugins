# OTP Input API Reference

Complete API surface for the Syncfusion EJ2 TypeScript OTP Input component (`@syncfusion/ej2-inputs`).

Source: https://ej2.syncfusion.com/documentation/api/otp-input/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
- [Type Definitions](#type-definitions)

---

## Properties

### ariaLabels
**Type:** `string[]`  
**Default:** `[]`

Defines the ARIA-label attribute for each input field. Each string in the array corresponds to the `aria-label` for the respective input field.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    ariaLabels: ['otp-input-1', 'otp-input-2', 'otp-input-3', 'otp-input-4']
});
otpInput.appendTo('#otp_input');
```

---

### autoFocus
**Type:** `boolean`  
**Default:** `false`

Specifies whether the OTP input field should automatically receive focus when the component is rendered.

```typescript
let otpInput: OtpInput = new OtpInput({
    autoFocus: true
});
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Defines one or more CSS classes to customize the appearance of the OTP Input component. Predefined classes: `e-success`, `e-warning`, `e-error`.

```typescript
let otpInput: OtpInput = new OtpInput({
    cssClass: 'e-success'
});
```

---

### disabled
**Type:** `boolean`  
**Default:** `false`

Specifies whether the OTP Input component is disabled. When `true`, user input is not allowed.

```typescript
let otpInput: OtpInput = new OtpInput({
    value: 1234,
    disabled: true
});
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the component's state between page reloads.

```typescript
let otpInput: OtpInput = new OtpInput({
    enablePersistence: true
});
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left direction.

```typescript
let otpInput: OtpInput = new OtpInput({
    enableRtl: true
});
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Specifies additional HTML attributes to be applied to the OTP Input component.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    htmlAttributes: { name: 'otp-input' }
});
otpInput.appendTo('#otp_input');
```

---

### length
**Type:** `number`  
**Default:** `4`

Specifies the length of the OTP to be entered. Determines the number of individual input fields rendered.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    length: 6
});
otpInput.appendTo('#otp_input');
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

```typescript
let otpInput: OtpInput = new OtpInput({
    locale: 'de-DE'
});
```

---

### placeholder
**Type:** `string`  
**Default:** `''`

Specifies the hint/placeholder text shown in OTP input fields until the user enters a value. A single character is shown in all fields; a multi-character string distributes characters positionally.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    placeholder: 'x'
});
otpInput.appendTo('#otp_placeholder');
```

---

### separator
**Type:** `string`  
**Default:** `''`

Specifies the separator displayed between each input field. The separator is visual only and is not included in the `value`.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    separator: '/'
});
otpInput.appendTo('#otp_separator');
```

---

### stylingMode
**Type:** `string | OtpInputStyle`  
**Default:** `OtpInputStyle.Outlined` (`'outlined'`)

Specifies the style variant for the input fields. Possible values:
- `'outlined'` — bordered input boxes (default)
- `'filled'` — filled background input boxes
- `'underlined'` — underline-only style

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    stylingMode: 'outlined'
});
otpInput.appendTo('#otp_style');
```

---

### textTransform
**Type:** `string | TextTransform`  
**Default:** `TextTransform.None`

Specifies the case transformation for OTP input text. Valid values:
- `TextTransform.Uppercase` — uppercase transformation
- `TextTransform.Lowercase` — lowercase transformation
- `TextTransform.None` — no transformation (default)

```typescript
let otpInput: OtpInput = new OtpInput({
    type: 'text',
    textTransform: 'uppercase'
});
```

---

### type
**Type:** `string | OtpInputType`  
**Default:** `OtpInputType.Number` (`'number'`)

Specifies the input type of each OTP field. Possible values:
- `'number'` — numeric input (default)
- `'text'` — text input (alphanumeric)
- `'password'` — masked input

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    type: 'number'
});
otpInput.appendTo('#otp_type');
```

---

### value
**Type:** `string | number`  
**Default:** `''`

Specifies the value of the OTP Input. Can be a string or a number representing the OTP.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    value: 1234
});
otpInput.appendTo('#otp_value');
```

---

## Methods

### addEventListener
Adds a handler to the given event listener.

**Signature:** `addEventListener(eventName: string, handler: Function): void`

```typescript
otpInput.addEventListener('valueChanged', (args) => { console.log(args); });
```

---

### appendTo
Appends the control within the given HTML element.

**Signature:** `appendTo(selector?: string | HTMLElement): void`

```typescript
otpInput.appendTo('#otp_input');
otpInput.appendTo(document.getElementById('otp_input'));
```

---

### dataBind
Applies all pending property changes immediately to the component.

**Signature:** `dataBind(): void`

```typescript
otpInput.cssClass = 'e-success';
otpInput.dataBind();
```

---

### destroy
Destroys the OTP Input component and removes it from the DOM.

**Signature:** `destroy(): void`

```typescript
otpInput.destroy();
```

---

### focusIn
Sets focus to the OTP Input for user interaction.

**Signature:** `focusIn(): void`

```typescript
otpInput.focusIn();
```

---

### focusOut
Removes focus from the OTP Input.

**Signature:** `focusOut(): void`

```typescript
otpInput.focusOut();
```

---

### getRootElement
Returns the root element of the component.

**Signature:** `getRootElement(): HTMLElement`

```typescript
let root: HTMLElement = otpInput.getRootElement();
```

---

### refresh
Applies all pending property changes and re-renders the component.

**Signature:** `refresh(): void`

```typescript
otpInput.refresh();
```

---

### removeEventListener
Removes a handler from the given event listener.

**Signature:** `removeEventListener(eventName: string, handler: Function): void`

```typescript
otpInput.removeEventListener('valueChanged', myHandler);
```

---

### Inject
Dynamically injects required modules to the component.

**Signature:** `static Inject(...moduleList: Function[]): void`

---

## Events

### blur
**Type:** `EmitType<OtpFocusEventArgs>`

Fires when the OTP Input loses focus (focus-out).

```typescript
let otpInput: OtpInput = new OtpInput({
    blur: (args: OtpFocusEventArgs) => { /* handle blur */ }
});
```

---

### created
**Type:** `EmitType<Event>`

Fires after the OTP Input is created and rendered.

```typescript
let otpInput: OtpInput = new OtpInput({
    created: () => { /* component ready */ }
});
```

---

### focus
**Type:** `EmitType<OtpFocusEventArgs>`

Fires when the OTP Input gains focus.

```typescript
let otpInput: OtpInput = new OtpInput({
    focus: (args: OtpFocusEventArgs) => { /* handle focus */ }
});
```

---

### input
**Type:** `EmitType<OtpInputEventArgs>`

Fires each time the value of an individual OTP input field changes.

```typescript
let otpInput: OtpInput = new OtpInput({
    input: (args: OtpInputEventArgs) => {
        console.log(args.value);
    }
});
```

---

### valueChanged
**Type:** `EmitType<OtpChangedEventArgs>`

Fires after the complete OTP value is entered (matching `length`) and the component focus-outs.

```typescript
let otpInput: OtpInput = new OtpInput({
    valueChanged: (args: OtpChangedEventArgs) => {
        console.log('Full OTP:', args.value);
    }
});
```

---

## Event Argument Interfaces

### OtpFocusEventArgs
Used by `focus` and `blur` events.

| Property | Type | Description |
|---|---|---|
| `event` | `FocusEvent` | The original browser focus/blur event |
| `value` | `string` | The current OTP value at the time of the event |

---

### OtpInputEventArgs
Used by the `input` event.

| Property | Type | Description |
|---|---|---|
| `event` | `Event` | The original browser input event |
| `value` | `string` | The current value of the changed field |

---

### OtpChangedEventArgs
Used by the `valueChanged` event.

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The complete OTP value after all fields are filled |
| `event` | `Event` | The original browser event |
| `previousValue` | `string` | The previous OTP value |

---

## Type Definitions

### OtpInputStyle
```typescript
type OtpInputStyle = 'outlined' | 'filled' | 'underlined';
```

### OtpInputType
```typescript
type OtpInputType = 'number' | 'text' | 'password';
```

### TextTransform
```typescript
type TextTransform = 'uppercase' | 'lowercase' | 'none';
```
