# API Reference – Syncfusion TypeScript NumericTextBox

Source: [Official API Documentation](https://ej2.syncfusion.com/documentation/api/numerictextbox/index-default)

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Types](#event-argument-types)

---

## Properties

### `allowMouseWheel` `boolean`
Enables or disables mouse wheel interaction for incrementing/decrementing the value.  
**Default:** `true`

```ts
let numeric = new NumericTextBox({ allowMouseWheel: false });
```

---

### `appendTemplate` `string | Function`
HTML template string for custom elements to append (render after) the NumericTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ appendTemplate: '<span>kg</span>' });
```

---

### `cssClass` `string`
CSS class(es) added to the root element for custom styling.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ cssClass: 'e-style' });
```

---

### `currency` `string`
ISO 4217 currency code for currency formatting (e.g., `'USD'`, `'EUR'`, `'GBP'`). Used with `format: 'c2'` and CLDR data.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ currency: 'EUR', format: 'c2' });
```

---

### `decimals` `number`
Number of decimal places shown when the component is focused.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ decimals: 2, format: 'n2' });
```

---

### `enablePersistence` `boolean`
Persists the `value` state between page reloads using browser storage.  
**Default:** `false`

```ts
let numeric = new NumericTextBox({ enablePersistence: true });
```

---

### `enableRtl` `boolean`
Renders the component in right-to-left direction.  
**Default:** `false`

```ts
let numeric = new NumericTextBox({ enableRtl: true, locale: 'ar-AE' });
```

---

### `enabled` `boolean`
Enables or disables the component. When `false`, the input is disabled and cannot be interacted with.  
**Default:** `true`

```ts
let numeric = new NumericTextBox({ enabled: false });
```

---

### `floatLabelType` `FloatLabelType`
Controls how the placeholder label behaves.  
Values: `'Never'` | `'Always'` | `'Auto'`  
**Default:** `'Never'`

```ts
let numeric = new NumericTextBox({ floatLabelType: 'Auto', placeholder: 'Enter value' });
```

---

### `format` `string`
Display format applied when the component is unfocused. Supports standard (`'n2'`, `'c2'`, `'p2'`) and custom (`'###.##'`, `'000.00'`) format strings.  
**Default:** `'n2'`

```ts
let numeric = new NumericTextBox({ format: 'c2', value: 100 });
```

---

### `htmlAttributes` `{ [key: string]: string }`
Additional HTML attributes to set on the input element (e.g., `name`, `min`, `max`). If both property and equivalent HTML attribute are set, the property value takes precedence.  
**Default:** `{}`

```ts
let numeric = new NumericTextBox({
  htmlAttributes: { name: 'quantity', min: '0', max: '100' }
});
```

---

### `locale` `string`
Overrides the global culture/locale for this component. Affects number formatting and spin button tooltips.  
**Default:** `''` (uses global `'en-US'`)

```ts
let numeric = new NumericTextBox({ locale: 'de', value: 1000 });
```

---

### `max` `number`
Maximum allowed value. When `strictMode: true`, the value is clamped to this on blur.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ min: 0, max: 100, value: 50 });
```

---

### `min` `number`
Minimum allowed value. When `strictMode: true`, the value is clamped to this on blur.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ min: 0, max: 100, value: 50 });
```

---

### `placeholder` `string`
Hint text shown when the component is empty. Acts as a floating label when `floatLabelType` is set.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ placeholder: 'Enter amount', floatLabelType: 'Auto' });
```

---

### `prependTemplate` `string | Function`
HTML template string for custom elements to prepend (render before) the NumericTextBox input. Updates dynamically on property change.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ prependTemplate: '<span>$</span>' });
```

---

### `readonly` `boolean`
When `true`, the component is read-only – the user cannot type or interact with it, but the value is still submitted with forms.  
**Default:** `false`

```ts
let numeric = new NumericTextBox({ value: 42, readonly: true });
```

---

### `showClearButton` `boolean`
Shows a clear (×) icon button that resets the value to `null` when clicked.  
**Default:** `false`

```ts
let numeric = new NumericTextBox({ value: 10, showClearButton: true });
```

---

### `showSpinButton` `boolean`
Shows or hides the up/down spin buttons.  
**Default:** `true`

```ts
let numeric = new NumericTextBox({ showSpinButton: false });
```

---

### `step` `number`
Increment/decrement amount applied when spin buttons are clicked or Arrow Up/Down keys are pressed.  
**Default:** `1`

```ts
let numeric = new NumericTextBox({ step: 5, min: 0, max: 100, value: 25 });
```

---

### `strictMode` `boolean`
When `true` (default), the value is clamped to `[min, max]` on blur. When `false`, out-of-range values are allowed but an error CSS class is applied.  
**Default:** `true`

```ts
let numeric = new NumericTextBox({ strictMode: false, min: 10, max: 20, value: 25 });
```

---

### `validateDecimalOnType` `boolean`
When `true`, restricts the number of decimal digits the user can type to the value of `decimals`.  
**Default:** `false`

```ts
let numeric = new NumericTextBox({ validateDecimalOnType: true, decimals: 2, format: 'n2' });
```

---

### `value` `number`
The current numeric value of the component.  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ value: 42 });
```

---

### `width` `number | string`
Width of the NumericTextBox component (e.g., `200`, `'200px'`, `'50%'`).  
**Default:** `null`

```ts
let numeric = new NumericTextBox({ width: '200px', value: 10 });
```

---

## Methods

### `increment(step?: number): void`
Increments the value by the specified step. If `step` is not provided, uses the component's `step` property value.

```ts
numeric.increment();      // uses component step
numeric.increment(5);     // increments by 5
```

---

### `decrement(step?: number): void`
Decrements the value by the specified step. If `step` is not provided, uses the component's `step` property value.

```ts
numeric.decrement();      // uses component step
numeric.decrement(2);     // decrements by 2
```

---

### `getText(): string`
Returns the formatted display value (with the `format` applied) as a string.

```ts
const displayText: string = numeric.getText();
console.log(displayText); // e.g., "$10.00"
```

---

### `focusIn(): void`
Programmatically focuses the NumericTextBox input.

```ts
numeric.focusIn();
```

---

### `focusOut(): void`
Programmatically removes focus from the NumericTextBox input.

```ts
numeric.focusOut();
```

---

### `dataBind(): void`
Applies all pending property changes immediately to the component. Call this after programmatically setting `value` or other properties to force a re-render.

```ts
numeric.value = 50;
numeric.dataBind();
```

---

### `refresh(): void`
Applies all pending property changes and re-renders the component.

```ts
numeric.refresh();
```

---

### `destroy(): void`
Removes the component from the DOM and detaches all event handlers. Restores the original `<input>` element.

```ts
numeric.destroy();
```

---

### `appendTo(selector: string | HTMLElement): void`
Mounts the component on the target element.

```ts
numeric.appendTo('#numeric');
numeric.appendTo(document.getElementById('numeric'));
```

---

### `getPersistData(): string`
Returns a JSON string of the properties that will be persisted when `enablePersistence: true`.

```ts
const state: string = numeric.getPersistData();
```

---

### `getRootElement(): HTMLElement`
Returns the root DOM element of the component.

```ts
const root: HTMLElement = numeric.getRootElement();
```

---

### `addEventListener(eventName: string, handler: Function): void`
Attaches a custom event listener to the component.

```ts
numeric.addEventListener('change', (args) => console.log(args.value));
```

---

### `removeEventListener(eventName: string, handler: Function): void`
Removes a previously attached event listener.

```ts
numeric.removeEventListener('change', myHandler);
```

---

## Events

### `change` `EmitType<ChangeEventArgs>`
Fires when the value changes. Triggered in these scenarios:
- User changes value via keyboard and then blurs
- User scrolls (mouse wheel) within the focused input
- Spin button clicked
- `value` property set programmatically

```ts
let numeric = new NumericTextBox({
  value: 10,
  change: (args) => {
    console.log('New value:', args.value);
    console.log('Previous value:', args.previousValue);
    console.log('Is interaction:', args.isInteracted);
  }
});
```

---

### `blur` `EmitType<NumericBlurEventArgs>`
Fires when the component loses focus.

```ts
let numeric = new NumericTextBox({
  value: 10,
  blur: (args) => {
    console.log('Blurred, value:', args.value);
  }
});
```

---

### `focus` `EmitType<NumericFocusEventArgs>`
Fires when the component receives focus.

```ts
let numeric = new NumericTextBox({
  value: 10,
  focus: (args) => {
    console.log('Focused, value:', args.value);
  }
});
```

---

### `created` `EmitType<Object>`
Fires once after the component has been created and rendered.

```ts
let numeric = new NumericTextBox({
  created: function () {
    console.log('NumericTextBox created, value:', this.value);
  }
});
```

---

### `destroyed` `EmitType<Object>`
Fires when the component is destroyed via `destroy()`.

```ts
let numeric = new NumericTextBox({
  destroyed: () => {
    console.log('NumericTextBox destroyed');
  }
});
```

---

## Event Argument Types

### `ChangeEventArgs`
| Property | Type | Description |
|---|---|---|
| `value` | number | Current value after change |
| `previousValue` | number | Value before the change |
| `isInteracted` | boolean | `true` if change was triggered by user interaction |
| `event` | Event | The original DOM event (null for programmatic changes) |
| `source` | string | Source of the change event |

### `NumericBlurEventArgs`
| Property | Type | Description |
|---|---|---|
| `value` | number | Current value when blur occurred |
| `event` | FocusEvent | The original DOM blur event |

### `NumericFocusEventArgs`
| Property | Type | Description |
|---|---|---|
| `value` | number | Current value when focus occurred |
| `event` | FocusEvent | The original DOM focus event |
